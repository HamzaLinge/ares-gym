import CategoryNode from "@/app/(main)/categories/components/CategoryNode";

export default function CategoryTree({ categories }) {
  return (
    <div className={"w-full"}>
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} />
      ))}
    </div>
  );
}
