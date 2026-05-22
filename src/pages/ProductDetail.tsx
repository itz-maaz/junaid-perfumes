import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  ChevronLeft, 
  ShoppingBag,
  ShoppingCart,
  Sparkles, 
  Droplet, 
  Flame, 
  ShieldCheck,
  Info, 
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider, useCart } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutDrawer } from "@/components/CheckoutDrawer";
import { products } from "@/data/products";

export function ProductDetail() {
  return (
    <CartProvider>
      <ProductPage />
    </CartProvider>
  );
}

const getProductImageProps = (imgUrl: string) => {
  if (imgUrl.includes("?crop=cap")) {
    return {
      src: imgUrl.split("?")[0],
      style: {
        transform: "scale(1.75)",
        transformOrigin: "50% 15%"
      }
    };
  }
  if (imgUrl.includes("?crop=label")) {
    return {
      src: imgUrl.split("?")[0],
      style: {
        transform: "scale(1.75)",
        transformOrigin: "50% 50%"
      }
    };
  }
  return {
    src: imgUrl,
    style: {}
  };
};

function ProductPage() {
  const { id } = useParams();
  const { addItem, buyNow } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  // Default sizes and selected states
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [activeAccordion, setActiveAccordion] = useState<string | null>("pyramid");
  const [isAdded, setIsAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.image || "");

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [id, product]);

  useEffect(() => {
    if (!product || typeof window === "undefined" || window.location.hash !== "#buy-now") return;
    buyNow({
      id: `${product.id}-50ml`,
      name: `${product.name} (50ml)`,
      notes: product.notes,
      price: product.price,
      priceValue: product.priceValue,
      image: product.image,
    });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, [id, buyNow, product]);

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <Info className="h-12 w-12 text-zinc-600 mb-4" />
          <h1 className="font-serif text-3xl text-zinc-100 mb-2">Fragrance Not Found</h1>
          <p className="text-zinc-500 text-sm max-w-sm mb-6">
            The fragrance you are looking for does not exist in our collection or has been retired.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-green-foreground shadow-lg shadow-brand-green/20"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Collection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate prices based on size
  const is100ml = selectedSize === "100ml";
  const currentPrice = is100ml ? `₹ ${product.priceValue100ml.toLocaleString("en-IN")}` : product.price;
  const currentPriceValue = is100ml ? product.priceValue100ml : product.priceValue;

  const cartItemForSize = (size: string) => {
    const is100 = size === "100ml";
    return {
      id: `${product.id}-${size}`,
      name: `${product.name} (${size})`,
      notes: product.notes,
      price: is100 ? `₹ ${product.priceValue100ml.toLocaleString("en-IN")}` : product.price,
      priceValue: is100 ? product.priceValue100ml : product.priceValue,
      image: product.image,
    };
  };

  const handleAddToCart = () => {
    addItem(cartItemForSize(selectedSize));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    buyNow(cartItemForSize(selectedSize));
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-x-hidden relative">
      
      {/* Background Ambient Luxury Light */}
      <div className="absolute top-[20%] left-1/4 w-[400px] h-[400px] bg-emerald-950/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-1/4 w-[400px] h-[400px] bg-amber-950/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 md:py-16 z-10">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 mb-8 md:mb-12 group text-xs uppercase tracking-widest font-semibold"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Collection
        </Link>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          
          {/* LEFT COLUMN: Interactive Multi-Angle Gallery */}
          <div className="md:col-span-6 flex flex-col md:flex-row gap-4 w-full items-start">
            
            {/* Desktop Side Panel / Thumbnails (hidden on mobile, visible on md+) */}
            <div className="hidden md:flex flex-col gap-3 shrink-0">
              {(product.images || [product.image]).map((imgUrl, idx) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    onMouseEnter={() => setActiveImage(imgUrl)}
                    className={`relative w-[72px] aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-brand-green bg-brand-green/10 scale-[1.05] shadow-lg shadow-brand-green/20"
                        : "border-white/5 bg-zinc-900/40 hover:border-white/20 hover:scale-[1.03] active:scale-[0.97]"
                    }`}
                  >
                    <img
                      {...getProductImageProps(imgUrl)}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Image Showcase */}
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 backdrop-blur-md shadow-2xl shadow-black/80 group">
                
                {/* Product Badge */}
                <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-300 border border-white/10">
                  <Sparkles className="h-3 w-3 text-brand-green" />
                  Artisanal Batch
                </span>

                <img
                  key={activeImage}
                  {...getProductImageProps(activeImage)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[1.03] animate-gallery-fade"
                />
                
                {/* Elegant shadow gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 pointer-events-none" />
              </div>

              {/* Mobile Horizontal Carousel / Thumbnails (visible on mobile, hidden on md+) */}
              <div className="flex md:hidden flex-row gap-3 overflow-x-auto py-1 scrollbar-none w-full justify-center">
                {(product.images || [product.image]).map((imgUrl, idx) => {
                  const isActive = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative w-[64px] aspect-[4/5] shrink-0 overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-brand-green bg-brand-green/10 scale-[1.05] shadow-lg shadow-brand-green/20"
                          : "border-white/5 bg-zinc-900/40 active:scale-[0.95]"
                      }`}
                    >
                      <img
                        {...getProductImageProps(imgUrl)}
                        alt={`${product.name} mobile thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Information & Interactive Controls */}
          <div className="md:col-span-6 flex flex-col justify-center">
            
            {/* Brand Title */}
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.45em] text-brand-green leading-none">
              JUNAID PERFUMES
            </span>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-wide text-white mt-3">
              {product.name}
            </h1>

            {/* Scent Summary */}
            <p className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wider mt-2.5">
              {product.notes}
            </p>

            {/* Dynamic Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-serif text-2xl sm:text-3xl text-zinc-100 font-semibold leading-none">
                {currentPrice}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                Incl. All Taxes
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-zinc-900 my-6" />

            {/* Rich Description */}
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Highlights pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.highlights.map((hl) => (
                <span
                  key={hl}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 border border-white/5 px-3 py-1 text-[10px] text-zinc-300 font-medium shadow-sm"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {hl}
                </span>
              ))}
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-bold block mb-3">
                Select Volume
              </span>
              <div className="flex gap-3">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-brand-green bg-brand-green/10 text-white shadow-md shadow-brand-green/5"
                          : "border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {size}
                      {size === "100ml" && (
                        <span className="absolute -top-2 -right-1 z-20 px-1.5 py-0.5 rounded-md bg-zinc-800 text-[8px] tracking-normal font-bold border border-white/10 text-zinc-300">
                          Best Value
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full rounded-full bg-brand-green py-2.5 sm:py-3 text-base sm:text-lg font-sans font-semibold tracking-normal text-black shadow-lg shadow-brand-green/25 transition-transform hover:bg-brand-green/90 active:scale-[0.98] cursor-pointer"
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  <ShoppingCart className="h-5 w-5 shrink-0 text-black" strokeWidth={2.5} />
                  Buy Now
                </span>
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="relative overflow-hidden w-full rounded-full bg-blue-400 py-2.5 sm:py-3 text-base sm:text-lg font-serif font-medium tracking-normal text-black shadow-md shadow-blue-400/30 transition-transform hover:bg-blue-500 active:scale-[0.98] cursor-pointer"
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  <ShoppingBag className="h-5 w-5 shrink-0 text-black" strokeWidth={2.5} />
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </span>
              </button>
            </div>

            {/* Scent Journey & Ingredients Custom Accordions */}
            <div className="mt-10 border-t border-zinc-900">
              
              {/* Accordion 1: Scent Journey */}
              <div className="border-b border-zinc-900">
                <button
                  onClick={() => toggleAccordion("pyramid")}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-bold group-hover:text-white transition-colors duration-300">
                    Scent Pyramid & Notes
                  </span>
                  {activeAccordion === "pyramid" ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeAccordion === "pyramid" ? "max-h-[300px] pb-5" : "max-h-0"
                  }`}
                >
                  <div className="space-y-4 pt-1">
                    <div className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400">
                        <Sparkles className="h-4 w-4 text-amber-400/80" />
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold leading-none">
                          Top Notes
                        </h4>
                        <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                          {product.topNotes}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400">
                        <Heart className="h-4 w-4 text-rose-400/80" />
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold leading-none">
                          Heart Notes
                        </h4>
                        <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                          {product.heartNotes}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 text-zinc-400">
                        <Flame className="h-4 w-4 text-emerald-400/80" />
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold leading-none">
                          Base Notes
                        </h4>
                        <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                          {product.baseNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion 2: Ingredients & Usage */}
              <div className="border-b border-zinc-900">
                <button
                  onClick={() => toggleAccordion("ingredients")}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-300 font-bold group-hover:text-white transition-colors duration-300">
                    Ingredients & Care
                  </span>
                  {activeAccordion === "ingredients" ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeAccordion === "ingredients" ? "max-h-[300px] pb-5" : "max-h-0"
                  }`}
                >
                  <div className="pt-1 space-y-4">
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      <strong className="text-zinc-300 font-medium">Care Instructions:</strong> Store your luxury perfume in a cool, dry place away from direct sunlight and extreme temperatures to maintain its intense oil potency and elegant aroma profile over the years.
                    </p>
                    <div className="flex items-start gap-2.5 p-3 rounded-xl border border-white/5 bg-zinc-900/20">
                      <ShieldCheck className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                      <p className="text-[10.5px] text-zinc-400 leading-normal font-light">
                        <strong className="text-zinc-300 font-medium">Full Ingredients:</strong> {product.ingredients}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
      <CartDrawer />
      <CheckoutDrawer />
    </div>
  );
}
