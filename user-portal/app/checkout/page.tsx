import TitlePage from "@/components/title-page";
import CartReview from "./components/cart-review";

function CheckoutPage() {
  return (
    <section className="space-y-6 p-2">
      <TitlePage title="Checkout" />
      <CartReview />
    </section>
  );
}

export default CheckoutPage;
