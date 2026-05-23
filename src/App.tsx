import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { ProductDetail } from "./pages/ProductDetail";
import { CartProvider } from "./lib/cart";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" theme="dark" closeButton />
    </CartProvider>
  );
}
