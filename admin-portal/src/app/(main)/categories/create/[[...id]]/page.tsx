import FormCategory from "@/app/(main)/categories/_components/FormCategory";
import { createCategory } from "@/app/(main)/categories/_utils/actions";
import { TFormCategoryProps } from "@/app/(main)/categories/_utils/types";
import { isArrayOfStrings } from "@/utils/helpers";

export default async function CreateCategoryPage({
  params,
}: {
  params: { id?: string[] };
}) {
  const idParent = isArrayOfStrings(params.id) ? params.id[0] : undefined;

  return (
    <section className="flex w-full flex-col items-center">
      <FormCategory
        title={"Create new category"}
        actionCategory={createCategory}
        idCategoryParent={idParent}
      />
    </section>
  );
}
