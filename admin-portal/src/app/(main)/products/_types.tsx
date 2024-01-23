import { ICategory } from "@/app/(main)/categories/utils/types";

export interface IProduct {
  _id: string;
  name: string;
  category: string | ICategory;
  price: number;
  stock: number;
  thumbnails?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreatedProductResponse {
  supplement: IProduct;
}
