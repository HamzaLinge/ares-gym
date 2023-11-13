import { TTargetDiscount } from "./common.types";
import { IDiscount } from "../models/Discount";

/**
 /discount/post route
 */
export interface IRequest_discount_post {
  title: string;
  percentage: number;
  targets: TTargetDiscount[];
  dateBegin?: Date;
  dateEnd: Date;
  description: string;
}
export interface IResponse_discount_post {
  discount: IDiscount;
}

/**
 /discount/get route
 */
export interface IRequest_discount_get {
  idDiscount?: string;
}
interface IResponse_discount_getOne {
  discount: IDiscount;
}
interface IResponse_discount_getAll {
  discounts: IDiscount[];
}
export type TResponse_discount_get =
  | IResponse_discount_getOne
  | IResponse_discount_getAll;

/**
 /discount/put route
 */
export interface IRequest_discount_put {
  idDiscount: string;
  title?: string;
  percentage?: number;
  targets?: TTargetDiscount[];
  dateBegin?: Date;
  dateEnd?: Date;
  description?: string;
}
export interface IResponse_discount_put {
  discount: IDiscount;
}

/**
 /discount/delete route
 */
export interface IRequest_discount_delete {
  idDiscount?: string;
}
export interface IResponse_discount_delete {
  message: string;
}
