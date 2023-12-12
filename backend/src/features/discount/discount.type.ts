import { IDiscount } from "../../models/Discount";

/**
 POST /discount/
 */
export interface IRequest_discount_post {
  title: string;
  percentage: number;
  dateBegin: Date;
  dateEnd: Date;
  description: string;
  validationRequire: boolean;
}

export interface IResponse_discount_post {
  discount: IDiscount;
}

/**
 GET /discount/
 */
export interface IRequest_discount_get {
  idDiscount?: string;
  title?: string;
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
 PUT /discount/:idDiscount
 */
export interface IRequest_discount_put_params {
  idDiscount?: string;
}
export interface IRequest_discount_put_body {
  title?: string;
  percentage?: number; // Be aware, it can cause inconsistent data between Discount and Command
  dateBegin?: Date;
  dateEnd?: Date;
  description?: string;
  validationRequire?: boolean;
}
export interface IResponse_discount_put {
  discount: IDiscount;
}

/**
 PUT /discount/file/:idDiscount
 */
export interface IRequest_discount_file_put_params {
  idDiscount?: string;
}
export interface IResponse_discount_file_put {
  discount: IDiscount;
}

/**
 DELETE /discount/:idDiscount
 */
export interface IRequest_discount_delete {
  idDiscount?: string;
}

export interface IResponse_discount_delete {
  message: string;
}

/**
 DELETE /discount/file/:idDiscount
 */
export interface IRequest_discount_file_delete {
  idDiscount?: string;
}

export interface IResponse_discount_file_delete {
  message: string;
}
