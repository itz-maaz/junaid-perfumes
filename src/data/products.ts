import royalOud1 from "@/assets/royal_oud_1_1779387736311.png";
import royalOud2 from "@/assets/royal_oud_2_1779387755891.png";
import royalOud3 from "@/assets/royal_oud_3_1779387777372.png";

import midnightMusk1 from "@/assets/midnight_musk_1_1779387922244.png";
import midnightMusk2 from "@/assets/midnight_musk_2_1779387940361.png";
import midnightMusk3 from "@/assets/midnight_musk_3_1779387959375.png";

import smokyVanilla1 from "@/assets/smoky_vanilla_1_1779387990655.png";
import smokyVanilla2 from "@/assets/smoky_vanilla_2_1779388010917.png";
import smokyVanilla3 from "@/assets/smoky_vanilla_3_1779388028922.png";

import oceanBreeze1 from "@/assets/ocean_breeze_1_1779388112222.png";
import oceanBreeze2 from "@/assets/ocean_breeze_2_1779388131718.png";
import oceanBreeze3 from "@/assets/ocean_breeze_3_1779388153359.png";

import amberNoir1 from "@/assets/amber_noir_1_1779388049600.png";
import amberNoir2 from "@/assets/amber_noir_2_1779388070610.png";
import amberNoir3 from "@/assets/amber_noir_3_1779388090357.png";

import velvetOud1 from "@/assets/velvet_oud_1_1779388178470.png";
import velvetOud2 from "@/assets/velvet_oud_2_1779388199014.png";
import velvetOud3 from "@/assets/velvet_oud_3_1779391106931.png";

import oudImperial1 from "@/assets/oud_imperial_1.png";
import oudImperial2 from "@/assets/oud_imperial_2.png";
import oudImperial3 from "@/assets/oud_imperial_3.png";

import santalLuxe1 from "@/assets/santal_luxe_1.png";
import santalLuxe2 from "@/assets/santal_luxe_2.png";
import santalLuxe3 from "@/assets/santal_luxe_3.png";

import saffronRouge1 from "@/assets/saffron_rouge_1.png";
import saffronRouge2 from "@/assets/saffron_rouge_2.png";
import saffronRouge3 from "@/assets/saffron_rouge_3.png";

import desertRose1 from "@/assets/desert_rose_1.png";
import desertRose2 from "@/assets/desert_rose_2.png";
import desertRose3 from "@/assets/desert_rose_3.png";

import velvetRose1 from "@/assets/velvet_rose_1.png";
import velvetRose2 from "@/assets/velvet_rose_2.png";
import velvetRose3 from "@/assets/velvet_rose_3.png";

import citrusBreeze1 from "@/assets/citrus_breeze_1.png";
import citrusBreeze2 from "@/assets/citrus_breeze_2.png";
import citrusBreeze3 from "@/assets/citrus_breeze_3.png";

export type Product = {
  id: string;
  name: string;
  notes: string;
  price: string;
  priceValue: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  ingredients: string;
  sizes: string[];
  priceValue100ml: number;
};

export const products: Product[] = [
  {
    id: "royal-oud",
    name: "Royal Oud",
    notes: "Oud · Saffron",
    price: "₹ 2,499",
    priceValue: 2499,
    priceValue100ml: 3699,
    image: royalOud1,
    images: [royalOud1, royalOud2, royalOud3],
    description: "An opulent, majestic fragrance that captures the essence of royal heritage. A deep, resinous Oud base is adorned with the vibrant gold of Saffron and warm, glowing Amber, creating an unforgettable aura of luxury.",
    highlights: ["Intense", "Royal", "Long-lasting"],
    topNotes: "Saffron, Nutmeg, Lavender",
    heartNotes: "Agarwood (Oud), Patchouli, Cypriol",
    baseNotes: "Amber, Musk, Oakmoss, Sandalwood",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Eugenol, Citral, Benzyl Alcohol, Farnesol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "midnight-musk",
    name: "Midnight Musk",
    notes: "Musk · Leather",
    price: "₹ 2,199",
    priceValue: 2199,
    priceValue100ml: 3399,
    image: midnightMusk1,
    images: [midnightMusk1, midnightMusk2, midnightMusk3],
    description: "A mysterious, seductive scent designed for the night. Sensual, velvety Musk is intertwined with raw, smokey Leather and earthy Vetiver, invoking a deep sense of intrigue and sophistication.",
    highlights: ["Night Wear", "Sensual", "Cruelty-free"],
    topNotes: "Bergamot, Pink Pepper, Juniper Berries",
    heartNotes: "Black Musk, Velvet Leather, Violet Leaves",
    baseNotes: "Haitian Vetiver, Cedarwood, Ambergris",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Alpha-Isomethyl Ionone, Coumarin, Benzyl Salicylate, Geraniol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "smoky-vanilla",
    name: "Smoky Vanilla",
    notes: "Vanilla · Tobacco",
    price: "₹ 1,899",
    priceValue: 1899,
    priceValue100ml: 3099,
    image: smokyVanilla1,
    images: [smokyVanilla1, smokyVanilla2, smokyVanilla3],
    description: "A warm, comforting yet highly sophisticated blend. Creamy, sweet Madagascar Vanilla is roasted over smokey Tobacco leaves and anchored by dry, aromatic Cedarwood, delivering a rich, unisex olfactory experience.",
    highlights: ["Unisex", "Cozy", "Madagascar Vanilla"],
    topNotes: "Spicy Accord, Tobacco Leaf, Cocoa",
    heartNotes: "Madagascar Vanilla, Tonka Bean, Tobacco Blossom",
    baseNotes: "Cedarwood, Dried Fruits, Woody Notes",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Benzyl Benzoate, Linalool, Cinnamal, Isoeugenol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    notes: "Bergamot · Salt",
    price: "₹ 1,799",
    priceValue: 1799,
    priceValue100ml: 2999,
    image: oceanBreeze1,
    images: [oceanBreeze1, oceanBreeze2, oceanBreeze3],
    description: "A refreshing, marine-inspired fragrance that evokes the coastal breeze of a Mediterranean escape. Zesty Bergamot opens into a salty, aquatic heart, balanced by the powdery elegance of precious Iris.",
    highlights: ["Fresh", "Day Wear", "Sustainable"],
    topNotes: "Sicilian Bergamot, Sea Salt, Lemon Peel",
    heartNotes: "Marine Accord, Iris, Neroli, Sage",
    baseNotes: "Driftwood, White Musk, Amber",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Geraniol, Benzyl Salicylate.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "amber-noir",
    name: "Amber Noir",
    notes: "Amber · Patchouli",
    price: "₹ 2,699",
    priceValue: 2699,
    priceValue100ml: 3899,
    image: amberNoir1,
    images: [amberNoir1, amberNoir2, amberNoir3],
    description: "A dark, mesmerizing oriental blend of rich Resins and warm Amber. Exotic Patchouli adds an earthy depth, creating a sensual and mysterious fragrance that lingers beautifully on the skin.",
    highlights: ["Hypnotic", "Exotic", "Pure Oil Blend"],
    topNotes: "Labdanum, Coriander, Incense",
    heartNotes: "Warm Amber, Benzoin, Patchouli",
    baseNotes: "Olibanum Resin, Vanilla Madagascar, Sandalwood",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Benzoate, Coumarin, Limonene, Linalool, Cinnamyl Alcohol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "saffron-rouge",
    name: "Saffron Rouge",
    notes: "Saffron · Rose",
    price: "₹ 2,899",
    priceValue: 2899,
    priceValue100ml: 4099,
    image: saffronRouge1,
    images: [saffronRouge1, saffronRouge2, saffronRouge3],
    description: "A passionate, romantic tribute to traditional Eastern perfumery. Crimson Saffron and velvety Red Rose are enveloped in the dark, seductive embrace of rich Oud, offering an intense and captivating scent journey.",
    highlights: ["Romantic", "Velvet", "Artisanal Blend"],
    topNotes: "Crimson Saffron, Jasmine Grandiflorum, Red Berries",
    heartNotes: "Damask Rose, Amberwood, Hedione",
    baseNotes: "Cambodian Oud, Cedarwood, Oakmoss",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Benzyl Benzoate.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "desert-rose",
    name: "Desert Rose",
    notes: "Rose · Pink Pepper",
    price: "₹ 2,399",
    priceValue: 2399,
    priceValue100ml: 3599,
    image: desertRose1,
    images: [desertRose1, desertRose2, desertRose3],
    description: "A blooming rose in the heart of the golden desert dunes. Sparkling Pink Pepper adds a spicy modern edge to the timeless Damask Rose, enveloped in a clean, soft, powdery Musk finish.",
    highlights: ["Modern", "Spicy", "All-Day Freshness"],
    topNotes: "Pink Pepper, Raspberry, Taif Rose",
    heartNotes: "Damask Rose, Turkish Rose, Jasmine",
    baseNotes: "White Musk, Papyrus, Sandalwood",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Citronellol, Geraniol, Linalool, Limonene, Citral, Eugenol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "velvet-oud",
    name: "Velvet Oud",
    notes: "Oud · Velvet",
    price: "₹ 3,199",
    priceValue: 3199,
    priceValue100ml: 4399,
    image: velvetOud1,
    images: [velvetOud1, velvetOud2, velvetOud3],
    description: "A beautifully smooth, velvety interpretation of premium Oud. Blended with creamy, milky Mysore Sandalwood and soft spices, it wraps the wearer in a luxurious, warm embrace of ultimate sophistication.",
    highlights: ["Silky", "Elegant", "Sandalwood"],
    topNotes: "Cardamom, Cinnamon, Incense",
    heartNotes: "Agarwood (Oud), Cashmere Wood, Velvet Orchid",
    baseNotes: "Mysore Sandalwood, Amber, Vanilla, Musk",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Coumarin, Limonene, Eugenol, Cinnamal, Geraniol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "oud-imperial",
    name: "Oud Imperial",
    notes: "Imperial Oud · Leather",
    price: "₹ 3,499",
    priceValue: 3499,
    priceValue100ml: 4699,
    image: oudImperial1,
    images: [oudImperial1, oudImperial2, oudImperial3],
    description: "The crown jewel of our collection, featuring rare Imperial Oud. Enriched with deep, smokey Leather and mystical Frankincense, this fragrance represents the pinnacle of premium Eastern perfumery.",
    highlights: ["Rare Oud", "Luxury", "Long-lasting"],
    topNotes: "Frankincense, Labdanum, Cypress",
    heartNotes: "Imperial Oud, Leather, Cedarwood Atlas",
    baseNotes: "Vetiver, Ambergris, Sandalwood, Castoreum",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Benzoate, Coumarin, Eugenol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    notes: "Velvet Rose · Damask Rose",
    price: "₹ 2,599",
    priceValue: 2599,
    priceValue100ml: 3799,
    image: velvetRose1,
    images: [velvetRose1, velvetRose2, velvetRose3],
    description: "A rich, indulgent gourmand-floral masterpiece. Velvet and Damask Roses are sweet-cured with decadent caramelized Praline and warm clove, creating an irresistible, mouth-watering luxury fragrance.",
    highlights: ["Indulgent", "Floral", "Intense"],
    topNotes: "Clove, Red Berries, Pink Pepper",
    heartNotes: "Damask Rose, Velvet Rose, Praline, Honey",
    baseNotes: "Oud, Amber, Sandalwood, Agarwood",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Citronellol, Geraniol, Linalool, Eugenol, Benzyl Alcohol.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "santal-luxe",
    name: "Santal Luxe",
    notes: "Sandalwood · Cardamom",
    price: "₹ 2,999",
    priceValue: 2999,
    priceValue100ml: 4199,
    image: santalLuxe1,
    images: [santalLuxe1, santalLuxe2, santalLuxe3],
    description: "An ultra-premium, dry woody fragrance inspired by traditional luxury. Creamy Sandalwood is spiked with green, aromatic Cardamom and balanced by dry, ancient Papyrus, exuding effortless style and quiet luxury.",
    highlights: ["Quiet Lux", "Woody", "Signature Scent"],
    topNotes: "Cardamom, Violet, Iris",
    heartNotes: "Papyrus, Sandalwood, Leather, Amber",
    baseNotes: "Cedarwood, Musk, Vetiver, Oakmoss",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Farnesol, Linalool, Limonene, Geraniol, Citral.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: "citrus-breeze",
    name: "Citrus Breeze",
    notes: "Neroli · Bergamot",
    price: "₹ 1,999",
    priceValue: 1999,
    priceValue100ml: 3199,
    image: citrusBreeze1,
    images: [citrusBreeze1, citrusBreeze2, citrusBreeze3],
    description: "A vibrant, uplifting explosion of sun-drenched Italian citrus. Delicate, sweet Neroli flower is combined with sparkling Bergamot and juicy Sicilian Lemon, presenting a bright, sparkling luxury scent.",
    highlights: ["Daytime", "Uplifting", "Unisex"],
    topNotes: "Sicilian Lemon, Mandarin Orange, Bergamot",
    heartNotes: "Neroli Blossom, Jasmine, Orange Flower",
    baseNotes: "Amber, Angelica Root, Musk, Ambrette",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citral, Geraniol, Farnesol.",
    sizes: ["50ml", "100ml"]
  }
];
