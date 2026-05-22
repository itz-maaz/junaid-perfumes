import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { ProductDetail } from "./pages/ProductDetail";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
