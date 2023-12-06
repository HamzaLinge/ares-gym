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
 PUT: /shopping/protein
 */
export interface IRequest_protein_put {
  idProtein: string;
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
 DELETE: /shopping/protein
 */
export interface IRequest_shopping_protein_delete {
  idProtein?: string;
}
export interface IResponse_shopping_protein_delete {
  message: string;
}
