import { NextFunction, Request, Response } from "express";

import DiscountModel, { IDiscount } from "../../models/Discount";
import { CustomError } from "../../types/common.type";
import {
  IRequest_discount_delete,
  IRequest_discount_file_put_params,
  IRequest_discount_get,
  IRequest_discount_post,
  IRequest_discount_put_body,
  IRequest_discount_put_params,
  IResponse_discount_delete,
  IResponse_discount_file_put,
  IResponse_discount_post,
  IResponse_discount_put,
  TResponse_discount_get,
} from "./discount.type";
import CommandModel, { ICommand } from "../../models/Commands";
import { deleteFile } from "../../utils/deleteFile";
import { capitalize } from "../../utils/capitalize";

export async function discount_post_controller(
  req: Request<any, any, IRequest_discount_post>,
  res: Response<IResponse_discount_post>,
  next: NextFunction
) {
  const exists: IDiscount | null = await DiscountModel.findOne({
    title: { $regex: "^" + req.body.title + "$", $options: "i" },
    dateEnd: { $gte: new Date() },
  });
  if (exists) {
    next(
      new CustomError(
        "There is already a discount with this title that didn't expire yet",
        409
      )
    );
  } else {
    type TInputDiscount = IRequest_discount_post & {
      thumbnail?: string;
    };
    const inputDiscount: TInputDiscount = { ...req.body };
    if (req.fileId) inputDiscount.thumbnail = req.fileId;
    const discount: IDiscount = await DiscountModel.create(inputDiscount);
    res.status(200).send({ discount });
  }
}

export async function discount_get_controller(
  req: Request<any, any, any, IRequest_discount_get>,
  res: Response<TResponse_discount_get>,
  next: NextFunction
) {
  if (req.query.idDiscount) {
    const discount: IDiscount | null = await DiscountModel.findById(
      req.query.idDiscount
    );
    if (!discount) {
      next(new CustomError("There is no discount found for this id", 404));
    } else {
      res.status(200).send({ discount });
    }
  } else {
    const titleFilter = req.query.title ? req.query.title : "";
    const discounts: IDiscount[] = await DiscountModel.find({
      title: { $regex: "^" + titleFilter, $options: "i" },
    }).sort({
      updatedAt: -1,
    });
    if (discounts.length === 0) {
      next(new CustomError("There are no discounts found", 404));
    } else {
      res.status(200).send({ discounts });
    }
  }
}

export async function discount_put_controller(
  req: Request<IRequest_discount_put_params, any, IRequest_discount_put_body>,
  res: Response<IResponse_discount_put>,
  next: NextFunction
) {
  const discountExists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!discountExists) {
    return next(new CustomError("There is no discount found to edit", 404));
  }
  if (req.body.dateEnd) {
    const dateBegin = new Date(discountExists.dateBegin);
    dateBegin.setDate(dateBegin.getDate() + 1);
    const dateEnd = new Date(req.body.dateEnd);
    if (dateEnd < dateBegin) {
      next(
        new CustomError(
          "Date End must exceed Date Begin by at least one day",
          422
        )
      );
    }
  }
  if (
    req.body.percentage &&
    req.body.percentage !== discountExists.percentage
  ) {
    /*
    Check if there is at least one confirmed command that uses this discount,
    if it's so, discount's percentage cannot be modified
   */
    const commands: ICommand[] = await CommandModel.find({
      discount: { data: discountExists._id },
      status: { confirmed: true },
    });
    if (commands.length >= 1) {
      return next(
        new CustomError(
          "You cannot change discount's percentage, because there is at least one confirmed command that uses this discount",
          422
        )
      );
    }
  }
  const discount: IDiscount | null = await DiscountModel.findOneAndUpdate(
    { _id: req.params.idDiscount },
    req.body,
    { new: true }
  );
  if (!discount) {
    return next(new CustomError("There is no updated discount found", 404));
  }
  res.status(200).send({ discount });
}

export async function discount_file_put_controller(
  req: Request<IRequest_discount_file_put_params>,
  res: Response<IResponse_discount_file_put>,
  next: NextFunction
) {
  const discountExists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!discountExists) {
    next(new CustomError("There is no discount found to upload a file", 404));
  } else {
    if (discountExists.thumbnail) deleteFile(discountExists.thumbnail);
    const updatedDiscount: IDiscount | null =
      await DiscountModel.findOneAndUpdate(
        { _id: req.params.idDiscount },
        { thumbnail: req.fileId }
      );
    if (!updatedDiscount) {
      next(new CustomError("Updated discount not found", 404));
    } else {
      res.status(200).send({ discount: updatedDiscount });
    }
  }
}

export async function discount_delete_controller(
  req: Request<IRequest_discount_delete>,
  res: Response<IResponse_discount_delete>,
  next: NextFunction
) {
  const discountExists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!discountExists) {
    next(
      new CustomError("There is no discount found to delete for this id", 404)
    );
  } else {
    const confirmedCommands: ICommand[] = await CommandModel.find({
      discount: { data: discountExists._id },
      status: { confirmed: true },
    });
    if (confirmedCommands.length > 0) {
      // Error when there is at least one confirmed command that is lied to this discount
      next(
        new CustomError(
          "There is at least one confirmed command lied to this discount, you cannot delete it",
          422
        )
      );
    } else {
      // Remove the Discount for the Not-Confirmed-Commands yet
      const notConfirmedCommands: ICommand[] = await CommandModel.find({
        discount: { data: discountExists._id },
        status: { confirmed: false },
      });
      for (let i = 0; i < notConfirmedCommands.length; i++) {
        if (
          notConfirmedCommands[i].discount &&
          notConfirmedCommands[i].discount?.files
        ) {
          notConfirmedCommands[i].discount?.files?.forEach((fileId) =>
            deleteFile(fileId)
          );
        }
        await CommandModel.findOneAndUpdate(
          {
            _id: notConfirmedCommands[i]._id,
          },
          { $unset: { discount: 1 } }
        );
      }
      await DiscountModel.findOneAndDelete({ _id: req.params.idDiscount });
      res.status(200).send({
        message: `The "${capitalize(
          discountExists.title
        )}" discount successfully deleted`,
      });
    }
  }
}

export async function discount_file_delete_controller(
  req: Request<IRequest_discount_delete>,
  res: Response<IResponse_discount_delete>,
  next: NextFunction
) {
  const discountExists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!discountExists) {
    next(
      new CustomError("There is no discount found to delete for this id", 404)
    );
  } else {
    if (discountExists.thumbnail) deleteFile(discountExists.thumbnail);
    res.status(200).send({
      message: `"${capitalize(
        discountExists.title
      )}" discount thumbnail successfully deleted`,
    });
  }
}
