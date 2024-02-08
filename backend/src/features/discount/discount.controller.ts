import { NextFunction, Request, Response } from "express";

import DiscountModel, { IDiscount } from "../../models/Discount";
import { CustomError } from "../../types/global.type";
import {
  IRequest_discount_delete,
  IRequest_discount_file_delete,
  IRequest_discount_file_put_params,
  IRequest_discount_get,
  IRequest_discount_post,
  IRequest_discount_put_body,
  IRequest_discount_put_params,
  IResponse_discount_delete,
  IResponse_discount_file_delete,
  IResponse_discount_file_put,
  IResponse_discount_post,
  IResponse_discount_put,
  TResponse_discount_get,
} from "./discount.type";
import CommandModel, { ICommand } from "../../models/Command";
import { deleteFile } from "../../utils/file.util";
import { capitalize } from "../../utils/string.util";
import { dateEndExceedsDateBegin } from "../../utils/date.util";
import { HttpStatusCodes } from "../../utils/error.util";

export async function discount_post_controller(
  req: Request<any, any, IRequest_discount_post>,
  res: Response<IResponse_discount_post>,
  next: NextFunction
) {
  const exists: IDiscount | null = await DiscountModel.findOne({
    title: { $regex: "^" + req.body.title + "$", $options: "i" },
    dateEnd: { $gt: new Date(req.body.dateBegin) },
  });
  if (exists) {
    next(
      new CustomError(
        "There is already a discount on the same title that will not expire before the given start date",
        HttpStatusCodes.CONFLICT
      )
    );
  } else {
    type TInputDiscount = IRequest_discount_post & {
      thumbnail?: string;
    };
    const inputDiscount: TInputDiscount = { ...req.body };
    if (req.fileId) inputDiscount.thumbnail = req.fileId;
    const discount: IDiscount = await DiscountModel.create(inputDiscount);
    res.status(HttpStatusCodes.OK).send({ discount });
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
      next(
        new CustomError(
          "There is no discount found for this id",
          HttpStatusCodes.NOT_FOUND
        )
      );
    } else {
      res.status(HttpStatusCodes.OK).send({ discount });
    }
  } else {
    const titleFilter = req.query.title ? req.query.title : "";
    const discounts: IDiscount[] = await DiscountModel.find({
      title: { $regex: "^" + titleFilter, $options: "i" },
    }).sort({
      updatedAt: -1,
    });
    if (discounts.length === 0) {
      next(
        new CustomError(
          "There are no discounts found",
          HttpStatusCodes.NOT_FOUND
        )
      );
    } else {
      res.status(HttpStatusCodes.OK).send({ discounts });
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
    return next(
      new CustomError(
        "There is no discount found to edit",
        HttpStatusCodes.NOT_FOUND
      )
    );
  }
  if (req.body.title) {
    const discountWithSameTitle: IDiscount | null = await DiscountModel.findOne(
      {
        title: { $regex: "^" + req.body.title, $options: "i" },
        dateEnd: { $gte: new Date() },
      }
    );
    if (discountWithSameTitle) {
      return next(
        new CustomError(
          "There is already a discount with this title that didn't expire yet",
          HttpStatusCodes.CONFLICT
        )
      );
    }
  }
  if (
    !req.body.dateBegin &&
    req.body.dateEnd &&
    !dateEndExceedsDateBegin(
      discountExists.dateBegin.toISOString(),
      req.body.dateEnd.toISOString()
    )
  ) {
    return next(
      new CustomError(
        "Date End must exceed Date Begin by at least one day",
        HttpStatusCodes.CONFLICT
      )
    );
  }
  if (
    req.body.percentage &&
    req.body.percentage !== discountExists.percentage
  ) {
    const commands: ICommand[] = await CommandModel.find({
      discount: discountExists._id,
      status: { confirmed: true },
    });
    if (commands.length >= 1) {
      return next(
        new CustomError(
          "You cannot change discount's percentage, because there is at least one confirmed command that uses this discount",
          HttpStatusCodes.CONFLICT
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
    return next(
      new CustomError(
        "There is no updated discount found",
        HttpStatusCodes.NOT_FOUND
      )
    );
  }
  res.status(HttpStatusCodes.OK).send({ discount });
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
    next(
      new CustomError(
        "There is no discount found to upload a file",
        HttpStatusCodes.NOT_FOUND
      )
    );
  } else {
    if (discountExists.thumbnail) await deleteFile(discountExists.thumbnail);
    const updatedDiscount: IDiscount | null =
      await DiscountModel.findOneAndUpdate(
        { _id: req.params.idDiscount },
        { thumbnail: req.fileId }
      );
    if (!updatedDiscount) {
      next(
        new CustomError("Updated discount not found", HttpStatusCodes.NOT_FOUND)
      );
    } else {
      res.status(HttpStatusCodes.OK).send({ discount: updatedDiscount });
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
    return next(
      new CustomError(
        "There is no discount found to delete with this id",
        HttpStatusCodes.NOT_FOUND
      )
    );
  }
  const confirmedCommands: ICommand[] = await CommandModel.find({
    discount: discountExists._id,
    status: { confirmed: true },
  });
  if (confirmedCommands.length > 0) {
    // Error when there is at least one confirmed command that is lied to this discount
    return next(
      new CustomError(
        "There is at least one confirmed command lied to this discount, you cannot delete it",
        HttpStatusCodes.CONFLICT
      )
    );
  }
  // Remove the Discount for the Not-Confirmed-Commands yet
  const notConfirmedCommands: ICommand[] = await CommandModel.find({
    discount: discountExists._id,
    status: { confirmed: false },
  });
  for (let i = 0; i < notConfirmedCommands.length; i++) {
    await CommandModel.findOneAndUpdate(
      {
        _id: notConfirmedCommands[i]._id,
      },
      { $unset: { discount: 1 } }
    );
  }
  if (discountExists.thumbnail) await deleteFile(discountExists.thumbnail);
  await DiscountModel.findOneAndDelete({ _id: req.params.idDiscount });
  res.status(HttpStatusCodes.OK).send({
    deletedDiscount: discountExists,
  });
}

export async function discount_file_delete_controller(
  req: Request<IRequest_discount_file_delete>,
  res: Response<IResponse_discount_file_delete>,
  next: NextFunction
) {
  const discountExists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!discountExists) {
    next(
      new CustomError(
        "There is no discount found to delete for this id",
        HttpStatusCodes.NOT_FOUND
      )
    );
  } else {
    if (discountExists.thumbnail) await deleteFile(discountExists.thumbnail);
    res.status(HttpStatusCodes.OK).send({
      message: `"${capitalize(
        discountExists.title
      )}" discount thumbnail successfully deleted`,
    });
  }
}
