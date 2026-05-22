import { ShieldCheck, Sparkles } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "Collections",
      links: ["Royal Oud", "Midnight Musk", "Desert Rose", "All Fragrances"],
    },
    {
      title: "About",
      links: ["Our Story", "Atelier in Gulbarga", "Ingredients", "Sustainability"],
    },
    {
      title: "Customer Care",
      links: ["Contact", "Shipping & Returns", "Track Order", "FAQs"],
    },
  ];

  return (
    <footer id="contact" className="bg-zinc-950 px-4 py-8 border-t border-zinc-900">
      <div className="mx-auto max-w-6xl">
        {/* Separator */}
        <div className="border-t border-zinc-900/60 w-full my-6" />



        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 items-start">
          {cols.map((c) => (
            <div key={c.title} className="flex flex-col justify-start">
              <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-brand-green">
                {c.title}
              </h4>
              <ul className="mt-3 flex flex-col justify-start gap-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="inline-block text-[11px] sm:text-sm text-zinc-300 transform transition-all duration-300 hover:text-white hover:translate-x-1"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/40 px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
            <ShieldCheck className="h-3 w-3 text-brand-green" strokeWidth={2} />
            Secure Razorpay Checkout
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/40 px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
            <Sparkles className="h-3 w-3 text-brand-green" strokeWidth={2} />
            100% Authentic Ingredients
          </span>
        </div>

        <div className="mt-8 text-center">
          <div className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.2em] text-zinc-100">
            Junaid Perfumes
          </div>
          <p className="mt-2 text-[10px] sm:text-xs text-zinc-500">
            © 2026 Junaid Perfumes. Hand-crafted in Gulbarga, India. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
