import { ICustomError, IErrorAPI, TStateAction } from "@/utils/global-types";

export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  parent?: string | ICategory;
}

export interface ICategoryTree {
  _id: string;
  name: string;
  description?: string;
  children?: ICategoryTree[];
}

export enum VariantsFormCategory {
  create = "CREATE",
  update = "UPDATE",
}

type TVariantFormCategory =
  | VariantsFormCategory.create
  | VariantsFormCategory.update;

export type TFormCategoryProps = {
  actionCategory: (state: any, formData: FormData) => Promise<IErrorAPI>; // createCategory or updateCategory action server
  category?: { data: ICategory; variant: TVariantFormCategory }; // category is either the category to edit, or the parent category to create a new child, where parent can be undefined
};

export type TStateActionModalCategory = {
  id: string | undefined;
  category?: ICategory;
  error?: ICustomError;
};

export type TStateAlertCategory = TStateAction<{
  idCategory: string;
  idDeletedCategory: string;
}>;
