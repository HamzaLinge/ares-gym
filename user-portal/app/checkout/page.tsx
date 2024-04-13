import FormCheckout from "@/app/checkout/components/form-checkout";
import TitlePage from "@/components/title-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function CheckoutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-y-8 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TitlePage title="Checkout" />

      <FormCheckout />
    </section>
  );
}

export default CheckoutPage;
