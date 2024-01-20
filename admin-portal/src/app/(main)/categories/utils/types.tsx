import { ICustomError, TStateAction } from "@/utils/global-types";

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

export type TStateActionModalCategory = {
  id: string | undefined;
  category?: ICategory;
  error?: ICustomError;
};

export type TStateAlertCategory = TStateAction<{
  idCategory: string;
  idDeletedCategory: string;
}>;
