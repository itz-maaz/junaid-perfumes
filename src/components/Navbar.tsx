import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useMemo, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import brandLogo from "@/assets/logo.png";

export function Navbar() {
  const navigate = useNavigate();
  const { openCart, count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Clear query on close so search is refreshed next time it opens
  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.notes.toLowerCase().includes(query) ||
        p.highlights.some((h) => h.toLowerCase().includes(query)) ||
        p.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const trendingSearches = ["Oud", "Musk", "Vanilla", "Rose", "Fresh"];

  const handleProductClick = (id: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${id}`);
  };

  const navLinks = [
    { name: "Shop All", href: "#collection" },
    { name: "Our Story", href: "#story" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/60">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-3 h-16 max-w-6xl items-center px-6">
        
        {/* LEFT COLUMN: Brand & Logo */}
        <a href="/" className="flex items-center gap-3 justify-self-start hover:opacity-90 transition-opacity">
          <img
            src={brandLogo}
            alt="Junaid Perfumes Logo"
            className="h-10 w-10 rounded-full object-cover border border-zinc-800 shadow-sm"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif text-[13px] sm:text-[14px] tracking-[0.25em] text-zinc-100 uppercase font-semibold leading-none">
              Junaid
            </span>
            <span className="font-serif text-[9px] tracking-[0.4em] text-zinc-400 uppercase mt-1 leading-none">
              Perfumes
            </span>
          </div>
        </a>

        {/* CENTER COLUMN: Navigation Links (Desktop only, hidden on mobile) */}
        <nav className="hidden md:flex items-center justify-center gap-8 justify-self-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT COLUMN: Icons */}
        <div className="flex items-center gap-3 text-zinc-300 justify-self-end">
          {/* Search Button */}
          <button 
            aria-label="Search" 
            onClick={() => setIsSearchOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-brand-green/45 hover:bg-brand-green/[0.05] hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all duration-300 cursor-pointer"
          >
            <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </button>

          {/* Cart Button */}
          <button
            aria-label="Cart"
            onClick={openCart}
            className="group relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-brand-green/45 hover:bg-brand-green/[0.05] hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-green px-1 text-[8px] font-bold text-black border border-zinc-950 shadow-md">
                {count}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon & Drawer */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Toggle Menu"
                className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-brand-green/45 hover:bg-brand-green/[0.05] hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all duration-300 md:hidden cursor-pointer"
              >
                <Menu className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 group-active:scale-95" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-xs bg-zinc-950/95 backdrop-blur-xl border-r border-white/10 text-zinc-100 flex flex-col p-6"
            >
              <SheetHeader className="border-b border-white/10 pb-4 text-left">
                <SheetTitle className="font-serif text-xl text-white flex items-center gap-2">
                  <img
                    src={brandLogo}
                    alt="Junaid Perfumes Logo"
                    className="h-8 w-8 rounded-full object-cover border border-zinc-800"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-[11px] tracking-[0.2em] text-zinc-100 uppercase font-semibold leading-none">
                      Junaid
                    </span>
                    <span className="font-serif text-[8px] tracking-[0.35em] text-zinc-400 uppercase mt-0.5 leading-none">
                      Perfumes
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Navigation links with mobile-friendly padding and premium theme */}
              <nav className="flex flex-col gap-1 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg py-3 px-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium border border-transparent hover:border-white/5"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Footer details in Drawer */}
              <div className="mt-auto border-t border-white/10 pt-6 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-green font-semibold">
                  Hand-crafted Luxury
                </p>
                <p className="text-[9px] text-zinc-500 mt-2">
                  Gulbarga, India
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="top-12 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] max-w-[92vw] sm:max-w-md md:max-w-lg bg-zinc-950/98 border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] p-5 gap-0">
          <DialogHeader className="pb-3 border-b border-zinc-900 text-left">
            <DialogTitle className="font-serif text-lg tracking-wide text-white">
              Discover Fragrances
            </DialogTitle>
          </DialogHeader>

          {/* Search Input Container */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, notes (e.g. saffron, vanilla)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brand-green focus:ring-1 focus:ring-brand-green/30 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all duration-300"
              autoFocus
            />
          </div>

          {/* Results Area */}
          <div className="mt-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
            {searchQuery.trim() === "" ? (
              <div className="py-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-3">
                  Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-full text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all duration-300 cursor-pointer animate-in fade-in-50 duration-350"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold block mb-1">
                  Matched Perfumes ({filteredProducts.length})
                </span>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleProductClick(p.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-transparent bg-zinc-900/20 hover:bg-white/[0.03] hover:border-white/5 cursor-pointer transition-all duration-300 group text-left"
                  >
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-zinc-950 border border-zinc-800">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-serif text-sm text-white font-medium truncate group-hover:text-brand-green transition-colors">
                          {p.name}
                        </h4>
                        <span className="text-brand-green text-xs font-semibold whitespace-nowrap">
                          {p.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                        {p.notes}
                      </p>
                      <div className="flex gap-1.5 mt-1">
                        {p.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[7px] font-semibold uppercase tracking-[0.05em] text-zinc-400 bg-white/5 border border-white/5 rounded px-1.5 py-0.5 whitespace-nowrap"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-2">
                <div className="h-10 w-10 rounded-full bg-zinc-900/50 flex items-center justify-center text-zinc-600 border border-zinc-800">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-sm text-zinc-400 font-medium">No results found for "{searchQuery}"</p>
                <p className="text-xs text-zinc-500">Try searching for other keywords like "Oud", "Musk", "Vanilla", or "Rose".</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
