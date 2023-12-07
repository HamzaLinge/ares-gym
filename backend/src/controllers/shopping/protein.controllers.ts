import { NextFunction, Request, Response } from "express";

import {
  IRequest_protein_get,
  IRequest_protein_post,
  IRequest_shopping_protein_put_body,
  IRequest_shopping_protein_delete,
  IResponse_protein_get,
  IResponse_protein_post,
  IResponse_protein_put,
  IResponse_shopping_protein_delete,
  IRequest_shopping_protein_put_params,
  IRequest_shopping_protein_delete_file,
  IResponse_shopping_protein_delete_file,
} from "../../types/shopping/protein.types";
import ProteinModel, { IProtein } from "../../models/Protein";
import { CustomError } from "../../types/common.types";
import { deleteFile } from "../../utils/deleteFile";

export async function shopping_protein_post_controller(
  req: Request<any, any, IRequest_protein_post>,
  res: Response<IResponse_protein_post>,
  next: NextFunction
) {
  const existsByName = await ProteinModel.findOne({
    name: req.body.name,
  });
  if (existsByName) {
    next(new CustomError("There is already a protein with this name", 409));
  } else {
    const proteinInput: any = { ...req.body };
    if (req.fileIdArr) {
      proteinInput.thumbnails = req.fileIdArr;
    }
    const protein: IProtein = await ProteinModel.create(proteinInput);
    res.status(200).send({ protein });
  }
}

export async function shopping_protein_get_controller(
  req: Request<any, any, any, IRequest_protein_get>,
  res: Response<IResponse_protein_get>,
  next: NextFunction
) {
  if (req.query.idProtein) {
    const protein: IProtein | null = await ProteinModel.findById(
      req.query.idProtein
    );
    if (!protein) {
      next(new CustomError("There is no protein found for this id", 404));
    } else {
      res.status(200).send({ protein });
    }
  } else {
    const nameFilter = req.query.name ? req.query.name : "";
    const proteins: IProtein[] = await ProteinModel.find({
      name: { $regex: "^" + nameFilter, $options: "i" },
    }).sort({ updatedAt: -1 });
    if (proteins.length === 0) {
      next(new CustomError("There are no proteins found", 404));
    } else {
      res.status(200).send({ proteins });
    }
  }
}

export async function shopping_protein_put_controller(
  req: Request<
    IRequest_shopping_protein_put_params,
    any,
    IRequest_shopping_protein_put_body
  >,
  res: Response<IResponse_protein_put>,
  next: NextFunction
) {
  const proteinExists: IProtein | null = await ProteinModel.findById(
    req.params.idProtein
  );
  if (!proteinExists) {
    next(new CustomError("There is no protein found for this Id to edit", 404));
  } else {
    let newInputProtein = { ...req.body };
    const updatedProtein: IProtein | null = await ProteinModel.findOneAndUpdate(
      { _id: req.params.idProtein },
      newInputProtein,
      { new: true }
    );
    if (!updatedProtein) {
      next(new CustomError("Updated protein not found", 404));
    } else {
      res.status(200).send({ protein: updatedProtein });
    }
  }
}

export async function shopping_protein_put_files_controller(
  req: Request<IRequest_shopping_protein_put_params>,
  res: Response<IResponse_protein_put>,
  next: NextFunction
) {
  const proteinExists: IProtein | null = await ProteinModel.findById(
    req.params.idProtein
  );
  if (!proteinExists) {
    next(new CustomError("There is no protein found for this Id to edit", 404));
  } else {
    let newThumbnails: string[] = [];
    if (req.fileIdArr) {
      newThumbnails = newThumbnails.concat(req.fileIdArr);
    }
    const updatedProteinThumbnails: IProtein | null =
      await ProteinModel.findOneAndUpdate(
        { _id: req.params.idProtein },
        { $push: { thumbnails: { $each: newThumbnails } } },
        { new: true }
      );
    if (updatedProteinThumbnails) {
      res.status(200).send({ protein: updatedProteinThumbnails });
    } else {
      next(new CustomError("Updated protein not found", 404));
    }
  }
}

export async function shopping_protein_delete_controller(
  req: Request<IRequest_shopping_protein_delete>,
  res: Response<IResponse_shopping_protein_delete>,
  next: NextFunction
) {
  const proteinExists: IProtein | null = await ProteinModel.findById(
    req.params.idProtein
  );
  if (!proteinExists) {
    next(new CustomError("There is no protein found to delete", 404));
  } else {
    // I should handle the commands that are in progress
    proteinExists.thumbnails.forEach((fileId) => deleteFile(fileId));
    await ProteinModel.findOneAndDelete({ _id: req.params.idProtein });
    res.status(200).send({
      message: `You successfully deleted ${proteinExists.name} protein`,
    });
  }
}

export async function shopping_protein_delete_file_controller(
  req: Request<IRequest_shopping_protein_delete_file>,
  res: Response<IResponse_shopping_protein_delete_file>,
  next: NextFunction
) {
  const proteinExists: IProtein | null = await ProteinModel.findById(
    req.params.idProtein
  );
  if (!proteinExists) {
    next(new CustomError("There is no protein found to delete", 404));
  } else {
    await ProteinModel.findOneAndUpdate(
      { _id: req.params.idProtein },
      { $pull: { thumbnails: req.params.idThumbnail } }
    );
    res.status(200).send({ idThumbnail: req.params.idThumbnail || "none" });
  }
}
