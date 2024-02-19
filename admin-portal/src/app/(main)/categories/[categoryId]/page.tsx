import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryById } from "@/app/(main)/categories/_utils/actions";
import DeleteCategory from "../_components/DeleteCategory";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { routePaths } from "@/utils/route-paths";

export default async function CategoryPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await getCategoryById(categoryId);
  return (
    <section className="flex w-full flex-col items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>{category?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>TODO: Category Statistics</p>
        </CardContent>
        <CardFooter className="flex w-full items-center justify-evenly">
          <DeleteCategory category={category}>
            <Button
              variant={"destructive"}
              className="flex items-center gap-x-2"
            >
              <TrashIcon className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </DeleteCategory>
          <Link href={routePaths.categories.children.edit.path(categoryId)}>
            <Button className="flex items-center gap-x-2 px-6">
              <Pencil2Icon className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
