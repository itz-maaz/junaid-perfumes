import { MapPin, Globe2, Truck } from "lucide-react";

// Destination nodes positioned across an abstract India layout (% coords)
const nodes = [
  { x: 28, y: 18, label: "Delhi" },
  { x: 22, y: 30, label: "Jaipur" },
  { x: 18, y: 52, label: "Mumbai" },
  { x: 42, y: 70, label: "Chennai" },
  { x: 55, y: 60, label: "Kolkata" },
  { x: 65, y: 28, label: "Guwahati" },
  { x: 30, y: 80, label: "Kochi" },
  { x: 50, y: 38, label: "Bhopal" },
];

// Gulbarga hub position (approximate)
const HUB = { x: 32, y: 60 };

export function ShippingMap() {
  return (
    <section id="story" className="relative w-full bg-zinc-950 border-b border-zinc-900">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-green">Live Network</p>
          <h2 className="mt-2 font-serif text-2xl sm:text-4xl text-white leading-tight">
            Delivered from Gulbarga
            <br className="sm:hidden" />
            <span className="italic font-normal"> to your doorstep.</span>
          </h2>
        </div>

        {/* Map */}
        <div className="relative mx-auto aspect-[4/5] sm:aspect-[5/4] w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
          <div className="absolute inset-0 bg-india-grid opacity-50" />

          {/* ALL · INDIA framing */}
          <div className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.4em] text-zinc-500">
            All · India
          </div>
          <div className="absolute bottom-3 right-3 text-[9px] uppercase tracking-[0.4em] text-zinc-500">
            Live Network
          </div>

          {/* SVG paths */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.78 0.21 145)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="oklch(0.78 0.21 145)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="glassLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.78 0.21 145 / 0.85)" />
                <stop offset="50%" stopColor="oklch(1 0 0 / 0.35)" />
                <stop offset="100%" stopColor="oklch(0.78 0.21 145 / 0.15)" />
              </linearGradient>
            </defs>
            <circle cx={HUB.x} cy={HUB.y} r="22" fill="url(#hubGlow)" />
            {nodes.map((n, i) => {
              const mx = (HUB.x + n.x) / 2;
              const my = Math.min(HUB.y, n.y) - 8;
              const d = `M ${HUB.x} ${HUB.y} Q ${mx} ${my} ${n.x} ${n.y}`;
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke="oklch(0 0 0 / 0.6)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke="url(#glassLine)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
          </svg>

          {/* Destination nodes (orange) */}
          {nodes.map((n) => (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_2px_oklch(0.75_0.18_55_/_0.6)]" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px] sm:text-[10px] uppercase tracking-widest text-zinc-400 whitespace-nowrap">
                {n.label}
              </span>
            </div>
          ))}

          {/* Gulbarga hub — pulsing green */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          >
            <span className="absolute inline-flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-brand-green opacity-60 animate-ping" />
            <span className="absolute inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-brand-green/40 animate-pulse" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-green ring-2 ring-zinc-950" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-brand-green/50 bg-zinc-950/80 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-green whitespace-nowrap">
              Gulbarga
            </span>
          </div>
        </div>

        {/* Stat boxes */}
        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { icon: MapPin, label: "Origin", value: "Gulbarga, KA" },
            { icon: Globe2, label: "Reach", value: "All 36 regions" },
            { icon: Truck, label: "Dispatch", value: "Within 24 hrs" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-5 text-center"
            >
              <Icon className="mx-auto h-4 w-4 sm:h-5 sm:w-5 text-brand-green" />
              <p className="mt-2 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
                {label}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-white">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Express courier to all 28 states across India. Each bottle hand-wrapped
          carefully and shipped within 24 hours.
        </p>
      </div>
    </section>
  );
}
