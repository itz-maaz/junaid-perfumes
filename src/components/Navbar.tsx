import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import brandLogo from "@/assets/logo.png";

export function Navbar() {
  const { openCart, count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <button aria-label="Search" className="p-1.5 hover:text-white transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative p-1.5 hover:text-white transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-green px-1 text-[9px] font-bold text-brand-green-foreground">
                {count}
              </span>
            )}
          </button>

          {/* Mobile Menu Icon & Drawer */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Toggle Menu"
                className="p-1.5 hover:text-white transition-colors md:hidden cursor-pointer"
              >
                <Menu className="h-5 w-5" />
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
    </header>
  );
}
