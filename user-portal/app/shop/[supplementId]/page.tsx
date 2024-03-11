import { getSupplementById } from "@/actions/supplement";
import ThumbnailsCarousel from "@/app/shop/components/thumbnails-carousel";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function SupplementPage({
  params: { supplementId },
}: {
  params: { supplementId: string };
}) {
  const supplement = await getSupplementById(supplementId);
  const [categoryId, categoryName] =
    typeof supplement.category === "string"
      ? [supplement.category, "..."]
      : [supplement.category._id, supplement.category.name];

  return (
    <section className="space-y-6 p-2">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/shop?category=${categoryId}`}
                className="capitalize"
              >
                {categoryName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {supplement.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full">
        <ThumbnailsCarousel thumbnails={supplement.thumbnails} />
      </div>
      <div className="w-full">
        <p className="text-3xl">{supplement.name.toUpperCase()}</p>
        <p>{supplement.price} DZD</p>
      </div>
      <div className="flex w-full flex-col items-end gap-y-4">
        <p className="flex items-center gap-x-2 hover:cursor-pointer">
          <HeartIcon className="h-5 w-5" />
          <span>Do you like it?</span>
        </p>
        <Button className="w-full" size={"lg"}>
          Add to Chart
        </Button>
      </div>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="description" className="grow">
            Description
          </TabsTrigger>
          <TabsTrigger value="reviews" className="grow">
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="reviews">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
}
