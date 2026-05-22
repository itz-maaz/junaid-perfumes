import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import * as React from "react";

function ProductCard({
  product,
  isActive,
}: {
  product: Product;
  isActive: boolean;
}) {
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
    <div
      data-product-id={product.id}
      className={`product-card-wrapper product-hover-effect group relative flex flex-col rounded-xl border bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 ease-out ${
        isActive
          ? "-translate-y-2 scale-[1.02] border-white/15 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
          : "border-white/5"
      }`}
    >
      <button
        type="button"
        onClick={goToProduct}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-zinc-950 cursor-pointer text-left"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            isActive ? "scale-110" : ""
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
            className={`product-highlights absolute top-1.5 left-0 right-0 transition-all duration-500 ease-out ${
              isActive
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0 pointer-events-auto"
            }`}
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
            className={`product-price absolute font-semibold text-brand-green transition-all duration-500 ease-out ${
              isActive
                ? "bottom-[40px] sm:bottom-[44px] left-[4%] text-xs sm:text-sm"
                : "bottom-2 left-0 text-xs sm:text-sm"
            }`}
          >
            {product.price}
          </span>
          <button
            type="button"
            onClick={handleBuyNow}
            className={`buy-now-btn absolute inset-x-[4%] bottom-1 z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green py-2 text-xs font-semibold uppercase tracking-wider text-brand-green-foreground shadow-lg shadow-brand-green/25 transition-all duration-500 ease-out cursor-pointer ${
              isActive
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <ShoppingCart
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                isActive ? "scale-110 -translate-y-0.5" : ""
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
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);
  const deactivationTimeoutRef = React.useRef<number | null>(null);

  const clearDeactivationTimeout = () => {
    if (deactivationTimeoutRef.current !== null) {
      window.clearTimeout(deactivationTimeoutRef.current);
      deactivationTimeoutRef.current = null;
    }
  };

  React.useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      // Clear any pending deactivation so dragging keeps cards active
      clearDeactivationTimeout();

      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      
      // Determine what element is directly under the finger coordinates anywhere on the page
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!element) return;

      // Find the closest product card wrapper
      const cardWrapper = element.closest(".product-card-wrapper");
      if (cardWrapper) {
        const id = cardWrapper.getAttribute("data-product-id");
        if (id) {
          setActiveCardId(id);
        }
      } else {
        // Only clear if the finger has moved entirely outside the collection grid section.
        // This prevents violent flickering when the finger slides over card gaps or text margins.
        const gridSection = element.closest("#collection");
        if (!gridSection) {
          setActiveCardId(null);
        }
      }
    };

    const handleTouchEnd = () => {
      clearDeactivationTimeout();
      // Delay deactivation slightly so tap clicks (e.g. BUY NOW button) have time to process
      deactivationTimeoutRef.current = window.setTimeout(() => {
        setActiveCardId(null);
      }, 200);
    };

    const handleScroll = () => {
      // Instantly clear any hover state when scrolling to keep navigation clean
      clearDeactivationTimeout();
      setActiveCardId(null);
    };

    // Attach listeners globally to window so dragging off-grid, scrolling, or off-screen releases are perfectly tracked
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearDeactivationTimeout();
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <ProductCard
              key={p.id}
              product={p}
              isActive={activeCardId === p.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
