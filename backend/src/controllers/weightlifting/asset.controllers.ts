import { NextFunction, Request, Response } from "express";

import WeightliftingAssetModel, {
  IWeightliftingAsset,
} from "../../models/WeightliftingAsset";
import {
  IRequest_weightlifting_asset_create,
  IRequest_weightlifting_asset_delete,
  IRequest_weightlifting_asset_get,
  IRequest_weightlifting_asset_put,
  IResponse_weightlifting_asset_create,
  IResponse_weightlifting_asset_delete,
  IResponse_weightlifting_asset_get,
  IResponse_weightlifting_asset_put,
} from "../../types/weightlifting/asset.types";
import { CustomError } from "../../types/common.types";

export async function weightlifting_asset_create_controller(
  req: Request<any, any, IRequest_weightlifting_asset_create>,
  res: Response<IResponse_weightlifting_asset_create>,
  next: NextFunction
) {
  const asset: IWeightliftingAsset | null =
    await WeightliftingAssetModel.findOne({
      title: req.body.title,
    });
  if (asset) {
    next(
      new CustomError(
        "There is already a weightlifting asset with this title",
        400
      )
    );
  } else {
    await WeightliftingAssetModel.create({ ...req.body });
    res.status(200).send({
      message: "Successfully created a weightlifting asset",
    });
  }
}

export async function weightlifting_asset_get_controller(
  req: Request<any, any, any, IRequest_weightlifting_asset_get>,
  res: Response<IResponse_weightlifting_asset_get>,
  next: NextFunction
) {
  const idAsset = req.query.idWeightliftingAsset;
  if (!idAsset) {
    const weightliftingAssets: IWeightliftingAsset[] =
      await WeightliftingAssetModel.find();
    if (weightliftingAssets.length === 0) {
      next(new CustomError("There are no weightlifting assets found", 404));
    } else {
      res.status(200).send({ weightliftingAssets });
    }
  } else {
    const weightliftingAsset: IWeightliftingAsset | null =
      await WeightliftingAssetModel.findById(idAsset);
    if (!weightliftingAsset) {
      next(
        new CustomError(
          "There is no weightlifting asset found for the id asset provided",
          404
        )
      );
    } else {
      res.status(200).send({ weightliftingAsset });
    }
  }
}

export async function weightlifting_asset_put_controller(
  req: Request<any, any, IRequest_weightlifting_asset_put>,
  res: Response<IResponse_weightlifting_asset_put>,
  next: NextFunction
) {
  const existedAsset: IWeightliftingAsset | null =
    await WeightliftingAssetModel.findById(req.body.idWeightliftingAsset);
  if (!existedAsset) {
    next(new CustomError("No weightlifting asset found to edit", 404));
  } else {
    const newInputAsset: any = {};
    if (req.body.title) newInputAsset.title = req.body.title;
    if (req.body.icon) newInputAsset.icon = req.body.icon;
    const updatedWeightliftingAsset: IWeightliftingAsset | null =
      await WeightliftingAssetModel.findOneAndUpdate(
        { _id: req.body.idWeightliftingAsset },
        { ...newInputAsset },
        { new: true }
      );
    if (updatedWeightliftingAsset) {
      res.status(200).send({ updatedWeightliftingAsset });
    } else {
      next(new CustomError("No weightlifting asset found after update", 404));
    }
  }
}
export async function weightlifting_asset_delete_controller(
  req: Request<IRequest_weightlifting_asset_delete>,
  res: Response<IResponse_weightlifting_asset_delete>,
  next: NextFunction
) {
  const existedAsset: IWeightliftingAsset | null =
    await WeightliftingAssetModel.findById(req.params.idWeightliftingAsset);
  if (!existedAsset) {
    next(new CustomError("No weightlifting asset found to delete", 404));
  } else {
    await WeightliftingAssetModel.findOneAndDelete({
      _id: req.params.idWeightliftingAsset,
    });
    res.status(200).send({
      message: `The "${existedAsset.title}" weightlifting asset successfully deleted`,
    });
  }
}
