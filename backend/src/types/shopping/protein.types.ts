import { IProtein } from "../../models/Protein";

/**
 POST: /shopping/protein
 */
export interface IRequest_protein_post {
  name: string;
  type: string;
  price: number;
  stock?: number;
  description: string;
}
export interface IResponse_protein_post {
  protein: IProtein;
}

/**
 GET: /shopping/protein
 */
export interface IRequest_protein_get {
  idProtein?: string;
  name?: string;
}
interface IResponse_protein_getOne {
  protein: IProtein;
}
interface IResponse_protein_getOAll {
  proteins: IProtein[];
}
export type IResponse_protein_get =
  | IResponse_protein_getOne
  | IResponse_protein_getOAll;

/**
 PUT: /shopping/protein/:idProtein and /shopping/protein/files/:idProtein
 */
export interface IRequest_shopping_protein_put_params {
  idProtein?: string;
}
export interface IRequest_shopping_protein_put_body {
  name?: string;
  type?: string;
  price?: number;
  stock?: number;
  description?: string;
}
export interface IResponse_protein_put {
  protein: IProtein;
}

/**
 DELETE: /shopping/protein/:idProtein
 */
export interface IRequest_shopping_protein_delete {
  idProtein?: string;
}
export interface IResponse_shopping_protein_delete {
  message: string;
}

/**
 DELETE: /shopping/protein/file/:idProtein/:idThumbnail
 */
export interface IRequest_shopping_protein_delete_file {
  idProtein?: string;
  idThumbnail?: string;
}
export interface IResponse_shopping_protein_delete_file {
  idThumbnail: string;
}
