import { useEffect, useState } from "react";
import slide2 from "@/assets/hero-slide-2.jpg";
import perfume4 from "@/assets/perfume4.jpg";
import oceanBreeze3 from "@/assets/ocean_breeze_3_1779388153359.png";
import saffronRouge1 from "@/assets/saffron_rouge_1.png";
import royalOud3 from "@/assets/royal_oud_3_1779387777372.png";
import amberNoir3 from "@/assets/amber_noir_3_1779388090357.png";
import midnightMusk3 from "@/assets/midnight_musk_3_1779387959375.png";

// Re-imported original slides
import heroPerfume from "@/assets/hero-perfume.jpg";
import perfumeOcean from "@/assets/perfume-ocean.jpg";
import perfumeVelvetOud from "@/assets/perfume-velvet-oud.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import slide4 from "@/assets/hero-slide-4.jpg";
import perfume1 from "@/assets/perfume1.jpg";
import perfume3 from "@/assets/perfume3.jpg";

const slides = [
  { src: slide2, alt: "Crystal perfume bottle with jasmine on black marble" },
  {
    src: perfume4,
    alt: "Luxury Chanel-style perfume bottle submerged in crystal clear water with beautiful splashes",
  },
  { src: oceanBreeze3, alt: "Fresh ocean breeze luxury perfume bottle" },
  { src: saffronRouge1, alt: "Crimson Saffron and velvety Red Rose luxury perfume bottle" },
  { src: royalOud3, alt: "Opulent and majestic Royal Oud luxury perfume bottle" },
  { src: amberNoir3, alt: "Warm amber and exotic resins luxury perfume bottle" },
  { src: midnightMusk3, alt: "Seductive midnight musk luxury perfume bottle" },

  // Original slides added back
  { src: perfumeOcean, alt: "Fresh ocean breeze luxury perfume bottle" },
  { src: heroPerfume, alt: "Luxury amber perfume bottle on silk with golden mist" },
  { src: perfume1, alt: "High-end amber perfume bottle with smoking mist and elegant candles" },
  { src: slide3, alt: "Amber perfume with peony on black silk" },
  { src: perfume3, alt: "Minimalist luxury perfume bottle on a sleek black marble pedestal" },
  { src: perfumeVelvetOud, alt: "Velvet oud perfume bottle in deep shadows" },
  { src: slide4, alt: "Golden perfume bottle with swirling mist and orchids" },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  useEffect(() => {
    // Preload all slides so the first transition isn't delayed by network
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });

    const nextSlide = () => {
      setIndex((i) => {
        setPrevIndex(i);
        return (i + 1) % slides.length;
      });
    };

    const first = setTimeout(nextSlide, 2000);
    const id = setInterval(nextSlide, 2000);

    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <section className="w-full relative overflow-hidden bg-zinc-950 flex flex-col-reverse md:flex-row min-h-[90vh] md:min-h-[80vh] md:h-[85vh] h-auto">
      {/* Massive subtle ambient glow in the middle behind everything */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-950/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* LEFT COLUMN: Text & Branding */}
      <div className="relative w-full flex-1 -mt-18 md:mt-0 px-6 pt-1 pb-8 z-10 flex flex-col items-center justify-center text-center bg-zinc-950 border-none md:border-t-0 md:relative md:top-0 md:left-0 md:translate-x-0 md:max-w-none md:w-1/2 md:items-start md:text-left md:pl-12 md:pr-6 md:py-24 md:backdrop-blur-none md:bg-zinc-950 md:rounded-none md:min-h-0 md:max-w-none md:mx-0 md:flex-none">
        {/* Mobile-only gradient overlay extending UPWARDS into the slideshow image to melt the horizontal border seam completely */}
        <div className="absolute inset-x-0 bottom-full h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20 md:hidden pointer-events-none" />

        {/* Laptop-only gradient overlay extending RIGHTWARDS into the slideshow image to melt the vertical center border seam completely */}
        <div className="absolute inset-y-0 left-full w-48 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-20 hidden md:block pointer-events-none" />

        {/* Luxury grid texture overlay hidden on mobile, faded on desktop */}
        <div className="hidden md:block absolute inset-0 bg-india-grid pointer-events-none opacity-[0.06] z-0" />

        {/* Luxury Ambient Glow behind text */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 w-full flex flex-col items-center md:items-start -translate-y-6 md:-translate-y-10">
          <p className="relative z-10 text-xs sm:text-sm tracking-widest leading-relaxed text-rose-200/90 font-normal">
            Junaid Perfumes · Est. 2026
          </p>
          <h1 className="relative z-10 mt-3 md:mt-4 font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-white break-words font-medium">
            Find Your{" "}
            <em className="font-serif italic font-normal text-rose-200/95">
              Signature
            </em>{" "}
            Scent
          </h1>

          <p className="relative z-10 mt-2.5 md:mt-3 text-xs sm:text-sm md:text-base tracking-wide leading-relaxed max-w-lg mx-auto md:mx-0 text-zinc-400">
            Hand-crafted luxury perfumes, delivered to your door across India in 3–5 days. Secure
            checkout powered by Razorpay.
          </p>
          <a
            href="#collection"
            className="relative z-10 mt-4 md:mt-4 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-brand-green-foreground shadow-lg shadow-brand-green/30 transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-brand-green/90"
          >
            Shop Collection
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN: Full-Image Slideshow */}
      <div className="relative w-full h-[52vh] sm:h-[58vh] z-0 bg-zinc-950 md:absolute md:inset-0 md:left-1/2 md:w-1/2 md:h-full md:min-h-full md:max-h-none md:min-h-0">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1080}
            height={1920}
            style={{
              transition: "opacity 1500ms ease-in-out",
            }}
            className={`absolute inset-0 h-full w-full object-cover object-center brightness-[0.45] md:brightness-[0.6] contrast-[1.05] saturate-[0.9] ${
              i === index ? "opacity-100 z-10" : i === prevIndex ? "opacity-0 z-5" : "opacity-0 z-0"
            }`}
          />
        ))}
        {/* Desktop-only dark shade overlay to enhance contrast and add a royal atmosphere */}
        <div className="hidden md:block absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      </div>
    </section>
  );
}
