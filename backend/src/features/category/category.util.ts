import { ICategory } from "../../models/Category";
import { ICategoryTree } from "./category.type";

export function buildCategoryTree(
  categories: ICategory[],
  parentId: string | undefined = undefined
): ICategoryTree[] {
  const categoryTree: ICategoryTree[] = [];
  const filteredCategories = categories.filter(
    (category) => String(category?.parent) === String(parentId)
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
      // Si la catégorie correspond, ajouter la catégorie entière à la liste filtrée
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
