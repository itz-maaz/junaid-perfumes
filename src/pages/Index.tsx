import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ShippingMap } from "@/components/ShippingMap";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";

export function Index() {
  return (
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
  );
}
