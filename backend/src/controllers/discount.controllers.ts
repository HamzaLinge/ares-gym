import { NextFunction, Request, Response } from "express";

import DiscountModel, { IDiscount } from "../models/Discount";
import { CustomError } from "../types/common.types";
import {
  IRequest_discount_delete,
  IRequest_discount_get,
  IRequest_discount_post,
  IRequest_discount_put,
  IResponse_discount_delete,
  IResponse_discount_post,
  IResponse_discount_put,
  TResponse_discount_get,
} from "../types/discount.types";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

export async function discount_post_controller(
  req: Request<any, any, IRequest_discount_post>,
  res: Response<IResponse_discount_post>,
  next: NextFunction
) {
  const exists: IDiscount | null = await DiscountModel.findOne({
    title: req.body.title,
  });
  if (exists) {
    next(new CustomError("There is already a discount with this title", 409));
  } else {
    const inputDiscount: any = { ...req.body };
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
    const discounts: IDiscount[] = await DiscountModel.find();
    if (discounts.length === 0) {
      next(new CustomError("There is are discounts found", 404));
    } else {
      res.status(200).send({ discounts });
    }
  }
}

export async function discount_put_controller(
  req: Request<any, any, IRequest_discount_put>,
  res: Response<IResponse_discount_put>,
  next: NextFunction
) {
  const exists: IDiscount | null = await DiscountModel.findById(
    req.body.idDiscount
  );
  if (!exists) {
    next(
      new CustomError("There is no discount found to edit for this id", 404)
    );
  } else {
    const inputDiscount: any = { ...req.body };
    delete inputDiscount.idDiscount;
    if (req.fileId) {
      const gridFSBucket = new GridFSBucket(mongoose.connection.db);
      gridFSBucket
        .delete(new mongoose.Types.ObjectId(exists.thumbnail))
        .catch((deleteErr) => {
          console.error(
            `Error deleting file (id: ${exists.thumbnail}) from GridFS:`,
            deleteErr
          );
        });
      inputDiscount.thumbnail = req.fileId;
    }
    const discount: IDiscount | null = await DiscountModel.findOneAndUpdate(
      { _id: req.body.idDiscount },
      inputDiscount,
      { new: true }
    );
    if (!discount) {
      next(
        new CustomError("There is no updated discount found for this id", 404)
      );
    } else {
      res.status(200).send({ discount });
    }
  }
}

export async function discount_delete_controller(
  req: Request<IRequest_discount_delete>,
  res: Response<IResponse_discount_delete>,
  next: NextFunction
) {
  const exists: IDiscount | null = await DiscountModel.findById(
    req.params.idDiscount
  );
  if (!exists) {
    next(
      new CustomError("There is no discount found to delete for this id", 404)
    );
  } else {
    await DiscountModel.findOneAndDelete({ _id: req.params.idDiscount });
    res
      .status(200)
      .send({ message: `The "${exists.title}" discount successfully deleted` });
  }
}
