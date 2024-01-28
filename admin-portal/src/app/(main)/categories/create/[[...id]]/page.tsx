import FormCategory from "@/app/(main)/categories/_components/FormCategory";
import {
  createCategory,
  getCategoryById,
} from "@/app/(main)/categories/_utils/actions";
import {
  TFormCategoryProps,
  VariantsFormCategory,
} from "@/app/(main)/categories/_utils/types";
import { isArrayOfStrings } from "@/utils/helpers";

export default async function CreateCategoryPage({
  params,
}: {
  params: { id?: string[] };
}) {
  let formCategoryProps: TFormCategoryProps = {
    actionCategory: createCategory,
  };
  const idParent = isArrayOfStrings(params.id) ? params.id[0] : undefined;
  if (idParent) {
    const parent = await getCategoryById(idParent);
    formCategoryProps = {
      ...formCategoryProps,
      category: { data: parent, variant: VariantsFormCategory.create },
    };
  }
  return (
    <section>
      <FormCategory {...formCategoryProps} />
    </section>
  );
}
