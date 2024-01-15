import CategoryTree from "@/app/(main)/categories/components/CategoryTree";

export default function CategoryNode({ category }) {
  return (
    <div className="">
      <div className="">{category.name}</div>
      <div className="">{category.description}</div>
      {category.children && category.children.length > 0 && (
        <div className="ml-4">
          <CategoryTree categories={category.children} />
        </div>
      )}
    </div>
  );
}
