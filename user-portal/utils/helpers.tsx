import { SelectGroup, SelectItem } from "@/components/ui/select";
import { ICategoryTree } from "@/types/category";
import { TLinkNavigation } from "@/types/ui";

function formatCategoryNodeToCategoryLink(
  category: ICategoryTree,
): TLinkNavigation {
  let formattedCategory = {
    label: category.name,
    path: `/shop?category=${category._id}`,
  };
  if (!category.children || category.children.length === 0) {
    return formattedCategory;
  } else {
    return {
      ...formattedCategory,
      children: category.children?.map((cat) => {
        return formatCategoryNodeToCategoryLink(cat);
      }),
    };
  }
}

export const mapCategoryLinks = ({
  categoryTree,
}: {
  categoryTree: ICategoryTree[];
}) => {
  const categoryNodes = categoryTree
    // .filter((cat, index) => !cat.children || cat.children.length === 0)
    .map((category) => formatCategoryNodeToCategoryLink(category));

  return categoryNodes;
};

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
