import { ICategory } from "@/app/(main)/categories/utils/types";

export interface ISupplement {
  _id: string;
  name: string;
  category: string | ICategory;
  price: number;
  stock: number;
  thumbnails?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreatedSupplementResponse {
  supplement: ISupplement;
}
