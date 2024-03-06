import { TCategory } from "@/types/category";

export type TSupplement = {
  _id: string;
  name: string;
  category: string | TCategory;
  price: number;
  stock: number;
  description?: string;
  thumbnails?: string[];
  updatedAt?: Date;
  createdAt?: Date;
};
