import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { ShieldCheck, Lock } from "lucide-react";

export function CheckoutDrawer() {
  const { items, isCheckoutOpen, setCheckoutOpen, total, count, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setCheckoutOpen(false);
  };

  return (
    <Sheet open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 text-zinc-100 flex flex-col p-0"
      >
        <SheetHeader className="border-b border-white/10 px-6 pt-6 pb-4">
          <SheetTitle className="font-serif text-2xl text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-brand-green" />
            Secure Checkout
          </SheetTitle>
          <SheetDescription className="text-zinc-400 text-xs uppercase tracking-[0.25em]">
            Review & Confirm Order
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handlePay} className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Items summary */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-2">
              Order ({count})
            </h3>
            <ul className="space-y-2 rounded-xl border border-white/5 bg-zinc-900/60 p-3">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={it.image} alt={it.name} className="h-10 w-8 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="font-serif text-white truncate">{it.name}</p>
                      <p className="text-[10px] text-zinc-500">Qty {it.qty}</p>
                    </div>
                  </div>
                  <span className="text-zinc-200 text-xs">
                    ₹ {(it.priceValue * it.qty).toLocaleString("en-IN")}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-400">Subtotal</span>
              <span className="font-serif text-xl text-white">
                ₹ {total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Shipping inputs */}
          <div className="space-y-3">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
              Shipping Details
            </h3>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand-green/60 focus:outline-none"
            />
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone Number"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand-green/60 focus:outline-none"
            />
            <textarea
              required
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Delivery Address"
              className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-brand-green/60 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full rounded-full bg-brand-green py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-green-foreground shadow-lg shadow-brand-green/20 transition active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              Pay Securely via Razorpay
            </button>
            <p className="text-center text-[10px] text-zinc-500">
              Free shipping across India • Cash on Delivery (COD) available
            </p>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
