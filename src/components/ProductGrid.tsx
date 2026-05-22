import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import * as React from "react";

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { buyNow } = useCart();
  const [isMobileActive, setIsMobileActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) return;

    // Use IntersectionObserver to activate the card when it enters the sweet spot of mobile screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMobileActive(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "-25% 0px -25% 0px", // focus on the middle region of the viewport
        threshold: 0.4, // triggers when 40% of card is in the sweet spot
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onTouchStart={() => setIsMobileActive(true)}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] active:-translate-y-2 active:scale-[1.02] active:border-white/15 active:shadow-[0_12px_30px_rgba(0,0,0,0.5)] focus-within:-translate-y-2 focus-within:scale-[1.02] focus-within:border-white/15 focus-within:shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${
        isMobileActive
          ? "-translate-y-2 scale-[1.02] border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
          : "border-white/5"
      }`}
    >
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
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-110 group-focus-within:scale-110 ${
            isMobileActive ? "scale-110" : ""
          }`}
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

        <div className="relative w-full h-14 sm:h-16">
          {/* Brand highlights shown only when NOT hovering / active */}
          <div
            className={`absolute top-1.5 left-0 right-0 transition-all duration-300 ease-out ${
              isMobileActive
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0 pointer-events-auto"
            } group-hover:opacity-0 group-hover:-translate-y-2 group-hover:pointer-events-none group-active:opacity-0 group-active:-translate-y-2 group-active:pointer-events-none group-focus-within:opacity-0 group-focus-within:-translate-y-2 group-focus-within:pointer-events-none`}
          >
            <div className="flex flex-nowrap gap-1 overflow-hidden">
              {product.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[8px] sm:text-[9px] font-medium uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <span
            className={`absolute font-semibold text-brand-green transition-all duration-300 ease-out group-hover:bottom-[40px] sm:group-hover:bottom-[44px] group-hover:left-[4%] group-active:bottom-[40px] sm:group-active:bottom-[44px] group-active:left-[4%] group-focus-within:bottom-[40px] sm:group-focus-within:bottom-[44px] group-focus-within:left-[4%] ${
              isMobileActive
                ? "bottom-[40px] sm:bottom-[44px] left-[4%] text-xs sm:text-sm"
                : "bottom-2 left-0 text-xs sm:text-sm"
            }`}
          >
            {product.price}
          </span>
          <button
            type="button"
            onClick={handleBuyNow}
            className={`absolute inset-x-[4%] bottom-1 z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green py-2 text-xs font-semibold uppercase tracking-wider text-brand-green-foreground shadow-lg shadow-brand-green/25 transition-all duration-300 ease-out cursor-pointer group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-active:opacity-100 group-active:scale-100 group-active:translate-y-0 group-active:pointer-events-auto group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto ${
              isMobileActive
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 translate-y-2 pointer-events-none"
            }`}
          >
            <ShoppingCart
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-active:-translate-y-0.5 group-focus-within:-translate-y-0.5 ${
                isMobileActive ? "scale-110 -translate-y-0.5" : ""
              }`}
              strokeWidth={2}
            />
            BUY NOW
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
      className="relative w-full pt-4 pb-2 overflow-hidden bg-black/50 backdrop-blur-xl border-y border-white/10 z-0"
    >
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-6 sm:pt-16 sm:pb-8 z-10">
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
