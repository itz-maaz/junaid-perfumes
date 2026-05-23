import { ShoppingBag, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import * as React from "react";
import { toast } from "sonner";

function ProductCard({
  product,
  activeTouchedCardId,
  setActiveTouchedCardId,
}: {
  product: Product;
  activeTouchedCardId: string | null;
  setActiveTouchedCardId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const isTouched = activeTouchedCardId === product.id;
  const isTouchedRef = React.useRef(isTouched);
  React.useEffect(() => {
    isTouchedRef.current = isTouched;
  }, [isTouched]);

  const [isAdded, setIsAdded] = React.useState(false);
  const isFingerDownRef = React.useRef<boolean>(false);
  const touchTimeoutRef = React.useRef<number | null>(null);

  const goToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartSilently = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(
      {
        id: `${product.id}-50ml`,
        name: `${product.name} (50ml)`,
        notes: product.notes,
        price: product.price,
        priceValue: product.priceValue,
        image: product.image,
      },
      false
    );
    setIsAdded(true);
    toast.success("Item added to cart", {
      description: `${product.name} has been added successfully.`,
      duration: 2000,
    });
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isFingerDownRef.current = true;

    if (touchTimeoutRef.current !== null) {
      window.clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }

    // Tapping another card instantly closes any previously active card popup
    if (activeTouchedCardId !== null && activeTouchedCardId !== product.id) {
      setActiveTouchedCardId(null);
    }

    // Activate instantly for maximum responsiveness (touch/press/slide all activate it immediately!)
    setActiveTouchedCardId(product.id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    isFingerDownRef.current = true;
  };

  const handleTouchEnd = () => {
    isFingerDownRef.current = false;

    // Schedule deactivation timer to run 2.5 seconds from when they release
    if (touchTimeoutRef.current !== null) {
      window.clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = window.setTimeout(() => {
      setActiveTouchedCardId((currentId) => {
        if (currentId === product.id) {
          return null;
        }
        return currentId;
      });
      touchTimeoutRef.current = null;
    }, 2500);
  };

  const handleTouchCancel = () => {
    isFingerDownRef.current = false;

    if (touchTimeoutRef.current !== null) {
      window.clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = window.setTimeout(() => {
      setActiveTouchedCardId((currentId) => {
        if (currentId === product.id) {
          return null;
        }
        return currentId;
      });
      touchTimeoutRef.current = null;
    }, 2500);
  };

  React.useEffect(() => {
    if (isTouched) {
      // If the card became active, and the user's finger is NOT down, and we don't already have a deactivation timer, schedule one!
      if (!isFingerDownRef.current && touchTimeoutRef.current === null) {
        touchTimeoutRef.current = window.setTimeout(() => {
          setActiveTouchedCardId((currentId) => {
            if (currentId === product.id) {
              return null;
            }
            return currentId;
          });
          touchTimeoutRef.current = null;
        }, 2500);
      }
    } else {
      // If the card became inactive, clear any running deactivation timer
      if (touchTimeoutRef.current !== null) {
        window.clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = null;
      }
    }
  }, [isTouched, activeTouchedCardId]);

  React.useEffect(() => {
    return () => {
      if (touchTimeoutRef.current !== null) {
        window.clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 ease-out md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:border-white/10 md:hover:shadow-[0_12px_30px_rgba(14,165,233,0.15)] md:hover:z-20 md:focus-within:-translate-y-2 md:focus-within:scale-[1.02] md:focus-within:border-white/10 md:focus-within:shadow-[0_12px_30px_rgba(14,165,233,0.15)] md:focus-within:z-20 ${
        isTouched
          ? "-translate-y-2 scale-[1.02] border-white/10 shadow-[0_12px_30px_rgba(14,165,233,0.15)] z-20"
          : "border-white/5 z-10"
      }`}
    >
      <div
        onClick={goToProduct}
        className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 cursor-pointer text-left"
        role="button"
        tabIndex={0}
        aria-label={`View ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToProduct();
          }
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110 md:group-focus-within:scale-110 ${
            isTouched ? "scale-110" : ""
          }`}
        />
      </div>

      <div className="flex flex-col gap-1.5 px-2.5 pt-4 sm:pt-4.5 pb-3.5 sm:pb-4">
        {/* Card details container (translates up slightly on hover/touch to add space above the absolute button) */}
        <div className={`flex flex-col gap-1 w-full transition-transform duration-300 ease-out ${
          isTouched ? "-translate-y-2.5 sm:-translate-y-3" : "md:group-hover:-translate-y-2.5 md:group-hover:sm:-translate-y-3"
        }`}>
          <div className="flex justify-between items-start gap-2">
            <button type="button" onClick={goToProduct} className="text-left cursor-pointer min-w-0 flex-1">
              <h3 className="font-serif text-sm sm:text-base leading-tight text-white truncate hover:text-brand-green transition-colors">
                {product.name}
              </h3>
            </button>
            <span className="font-semibold text-brand-green text-xs sm:text-sm whitespace-nowrap shrink-0 mt-0.5">
              {product.price}
            </span>
          </div>

          {/* Row 2: Smell notes on the left, highlight badges (beside notes on hover) on the right */}
          <div className="flex justify-between items-center gap-2 mt-0.5 min-w-0 w-full">
            <p className="text-[10px] sm:text-xs text-zinc-400 truncate leading-snug min-w-0 flex-1">
              {product.notes}
            </p>
            <div className={`flex flex-nowrap items-center gap-x-1 shrink-0 overflow-hidden transition-all duration-300 ease-out ${
              isTouched 
                ? "max-w-[80px] sm:max-w-[150px] opacity-100" 
                : "max-w-0 opacity-0 md:group-hover:max-w-[150px] md:group-hover:opacity-100"
            }`}>
              {product.highlights.slice(0, 1).map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[7px] xs:text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-[0.08em] text-zinc-300 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Row 3: Highlights below notes (visible by default, fades out/collapses on hover) */}
          <div className={`flex flex-nowrap items-center gap-x-1.5 overflow-hidden w-full mt-0.5 transition-all duration-300 ease-out ${
            isTouched
              ? "max-w-0 opacity-0 pointer-events-none"
              : "max-w-[200px] opacity-100 md:group-hover:max-w-0 md:group-hover:opacity-0 md:group-hover:pointer-events-none"
          }`}>
            {product.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center text-[7px] xs:text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-[0.08em] text-zinc-300 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Add to Cart Button (Absolute overlay over highlights/bottom on hover) */}
        <button
          type="button"
          onClick={handleAddToCartSilently}
          className={`absolute inset-x-2.5 bottom-3 sm:bottom-3.5 z-20 flex items-center justify-center gap-2 rounded-full py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ease-out cursor-pointer hover:scale-[1.02] active:scale-[0.98] md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:pointer-events-auto ${
            isTouched
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-3 pointer-events-none"
          } ${
            isAdded
              ? "bg-emerald-600 text-white border border-emerald-500/30 shadow-lg shadow-emerald-600/25"
              : "bg-sky-600 hover:bg-sky-500 text-white border border-sky-500/30 shadow-lg shadow-sky-600/25"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-3 w-3 shrink-0 animate-bounce" strokeWidth={3} />
              ADDED TO CART
            </>
          ) : (
            <>
              <ShoppingBag className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              ADD TO CART
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [activeTouchedCardId, setActiveTouchedCardId] = React.useState<string | null>(null);
  const lastScrollYRef = React.useRef<number>(0);
  const lastActiveTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (activeTouchedCardId !== null) {
      lastScrollYRef.current = window.scrollY;
      lastActiveTimeRef.current = Date.now();
    }
  }, [activeTouchedCardId]);

  // Global scroll listener to close any open popup immediately when the user scrolls the page intentionally
  React.useEffect(() => {
    const handleScroll = () => {
      if (activeTouchedCardId === null) return;

      // Ignore scroll events within 2500ms of activation to guarantee it stays up for 2-3 seconds as requested!
      const timeElapsed = Date.now() - lastActiveTimeRef.current;
      if (timeElapsed < 2500) {
        return;
      }

      // Ignore scrolls that are less than 20px (e.g. sub-pixel scroll adjustments or micro-shakes)
      const scrollDiff = Math.abs(window.scrollY - lastScrollYRef.current);
      if (scrollDiff < 20) {
        return;
      }

      setActiveTouchedCardId(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeTouchedCardId]);

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

        <div className="relative z-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              activeTouchedCardId={activeTouchedCardId}
              setActiveTouchedCardId={setActiveTouchedCardId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
