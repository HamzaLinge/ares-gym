import { ICategoryTree } from "@/types/category";
import { TLinkNavigation } from "@/types/ui";

function formatCategoryNodeToCategoryLink(
  category: ICategoryTree,
): TLinkNavigation {
  let formattedCategory = {
    label: category.name,
    path: `?categoryId=${category._id}`,
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
