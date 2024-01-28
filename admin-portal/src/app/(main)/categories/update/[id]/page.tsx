import {
  TFormCategoryProps,
  VariantsFormCategory,
} from "@/app/(main)/categories/_utils/types";
import {
  getCategoryById,
  updateCategory,
} from "@/app/(main)/categories/_utils/actions";
import FormCategory from "@/app/(main)/categories/_components/FormCategory";

export default async function UpdateCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategoryById(params.id);
  let formCategoryProps: TFormCategoryProps = {
    actionCategory: updateCategory,
    category: { data: category, variant: VariantsFormCategory.update },
  };
  return (
    <section>
      <FormCategory {...formCategoryProps} />
    </section>
  );
}
