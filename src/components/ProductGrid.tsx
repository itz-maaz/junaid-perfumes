import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import * as React from "react";

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
  const { buyNow } = useCart();
  const isTouched = activeTouchedCardId === product.id;
  const isTouchedRef = React.useRef(isTouched);
  React.useEffect(() => {
    isTouchedRef.current = isTouched;
  }, [isTouched]);

  const isFingerDownRef = React.useRef<boolean>(false);
  const touchStartYRef = React.useRef<number | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);
  const touchTimeoutRef = React.useRef<number | null>(null);
  const touchStartTimeoutRef = React.useRef<number | null>(null);
  const hasMovedRef = React.useRef<boolean>(false);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    isFingerDownRef.current = true;

    if (touchTimeoutRef.current !== null) {
      window.clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
    if (touchStartTimeoutRef.current !== null) {
      window.clearTimeout(touchStartTimeoutRef.current);
      touchStartTimeoutRef.current = null;
    }

    hasMovedRef.current = false;
    const touch = e.touches[0];
    touchStartYRef.current = touch.clientY;
    touchStartXRef.current = touch.clientX;

    // If this card is already active, keep it active (cancel deactivation timers)
    if (isTouchedRef.current) {
      return;
    }

    // Tapping another card instantly closes any previously active card popup
    if (activeTouchedCardId !== null && activeTouchedCardId !== product.id) {
      setActiveTouchedCardId(null);
    }

    // Delay the touch activation slightly (100ms) to filter out scroll swipes without feeling sluggish
    touchStartTimeoutRef.current = window.setTimeout(() => {
      if (!hasMovedRef.current) {
        setActiveTouchedCardId(product.id);
      }
      touchStartTimeoutRef.current = null;
    }, 100);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || touchStartXRef.current === null) return;
    const touch = e.touches[0];
    const diffY = Math.abs(touch.clientY - touchStartYRef.current);
    const diffX = Math.abs(touch.clientX - touchStartXRef.current);

    // If the finger moves even slightly (more than 5 pixels), they are scrolling/swiping, so cancel popup instantly
    if (diffY > 5 || diffX > 5) {
      isFingerDownRef.current = false;
      hasMovedRef.current = true;
      if (touchStartTimeoutRef.current !== null) {
        window.clearTimeout(touchStartTimeoutRef.current);
        touchStartTimeoutRef.current = null;
      }
      if (isTouchedRef.current) {
        setActiveTouchedCardId(null);
      }
      touchStartYRef.current = null;
      touchStartXRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    isFingerDownRef.current = false;
    touchStartYRef.current = null;
    touchStartXRef.current = null;

    // Case A: User tapped very quickly (finger lifted before 100ms activation delay)
    // and they didn't scroll (hasMovedRef.current is false).
    // We want to trigger activation immediately now that they completed a tap!
    if (touchStartTimeoutRef.current !== null) {
      window.clearTimeout(touchStartTimeoutRef.current);
      touchStartTimeoutRef.current = null;

      if (!hasMovedRef.current) {
        setActiveTouchedCardId(product.id);
        // Schedule deactivation timer immediately since finger is already lifted
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
      }
      return;
    }

    // Case B: The card is already active or is currently being set to active.
    // Ensure the 2.5-second deactivation timer is scheduled.
    if (isTouchedRef.current || activeTouchedCardId === product.id) {
      if (touchTimeoutRef.current !== null) {
        window.clearTimeout(touchTimeoutRef.current);
      }
      // Delay deactivation for 2.5 seconds so the user has time to view/click
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
  };

  const handleTouchCancel = () => {
    isFingerDownRef.current = false;
    touchStartYRef.current = null;
    touchStartXRef.current = null;

    if (touchStartTimeoutRef.current !== null) {
      window.clearTimeout(touchStartTimeoutRef.current);
      touchStartTimeoutRef.current = null;
    }

    if (isTouchedRef.current || activeTouchedCardId === product.id) {
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
    }
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
      if (touchStartTimeoutRef.current !== null) {
        window.clearTimeout(touchStartTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-zinc-900/50 backdrop-blur-md shadow-lg shadow-black/30 transition-all duration-300 ease-out md:hover:-translate-y-2 md:hover:scale-[1.02] md:hover:border-white/15 md:hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] md:focus-within:-translate-y-2 md:focus-within:scale-[1.02] md:focus-within:border-white/15 md:focus-within:shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${
        isTouched
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
          className={`h-full w-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110 md:group-focus-within:scale-110 ${
            isTouched ? "scale-110" : ""
          }`}
        />
      </button>

      <div className="flex flex-col gap-1 px-2 py-1.5 sm:px-2.5 sm:py-2">
        <div>
          <button type="button" onClick={goToProduct} className="w-full text-left cursor-pointer">
            <h3 className="font-serif text-sm sm:text-base leading-tight text-white truncate hover:text-brand-green transition-colors">
              {product.name}
            </h3>
          </button>
          <p className="text-[10px] sm:text-xs text-zinc-400 truncate leading-snug">
            {product.notes}
          </p>
        </div>

        <div className="relative w-full h-14 sm:h-16">
          {/* Brand highlights shown only when NOT hovering / active */}
          <div
            className={`absolute top-1.5 left-0 right-0 transition-all duration-300 ease-out md:group-hover:opacity-0 md:group-hover:-translate-y-2 md:group-hover:pointer-events-none md:group-focus-within:opacity-0 md:group-focus-within:-translate-y-2 md:group-focus-within:pointer-events-none ${
              isTouched
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
            className={`absolute font-semibold text-brand-green transition-all duration-300 ease-out text-xs sm:text-sm md:group-hover:bottom-[44px] md:group-hover:left-1/2 md:group-hover:-translate-x-1/2 md:group-focus-within:bottom-[44px] md:group-focus-within:left-1/2 md:group-focus-within:-translate-x-1/2 ${
              isTouched ? "bottom-[44px] left-1/2 -translate-x-1/2" : "bottom-2 left-0 translate-x-0"
            }`}
          >
            {product.price}
          </span>
          <button
            type="button"
            onClick={handleBuyNow}
            className={`absolute inset-x-[4%] bottom-1 z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-green py-2 text-xs font-semibold uppercase tracking-wider text-brand-green-foreground shadow-lg shadow-brand-green/25 transition-all duration-300 ease-out cursor-pointer md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:scale-100 md:group-focus-within:translate-y-0 md:group-focus-within:pointer-events-auto ${
              isTouched
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            <ShoppingCart
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out md:group-hover:scale-110 md:group-hover:-translate-y-0.5 md:group-focus-within:-translate-y-0.5 ${
                isTouched ? "scale-110 -translate-y-0.5" : ""
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

      // Ignore scroll events within 500ms of activation to prevent layout shift triggers
      const timeElapsed = Date.now() - lastActiveTimeRef.current;
      if (timeElapsed < 500) {
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

        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
