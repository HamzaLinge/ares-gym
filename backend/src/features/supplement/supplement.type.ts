import { ISupplement } from "../../models/Supplement";

/**
 POST: /supplement/
 */
export interface IRequest_supplement_post {
  name: string;
  category: string;
  price: number;
  stock?: number;
  description?: string;
  thumbnails?: string[];
}
export interface IResponse_supplement_post {
  supplement: ISupplement;
}

/**
 GET: /supplement/
 */
export interface IRequest_supplement_get {
  idSupplement?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
}
interface IResponse_supplement_getOne {
  supplement: ISupplement;
}
interface IResponse_supplement_getOAll {
  supplements: ISupplement[];
}
export type IResponse_supplement_get =
  | IResponse_supplement_getOne
  | IResponse_supplement_getOAll;

/**
 PUT: /supplement/:idSupplement/
 */
export interface IRequest_supplement_put_params {
  idSupplement?: string;
}
export interface IRequest_supplement_put_body {
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  description?: string;
}
export interface IResponse_supplement_put {
  supplement: ISupplement;
}

/**
 PUT: /supplement/files/:idSupplement/
 */
export interface IRequest_supplement_files_put {
  idSupplement?: string;
}
export interface IResponse_supplement_files_put {
  supplement: ISupplement;
}

/**
 DELETE: /supplement/:idSupplement/
 */
export interface IRequest_supplement_delete {
  idSupplement?: string;
}
export interface IResponse_supplement_delete {
  deletedIdSupplement: string;
}

/**
 DELETE: /supplement/:idSupplement/file/:idThumbnail/
 */
export interface IRequest_supplement_file_delete {
  idSupplement?: string;
  idThumbnail?: string;
}
export interface IResponse_supplement_file_delete {
  deletedIdThumbnail: string;
}
