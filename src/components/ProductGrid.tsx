import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { buyNow } = useCart();

  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    buyNow({
      id: `${product.id}-50ml`,
      name: `${product.name} (50ml)`,
      notes: product.notes,
      price: product.price,
      priceValue: product.priceValue,
      image: product.image,
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5">
      <button
        type="button"
        onClick={goToProduct}
        className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 cursor-pointer text-left"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-110"
        />
      </button>

      <div className="flex flex-col gap-1 px-2 py-1.5 sm:px-2.5 sm:py-2">
        <div>
          <button
            type="button"
            onClick={goToProduct}
            className="w-full text-left cursor-pointer"
          >
            <h3 className="font-serif text-sm sm:text-base leading-tight text-white truncate hover:text-brand-green transition-colors">
              {product.name}
            </h3>
          </button>
          <p className="text-[10px] sm:text-xs text-zinc-400 truncate leading-snug">{product.notes}</p>
        </div>

        <div className="relative flex h-9 w-full items-center justify-center sm:h-10">
          <span className="text-xs sm:text-sm font-semibold text-amber-300 leading-none transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0">
            {product.price}
          </span>
          <button
            type="button"
            onClick={handleBuyNow}
            className="absolute inset-x-[4%] inset-y-0 z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green py-2 text-xs font-semibold uppercase tracking-wider text-brand-green-foreground shadow-lg shadow-brand-green/25 opacity-0 scale-95 transition-all duration-300 ease-out pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-active:opacity-100 group-active:scale-100 group-active:pointer-events-auto"
          >
            <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid() {
  return (
    <section
      id="collection"
      className="relative w-full pt-4 pb-20 overflow-hidden bg-black/50 backdrop-blur-xl border-y border-white/10 z-0"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 z-10">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-green font-semibold">
            The Collection
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl text-white">
            Curated <em className="italic font-normal">Fragrances</em>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Twelve signature scents, hand-blended in small batches.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
