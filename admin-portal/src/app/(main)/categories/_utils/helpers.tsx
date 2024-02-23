import React from "react";
import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { ICategoryTree } from "@/app/(main)/categories/_utils/types";

type TSelectOption = {
  value: string;
  label: string;
  children?: TSelectOption[];
};

export const renderCategoryOptions = (
  options: TSelectOption[],
): React.ReactNode => {
  return options.map((option) => {
    if (option.children && option.children.length > 0) {
      return (
        <SelectGroup key={option.value}>
          <SelectItem value={option.value}>{option.label}</SelectItem>
          <SelectGroup className={"ml-2 border-l"}>
            {renderCategoryOptions(option.children)}
          </SelectGroup>
        </SelectGroup>
      );
    } else {
      return (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      );
    }
  });
};

export function transformCategoryTreeToSelectOption(
  category: ICategoryTree,
): TSelectOption {
  return {
    value: category._id,
    label: category.name,
    children: category.children?.map(transformCategoryTreeToSelectOption),
  };
}
