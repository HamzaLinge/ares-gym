import { ICategory } from "../../models/Category";

/**
 POST /discount/
 */
export interface IRequest_category_post {
  name: string;
  description?: number;
  parent?: string;
}
export interface IResponse_category_post {
  category: ICategory;
}

/**
 GET /discount/
 */
export interface ICategoryTree {
  _id: string;
  name: string;
  description: string | undefined;
  children: ICategoryTree[];
}
export interface IRequest_category_get {
  idCategory?: string;
}
interface IResponse_category_getOne {
  category: ICategory;
}
interface IResponse_category_getAll {
  categoryTree: ICategoryTree[];
}
export type TResponse_category_get =
  | IResponse_category_getOne
  | IResponse_category_getAll;

/**
 PUT /discount/:idDiscount
 */
export interface IRequest_category_put_params {
  idCategory?: string;
}
export interface IRequest_category_put_body {
  name?: string;
  description?: string;
  parent?: string | null;
}
export interface IResponse_category_put {
  category: ICategory;
}
/**
 DELETE /discount/:idDiscount
 */
export interface IRequest_category_delete {
  idCategory?: string;
}
export interface IResponse_category_delete {
  idDeletedCategory: string;
}
