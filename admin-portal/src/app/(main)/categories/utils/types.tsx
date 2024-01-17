import { ICustomError } from "@/utils/global-types";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parent?: string | ICategory;
}

export interface ICategoryTree {
  _id?: string;
  name: string;
  description?: string;
  children?: ICategoryTree[];
}

export interface IStateAddCategory {
  parent: string | undefined;
  category?: ICategory;
  error?: ICustomError;
}
