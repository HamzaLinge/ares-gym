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
  name?: string;
}
export interface IResponse_category_get {
  categoryTree: ICategoryTree[];
}

/**
 PUT /discount/:idDiscount
 */
export interface IRequest_category_put_params {
  idCategory?: string;
}
export interface IRequest_category_put_body {
  name?: string;
  description?: string;
  parent?: string;
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
  deletedIdCategory: string;
}
