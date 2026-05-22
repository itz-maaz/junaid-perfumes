import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQty, total, count, clear, openCheckout } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 text-zinc-100 flex flex-col"
      >
        <SheetHeader className="border-b border-white/10 pb-4">
          <SheetTitle className="font-serif text-2xl text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-green" />
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-zinc-400 text-xs uppercase tracking-[0.25em]">
            {count} {count === 1 ? "item" : "items"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <ShoppingBag className="h-10 w-10 text-zinc-700 mb-4" />
              <p className="font-serif text-lg text-zinc-300">Your cart is empty</p>
              <p className="text-xs text-zinc-500 mt-1">Add a signature scent to begin.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="flex gap-3 rounded-xl border border-white/5 bg-zinc-900/60 backdrop-blur p-3"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    className="h-20 w-16 rounded-md object-cover bg-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base text-white truncate">{it.name}</h4>
                    <p className="text-[10px] text-zinc-400 truncate">{it.notes}</p>
                    
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-zinc-200">
                        ₹ {(it.priceValue * it.qty).toLocaleString("en-IN")}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {/* Compact Qty Selector */}
                        <div className="flex items-center bg-zinc-950 rounded-md border border-white/10 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.qty - 1)}
                            disabled={it.qty <= 1}
                            className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 rounded text-xs transition-colors cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-[10px] font-mono font-medium text-white">
                            {it.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, it.qty + 1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-400 hover:text-white rounded text-xs transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Trash Icon */}
                        <button
                          onClick={() => removeItem(it.id)}
                          aria-label={`Remove ${it.name}`}
                          className="p-1.5 rounded-md border border-white/10 bg-white/5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">Subtotal</span>
              <span className="font-serif text-xl text-white">
                ₹ {total.toLocaleString("en-IN")}
              </span>
            </div>
            <button onClick={openCheckout} className="w-full rounded-full bg-brand-green py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-green-foreground shadow-lg shadow-brand-green/20 transition active:scale-[0.98] cursor-pointer">
              Secure Checkout
            </button>
            <button
              onClick={clear}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-[11px] uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
