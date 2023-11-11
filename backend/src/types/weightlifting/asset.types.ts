import { IResponse } from "../common.types";
import { IWeightliftingAsset } from "../../models/WeightliftingAsset";

/*
 /weightlifting/asset/create route
 */
export interface IRequest_weightlifting_asset_create {
  title: string;
  icon?: string;
}
export interface IResponse_weightlifting_asset_create extends IResponse {
  message: string;
}

/*
 /weightlifting/asset/get route
 */
interface IResponseError_weightlifting_asset_get extends IResponse {
  message: string;
}
interface IResponseSuccess_weightlifting_asset_getOne extends IResponse {
  weightliftingAsset: IWeightliftingAsset;
}
interface IResponseSuccess_weightlifting_asset_getAll extends IResponse {
  weightliftingAssets: IWeightliftingAsset[];
}
type IResponseSuccess_weightlifting_asset_get =
  | IResponseSuccess_weightlifting_asset_getOne
  | IResponseSuccess_weightlifting_asset_getAll;
export interface IRequest_weightlifting_asset_get {
  idAsset?: string;
}
export type IResponse_weightlifting_asset_get =
  | IResponseError_weightlifting_asset_get
  | IResponseSuccess_weightlifting_asset_get;
