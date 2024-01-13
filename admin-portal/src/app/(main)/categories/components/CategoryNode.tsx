import CategoryTree from "@/app/(main)/categories/components/CategoryTree";

export default function CategoryNode({ category }) {
  return (
    <div className="border-b border-gray-200 p-2">
      <div className="text-lg font-bold">{category.name}</div>
      <div className="text-sm text-gray-600">{category.description}</div>
      {category.children && category.children.length > 0 && (
        <div className="ml-4">
          <CategoryTree categories={category.children} />
        </div>
      )}
    </div>
  );
}
