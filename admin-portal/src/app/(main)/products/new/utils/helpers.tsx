import { ICategoryTree } from "@/app/(main)/categories/utils/types";

interface ICategoryOption {
  label: string;
  value: string;
  options?: ICategoryOption[];
}

export function convertToSelectOptions(
  categories: ICategoryTree[]
): ICategoryOption[] {
  return categories.map((category) => ({
    label: category.name,
    value: category._id,
    options: category.children ? convertToSelectOptions(category.children) : [],
  }));
}
