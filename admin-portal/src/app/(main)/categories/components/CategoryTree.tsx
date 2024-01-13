import CategoryNode from "@/app/(main)/categories/components/CategoryNode";

export default function CategoryTree({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} />
      ))}
    </div>
  );
}
