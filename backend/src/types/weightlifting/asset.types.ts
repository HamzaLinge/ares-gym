import { IWeightliftingAsset } from "../../models/WeightliftingAsset";

/**
 /weightlifting/asset/create route
 */
export interface IRequest_weightlifting_asset_create {
  title: string;
  icon?: string;
}
export interface IResponse_weightlifting_asset_create {
  message: string;
}

/**
 /weightlifting/asset/get route
 */
export interface IRequest_weightlifting_asset_get {
  idWeightliftingAsset?: string;
}
interface IResponse_weightlifting_asset_getOne {
  weightliftingAsset: IWeightliftingAsset;
}
interface IResponse_weightlifting_asset_getAll {
  weightliftingAssets: IWeightliftingAsset[];
}
export type IResponse_weightlifting_asset_get =
  | IResponse_weightlifting_asset_getOne
  | IResponse_weightlifting_asset_getAll;

/**
 /weightlifting/asset/put route
 */
export interface IRequest_weightlifting_asset_put {
  idWeightliftingAsset: string;
  title?: string;
  icon?: string;
}
export interface IResponse_weightlifting_asset_put {
  updatedWeightliftingAsset: IWeightliftingAsset;
}

/**
 /weightlifting/asset/delete route
 */
/*
 * Interface for request parameters in weightlifting asset deletion.
 *
 * The `idWeightliftingAsset` parameter is marked as optional to align with Express's
 * handling of route parameters. In Express, route parameters are not strictly
 * guaranteed to be present in every request, especially in middleware functions
 * that may be used across different routes. By making `idWeightliftingAsset` optional,
 * the TypeScript interface reflects the dynamic nature of Express routes and
 * middleware, where certain parameters might not be present in every request.
 * This approach avoids type errors related to missing parameters and increases
 * the flexibility of middleware and route handlers, allowing them to be used
 * in various routing scenarios without strict parameter requirements.
 */
export interface IRequest_weightlifting_asset_delete {
  idWeightliftingAsset?: string;
}
export interface IResponse_weightlifting_asset_delete {
  message: string;
}
