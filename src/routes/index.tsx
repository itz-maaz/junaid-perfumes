import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingMap } from "@/components/ShippingMap";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Junaid Perfumes — Hand-crafted Luxury Fragrances" },
      {
        name: "description",
        content:
          "Hand-crafted luxury perfumes shipped from Gulbarga across India in 3–5 days. Secure Razorpay checkout.",
      },
    ],
  }),
});

function Index() {
  return (
    <CartProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <main className="w-full max-w-full overflow-x-hidden">
          <Hero />
          <ProductGrid />
          <ShippingMap />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutDrawer />
      </div>
    </CartProvider>
  );
}
