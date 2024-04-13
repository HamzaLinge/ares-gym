import CartReview from "@/app/cart-review/components/cart-review";
import TitlePage from "@/components/title-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function CartReviewPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-y-8 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TitlePage title="Cart Review" />
      <CartReview />
    </section>
  );
}

export default CartReviewPage;
