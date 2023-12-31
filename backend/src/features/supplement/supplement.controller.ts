import { NextFunction, Request, Response } from "express";

import {
  IRequest_supplement_get,
  IRequest_supplement_delete,
  IRequest_supplement_file_delete,
  IRequest_supplement_put_body,
  IRequest_supplement_put_params,
  IRequest_supplement_post,
  IResponse_supplement_get,
  IResponse_supplement_put,
  IResponse_supplement_delete,
  IResponse_supplement_file_delete,
  IResponse_supplement_post,
  IRequest_supplement_files_put,
  IResponse_supplement_files_put,
} from "./supplement.type";
import SupplementModel, { ISupplement } from "../../models/Supplement";
import { CustomError } from "../../types/global.type";
import { ICategory } from "../../models/Category";
import CommandModel, { ICommand } from "../../models/Command";
import { deleteFile } from "../../utils/file.util";
import { HttpStatusCodes } from "../../utils/error.util";

export async function supplement_post_controller(
  req: Request<any, any, IRequest_supplement_post>,
  res: Response<IResponse_supplement_post>,
  next: NextFunction
) {
  const supplement: ISupplement = await SupplementModel.create({
    ...req.body,
    thumbnails: req.fileIdArr ? req.fileIdArr : undefined,
  });
  res.status(HttpStatusCodes.OK).send({ supplement });
}

export async function supplement_get_controller(
  req: Request<any, any, any, IRequest_supplement_get>,
  res: Response<IResponse_supplement_get>,
  next: NextFunction
) {
  if (req.query.idSupplement) {
    const supplement: ISupplement | null = await SupplementModel.findById(
      req.query.idSupplement
    ).populate<{ category: ICategory }>({ path: "category" });
    if (!supplement) {
      return next(
        new CustomError("There is no supplement found with this id", 404)
      );
    }
    res.status(HttpStatusCodes.OK).send({ supplement });
  } else {
    const supplements: ISupplement[] = await SupplementModel.find()
      .populate<{ category: ICategory }>({ path: "category" })
      .sort({ updatedAt: -1 });
    if (supplements.length === 0) {
      return next(new CustomError("There are no supplements found", 404));
    }
    res.status(HttpStatusCodes.OK).send({ supplements });
  }
}

export async function supplement_put_controller(
  req: Request<
    IRequest_supplement_put_params,
    any,
    IRequest_supplement_put_body
  >,
  res: Response<IResponse_supplement_put>,
  next: NextFunction
) {
  const supplementExists: ISupplement | null = await SupplementModel.findById(
    req.params.idSupplement
  );
  if (!supplementExists) {
    return next(
      new CustomError("There is no supplement found for editing", 404)
    );
  }
  const updatedSupplement: ISupplement | null =
    await SupplementModel.findOneAndUpdate(
      { _id: req.params.idSupplement },
      req.body,
      { new: true }
    );
  if (!updatedSupplement) {
    return next(new CustomError("Updated supplement not found", 404));
  }
  res.status(HttpStatusCodes.OK).send({ supplement: updatedSupplement });
}

export async function supplement_put_files_controller(
  req: Request<IRequest_supplement_files_put>,
  res: Response<IResponse_supplement_files_put>,
  next: NextFunction
) {
  const supplementExists: ISupplement | null = await SupplementModel.findById(
    req.params.idSupplement
  );
  if (!supplementExists) {
    return next(
      new CustomError("There is no supplement found for editing filed", 404)
    );
  }
  if (!req.fileIdArr) {
    return next(
      new CustomError("No Files Id found", HttpStatusCodes.UNPROCESSABLE)
    );
  }
  const updatedSupplementThumbnails = (await SupplementModel.findOneAndUpdate(
    { _id: req.params.idSupplement },
    { $push: { thumbnails: { $each: req.fileIdArr } } },
    { new: true }
  )) as ISupplement;
  res
    .status(HttpStatusCodes.OK)
    .send({ supplement: updatedSupplementThumbnails });
}

export async function supplement_delete_controller(
  req: Request<IRequest_supplement_delete>,
  res: Response<IResponse_supplement_delete>,
  next: NextFunction
) {
  const supplementExists: ISupplement | null = await SupplementModel.findById(
    req.params.idSupplement
  );
  if (!supplementExists) {
    return next(new CustomError("There is no supplement found to delete", 404));
  }
  const commands = (await CommandModel.find({
    supplements: { $elemMatch: { data: req.params.idSupplement } },
  })) as ICommand[];
  if (commands.length > 0) {
    return next(
      new CustomError(
        "There is at least one command that is lied with this supplement",
        HttpStatusCodes.CONFLICT
      )
    );
  }
  if (supplementExists.thumbnails && supplementExists.thumbnails.length > 0) {
    for (const fileId of supplementExists.thumbnails) {
      await deleteFile(fileId);
    }
  }
  await SupplementModel.findOneAndDelete({ _id: req.params.idSupplement });
  res.status(HttpStatusCodes.OK).send({
    deletedIdSupplement: supplementExists._id,
  });
}

export async function supplement_delete_file_controller(
  req: Request<IRequest_supplement_file_delete>,
  res: Response<IResponse_supplement_file_delete>,
  next: NextFunction
) {
  const supplementExists: ISupplement | null = await SupplementModel.findById(
    req.params.idSupplement
  );
  if (!supplementExists) {
    return next(new CustomError("There is no supplement found to delete", 404));
  }
  await SupplementModel.findOneAndUpdate(
    { _id: req.params.idSupplement },
    { $pull: { thumbnails: req.params.idThumbnail } }
  );
  await deleteFile(req.params.idThumbnail as string);
  res
    .status(HttpStatusCodes.OK)
    .send({ deletedIdThumbnail: req.params.idThumbnail as string });
}
