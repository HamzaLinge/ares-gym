import { NextFunction, Request, Response } from "express";

import WeightliftingAssetModel, {
  IWeightliftingAsset,
} from "../../models/WeightliftingAsset";
import {
  IRequest_weightlifting_asset_create,
  IRequest_weightlifting_asset_get,
  IResponse_weightlifting_asset_create,
  IResponse_weightlifting_asset_get,
} from "../../types/weightlifting/asset.types";

export async function weightlifting_asset_create_controller(
  req: Request<any, any, IRequest_weightlifting_asset_create>,
  res: Response<IResponse_weightlifting_asset_create>
): Promise<Response<IResponse_weightlifting_asset_create>> {
  try {
    const asset: IWeightliftingAsset | null =
      await WeightliftingAssetModel.findOne({
        title: req.body.title,
      });
    if (asset)
      return res.status(400).send({
        success: false,
        message: "There is already a weightlifting asset with this title",
      });
    await WeightliftingAssetModel.create({ ...req.body });
    return res.status(200).send({
      success: true,
      message: "Successfully created a weightlifting asset",
    });
  } catch (errServer) {
    console.log(
      `Something went wrong during create weightlifting asset => ${errServer}`
    );
    return res.status(500).send({
      success: false,
      message: `Something went wrong during create weightlifting asset`,
    });
  }
}

export async function weightlifting_asset_get_controller(
  req: Request<any, any, any, IRequest_weightlifting_asset_get>,
  res: Response<IResponse_weightlifting_asset_get>
): Promise<Response<IResponse_weightlifting_asset_get>> {
  try {
    const idAsset = req.query.idAsset;
    if (!idAsset) {
      const weightliftingAssets: IWeightliftingAsset[] =
        await WeightliftingAssetModel.find();
      if (weightliftingAssets.length === 0) {
        return res.status(404).send({
          success: false,
          message: "There are no weightlifting assets found",
        });
      }
      return res.status(200).send({ success: true, weightliftingAssets });
    } else {
      const weightliftingAsset: IWeightliftingAsset | null =
        await WeightliftingAssetModel.findById(idAsset);
      if (!weightliftingAsset) {
        return res.status(404).send({
          success: false,
          message:
            "There is no weightlifting asset found for the id asset provided",
        });
      }
      return res.status(200).send({ success: true, weightliftingAsset });
    }
  } catch (errServer) {
    console.log(
      `Something went wrong during get all weightlifting asset => ${errServer}`
    );
    return res.status(500).send({
      success: false,
      message: `Something went wrong during get all weightlifting asset`,
    });
  }
}
