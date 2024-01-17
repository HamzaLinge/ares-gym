import { ICategory } from "../../models/Category";
import { ICategoryTree } from "./category.type";
import { TId } from "../../types/global.type";

function areIdsEqual(id1: TId, id2: TId) {
  if (!id1 && !id2) {
    return true;
  }
  if (id1 && id2) {
    return String(id1) === String(id2);
  }
  return false;
}

export function buildCategoryTree(
  categories: ICategory[],
  parentId: string | undefined = undefined
): ICategoryTree[] {
  const categoryTree: ICategoryTree[] = [];
  const filteredCategories = categories.filter((category) =>
    areIdsEqual(category?.parent, parentId)
  );

  for (const category of filteredCategories) {
    const children = buildCategoryTree(categories, category._id);

    categoryTree.push({
      _id: category._id,
      name: category.name,
      description: category.description,
      children,
    });
  }

  return categoryTree;
}

export function filterCategoryTreeByName(
  categoryTree: ICategoryTree[],
  nameToSearch: string
): ICategoryTree[] {
  const filteredTree: ICategoryTree[] = [];

  for (const category of categoryTree) {
    const children = filterCategoryTreeByName(category.children, nameToSearch);

    if (
      category.name.toLowerCase().includes(nameToSearch.toLowerCase()) ||
      children.length > 0
    ) {
      filteredTree.push({
        _id: category._id,
        name: category.name,
        description: category.description,
        children,
      });
    }
  }

  return filteredTree;
}
