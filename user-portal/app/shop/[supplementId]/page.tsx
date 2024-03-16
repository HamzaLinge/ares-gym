import { getSupplementById } from "@/actions/supplement";
import AddToCart from "@/app/shop/components/add-to-cart";
import RelatedSupplements from "@/app/shop/components/related-supplements";
import ThumbnailsCarousel from "@/app/shop/components/thumbnails-carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/utils/helpers";
import { HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/shop?category=${categoryId}`}
                  className="capitalize"
                >
                  {categoryName}
                </Link>
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
        <p>{formatPrice(supplement.price)}</p>
      </div>
      <div className="flex w-full flex-col items-end gap-y-4">
        <p className="flex items-center gap-x-2 hover:cursor-pointer">
          <HeartIcon className="h-5 w-5" />
          <span>Do you like it?</span>
        </p>
        <AddToCart supplement={supplement} />
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
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>
                {supplement.description ? (
                  supplement.description
                ) : (
                  <span>Sorry, No Description Yet</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <p>Category:</p>
                  <p>{categoryName}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                It will be nice from you to leave a feedback
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
      <RelatedSupplements categoryId={categoryId} excludeId={supplement._id} />
    </section>
  );
}
