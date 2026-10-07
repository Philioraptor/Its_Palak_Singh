"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LightboxModal, { ProjectItem } from "@/components/LightboxModal";
import LuxuryPreloader from "@/components/LuxuryPreloader";

// 21 pages for Mental Health Book
const MENTAL_HEALTH_PAGES = Array.from(
  { length: 21 },
  (_, i) => `/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_${i + 1}.png`
);

const PROJECTS: ProjectItem[] = [
  // ─── LATEST COMMISSIONS, EDITORIAL & BRANDING (NEWEST FIRST) ───
  {
    id: "khoobsurat-magazine",
    num: "01",
    title: "Khoobsurat (खूबसूरत) — Aishwarya Rai Editorial Magazine",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/khoobsurat-magazine.jpeg",
    description: "Retro editorial Hindi-Urdu fashion cover featuring Aishwarya Rai, concentric vinyl groove texture, pop-art geometric starbursts, and bold Hindi typography.",
    tags: ["Editorial Cover", "Magazine Design", "Hindi Typography", "Pop Art"],
  },
  {
    id: "dhoni-magazine",
    num: "02",
    title: "DHONI 07 — Thala Helicopter Shot Magazine Cover",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/dhoni-magazine.jpeg",
    description: "Dynamic sports publication cover tribute celebrating MS Dhoni's iconic helicopter shot, 2023 IPL championship triumph, and leadership legacy with bold typographic hierarchy.",
    tags: ["Magazine Cover", "Sports Editorial", "Typography", "Celebrity Tribute"],
  },
  {
    id: "yum-yard-brand",
    num: "03",
    title: "Yum Yard — Restaurant Identity & Food Ordering UI",
    category: "Brand Identity",
    year: "2025",
    img: "/designs/yum-yard-web-ui.jpeg",
    pages: [
      "/designs/yum-yard-web-ui.jpeg",
      "/logo-designs/yum-yard-logo.jpeg",
    ],
    description: "Complete restaurant brand suite featuring whimsical chef mascot logo mark and modern eCommerce food ordering web application UI with category navigation and featured dish cards.",
    tags: ["Web UI", "Mascot Logo", "Brand Identity", "Restaurant Design"],
  },
  {
    id: "sweet-treats-cookies",
    num: "04",
    title: "Sweet Treats Cookies — Bakery Social Ad Campaign",
    category: "Brand Identity",
    year: "2025",
    img: "/book-designs/sweet-treats-cookies.jpeg",
    description: "Mouth-watering chocolate chip cookie social media advertising post utilizing warm split-tone color blocking, playful typography, and appetizing depth-of-field food staging.",
    tags: ["Social Media Ad", "Food Branding", "Typography", "Commercial Art"],
  },
  {
    id: "strawberry-icecream",
    num: "05",
    title: "Rich Flavoured Strawberry — Artisan Ice Cream Poster",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/strawberry-icecream.jpeg",
    description: "Vibrant high-contrast food & beverage commercial product poster showcasing a fresh strawberry waffle cone with dynamic floating berry elements and minimal layout.",
    tags: ["Food & Beverage", "Product Poster", "Commercial Art", "Retouching"],
  },
  {
    id: "kitkat-break-le",
    num: "06",
    title: "Nestlé KitKat — 'Break Le... But Make It Funny!' Campaign",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/kitkat-break-le.jpeg",
    description: "Playful character-driven brand redesign and mascot illustration featuring high-fiving wafer fingers in retro sunglasses, witty Hinglish copywriting, and bold chalk lettering.",
    tags: ["Character Design", "Mascot Illustration", "Brand Campaign", "Packaging Art"],
  },
  {
    id: "skyline-designers",
    num: "07",
    title: "Skyline Designers — Corporate Architectural Identity",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/skyline-designers-logo.jpeg",
    description: "Geometric corporate logo design for an architecture and construction firm, combining dynamic skyscraper silhouette vectors, arching bridge elements, and modern typography.",
    tags: ["Corporate Logo", "Architecture", "Vector Mark", "Brand Identity"],
  },
  {
    id: "shiva-matte-painting",
    num: "08",
    title: "Lord Shiva — Mount Kailash Fantasy Matte Painting",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/shiva-matte-painting.png",
    description: "High-detail digital fantasy matte painting and surreal compositing of Lord Shiva in deep meditation amidst the Himalayan heights, complete with roaring waterfalls, Shivling, and Trishula.",
    tags: ["Matte Painting", "Digital Compositing", "Photoshop Art", "Spiritual Fantasy"],
  },
  {
    id: "coffee-shop-concept",
    num: "09",
    title: "Artisan Coffee Shop — Wall Decor & Concept Art",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/coffee-shop-concept.jpeg",
    description: "Detailed rustic cafe interior visualization and wall artwork combining distressed brick textures, vintage coffee signage, arched window frames, and botanical styling.",
    tags: ["Interior Art", "Concept Art", "Architectural", "Texturing"],
  },
  {
    id: "boston-streetwear",
    num: "10",
    title: "Boston Streetwear — 'Fashion That Speaks You' Poster",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/boston-streetwear-poster.png",
    description: "Contemporary urban oversized streetwear campaign poster showcasing mannequin styling, sage green earth tones, and bold editorial headline typography.",
    tags: ["Streetwear Poster", "Fashion Editorial", "Typography", "Urban Apparel"],
  },
  {
    id: "tom-and-jerry-art",
    num: "11",
    title: "Tom & Jerry — Classic Animated Vector Art",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/tom-and-jerry-art.jpeg",
    description: "Clean line vector tribute illustration of the legendary Hanna-Barbera duo Tom and Jerry, rendered in bold cartoon outlines and vibrant pastel palette.",
    tags: ["Vector Illustration", "Character Art", "Cartoon", "Illustrator"],
  },
  {
    id: "cyan-specular-sphere",
    num: "12",
    title: "Cyan Specular Sphere — 3D Lighting & Form Study",
    category: "3D Modeling",
    year: "2025",
    img: "/3d-designs/cyan-sphere.jpeg",
    description: "Foundational 3D volumetric sphere study examining primary specular highlights, ambient bounce fill, core shadow gradients, and cast drop shadows.",
    tags: ["3D Study", "Lighting & Shading", "Form & Volume", "Digital Render"],
  },

  // ─── COMMERCIAL BRANDING & ADVERTISING CAMPAIGNS ───
  {
    id: "minimalist-vitamin-c",
    num: "13",
    title: "Minimalist Skincare — Vitamin C Storefront & Campaign",
    category: "Brand Identity",
    year: "2025",
    img: "/designs/vitamin-c-showroom-mockup.jpeg",
    pages: [
      "/designs/vitamin-c-showroom-mockup.jpeg",
      "/designs/vitamin-c-laptop-mockup.jpeg",
      "/designs/vitamin-c-glow-poster.png",
    ],
    description: "Complete commercial packaging, retail storefront, and eCommerce launch for Minimalist 10% Vitamin C Serum. Features flagship retail lightboard display, responsive laptop web showcase, and studio product poster.",
    tags: ["Storefront Mockup", "Packaging Design", "eCommerce UI", "Retail Display"],
  },
  {
    id: "dot-and-key-sunscreen",
    num: "14",
    title: "Dot & Key Skincare — Sun Protect SPF 50+ Campaign",
    category: "Brand Identity",
    year: "2025",
    img: "/designs/dot-and-key-sun-protect.png",
    pages: [
      "/designs/dot-and-key-sun-protect.png",
      "/designs/dot-and-key-social-mockup.jpeg",
    ],
    description: "Commercial packaging art and verified social media campaign for Dot & Key Sicilian blood orange sunscreen. Integrates 3D spiral fruit peel geometry, dynamic liquid splash mechanics, and promotional social post.",
    tags: ["Cosmetics Branding", "Packaging Ad", "Social Media Mockup", "Product Art"],
  },
  {
    id: "the-comfort-studio",
    num: "15",
    title: "The Comfort Studio — Furniture Campaign & Web UI",
    category: "Brand Identity",
    year: "2025",
    img: "/designs/comfort-studio-social-mockup.png",
    pages: [
      "/designs/comfort-studio-social-mockup.png",
      "/posters/FURNITURE.png",
    ],
    description: "Comprehensive brand launch for The Comfort Studio modern living collection. Features warm terracotta color grading, chesterfield sofa centerpiece, multi-platform Instagram feed mockups, and desktop hero banner.",
    tags: ["Brand Identity", "Web Banner UI", "Social Media Mockup", "Interior Design"],
  },
  {
    id: "urbanista-spotify-billboard",
    num: "16",
    title: "Urbanista × Spotify — Audio Billboard Campaign",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/spotify-headphone-billboard.jpeg",
    pages: [
      "/posters/spotify-headphone-billboard.jpeg",
      "/designs/headphone.png",
    ],
    description: "High-impact commercial billboard and advertising campaign for Urbanista wireless headphones co-branded with Spotify. Features crimson atmospheric lighting, live track waveform UI, and highway billboard mockup.",
    tags: ["Billboard Mockup", "Commercial Ad", "Spotify UI", "Industrial Design"],
  },
  {
    id: "crocs-step-into-ease",
    num: "17",
    title: "Crocs — Step Into Ease Campaign",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/CROCKS.png",
    description: "Bold street-fashion and footwear commercial campaign poster pairing oversized 3D typographic masking, cream streetwear model photography, and minimalist azure backdrop.",
    tags: ["Fashion Campaign", "Footwear Ad", "Typography", "Commercial Art"],
  },
  {
    id: "nike-suede-poster",
    num: "18",
    title: "Nike Suede XL — Commercial Footwear Poster",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/NIKE.png",
    description: "Striking cobalt blue footwear advertising poster for Nike Suede XL featuring heavy condensed typography, realistic contact drop shadows, and rustic white brick texture.",
    tags: ["Sneaker Poster", "Typography", "Commercial Ad", "Footwear"],
  },
  {
    id: "kit-chen-brochure",
    num: "19",
    title: "KIT CHEN. — Luxury Interior 4-Panel Brochure",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/kitchen-brochure.jpeg",
    pages: [
      "/book-designs/kitchen-brochure.jpeg",
      "/book-designs/kitchen-brochure-spread.jpeg",
    ],
    description: "Architectural 4-panel accordion & Z-fold commercial brochure design and 3D studio mockup for KIT CHEN. Features warm ambient illumination, interior photography, and modular kitchen specifications.",
    tags: ["Brochure Design", "Z-Fold", "Interior Architecture", "Print & Mockup"],
  },
  {
    id: "womens-leather-bag",
    num: "20",
    title: "Women's Bag — Eco-Leather Product Promo",
    category: "Brand Identity",
    year: "2025",
    img: "/designs/PURSE.png",
    description: "High-fashion luxury accessory advertising card featuring bold serif typography, warm terracotta accent palette, and commercial product presentation.",
    tags: ["Luxury Fashion", "Product Promo", "Typography", "Editorial Layout"],
  },
  {
    id: "silent-exporter-branding",
    num: "21",
    title: "The Silent Exporter — Global Brand Identity & Packaging",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/silent-exporter-branding.jpeg",
    description: "End-to-end commercial corporate identity system: 3D architectural facade signage, kraft packaging cartons, luxury business stationery, logistics shipping container branding, and matte luggage tags.",
    tags: ["Brand Identity", "Packaging Design", "Corporate Stationery", "Signage"],
  },
  {
    id: "silent-exporter-logo",
    num: "22",
    title: "The Silent Exporter — Brandmark & Monogram",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/silent-exporter-logo.jpeg",
    description: "Logomark fusing dynamic flight arrow trajectory, international globe wireframe, and cargo shipping cube into modern 'SE' monogram for global export logistics.",
    tags: ["Logo Design", "Monogram", "Vector Mark", "Brandmark"],
  },
  {
    id: "porsche-911-thrill",
    num: "23",
    title: "Porsche 911 GT3 — Experience The Thrill",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/PORSCHE.png",
    description: "Automotive dynamic triptych campaign poster featuring high-velocity Lava Orange Porsche 911 GT3, segmented motion angle panels, textured newsprint grain, and technical typography.",
    tags: ["Automotive Poster", "Triptych", "Poster Design", "Print Art"],
  },
  {
    id: "spiderman-tom-holland",
    num: "24",
    title: "Spider-Man / Tom Holland — The Hero",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/spider%20man.png",
    description: "Cinematic triple-panel tribute poster exploring Tom Holland as the actor, the suit, and the hero, set against textured monochrome grain with bold typography.",
    tags: ["Movie Poster", "Triptych", "Cinematic Art", "Character Tribute"],
  },
  {
    id: "take-off-your-mask",
    num: "25",
    title: "Take Off Your Mask — Surreal Editorial",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/bold%20poster.png",
    description: "Avant-garde high-fashion surrealist editorial poster with digital liquid eye-slice distortion, deep crimson color blocking, and raw stipple grain typography.",
    tags: ["Editorial Poster", "Surrealism", "Fashion Art", "Typography"],
  },
  {
    id: "kanye-sliced-portrait",
    num: "26",
    title: "Photo Manipulation — Sliced Portrait Study",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/photo%20manipulation.png",
    description: "Surrealist portrait displacement artwork cutting Kanye West's visage with woodgrain core textures and emerald studio backdrop.",
    tags: ["Photo Manipulation", "Surrealist Art", "Digital Compositing"],
  },

  // ─── FOUNDATIONAL EDITORIAL, BRANDING & 3D ARTWORKS ───
  {
    id: "mental-health-book",
    num: "27",
    title: "Mental Health Awareness — 21-Page Book",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/pdf_pages/BOOK_DESIGN_PALAK_page_1.png",
    description: "Complete 21-page institutional research and mental health awareness book layout. Includes conceptual cover art, chapter typography, structured content grids, and medical illustration graphics.",
    tags: ["21-Page Book", "Editorial Layout", "Typography", "Infographics"],
    pages: MENTAL_HEALTH_PAGES,
  },
  {
    id: "she-healed-herself",
    num: "28",
    title: "She Healed Herself — Book Design",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/WhatsApp%20Image%202026-09-21%20at%203.05.19%20PM.jpeg",
    description: "Emotive book cover and interior typography spread. Portrays an anatomical heart wrapped in healing bandages with sensitive, poignant verse typesetting.",
    tags: ["Book Cover", "Typography", "Poetry Layout"],
    pages: ["/book-designs/WhatsApp%20Image%202026-09-21%20at%203.05.19%20PM.jpeg"],
  },
  {
    id: "sony-product-catalog",
    num: "29",
    title: "Product Catalog — The Art of Capturing Life",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/pdf_pages/CATALOG_PALAK_page_1.png",
    description: "Corporate multi-grid photography catalog for mirrorless cameras and lenses. High-fashion angular geometry and bold editorial typesetting.",
    tags: ["Catalog Design", "Commercial Print", "Camera Gear"],
  },
  {
    id: "spicy-food-menu",
    num: "30",
    title: "Spicy Food — Restaurant Menu Card",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/pdf_pages/MENU_CARD_PALAK_page_1.png",
    description: "Modern restaurant menu card layout featuring culinary photography, dark slate textures, price lists, and vibrant typography.",
    tags: ["Menu Card", "Hospitality", "Print Design"],
  },
  {
    id: "crime-newspaper",
    num: "31",
    title: "Crime Newspaper — Retro Tabloid Layout",
    category: "Book & Editorial",
    year: "2025",
    img: "/book-designs/pdf_pages/CRIME_NEWSPAPER_PALAK_page_1.png",
    description: "Authentic retro tabloid crime newspaper spread design featuring sensational news headlines, column typography, distressed halftone paper grain, and vintage advertisements.",
    tags: ["Newspaper", "Editorial", "Print Layout"],
  },
  {
    id: "palak-co-skincare",
    num: "32",
    title: "The Palak Co. — Luxury Skincare",
    category: "Brand Identity",
    year: "2025",
    img: "/book-designs/WhatsApp%20Image%202026-09-28%20at%2011.32.00%20PM.jpeg",
    description: "Complete luxury cosmetic and skincare branding system — product bottles, glass dropper serum, moisturizer jar, lip tint packaging, bespoke craft shopping bag, and unboxing note card.",
    tags: ["Packaging", "Branding", "Luxury Cosmetics", "Mockups"],
  },
  {
    id: "bare-wear-apparel",
    num: "33",
    title: "Bare Wear — Streetwear Identity",
    category: "Brand Identity",
    year: "2025",
    img: "/book-designs/WhatsApp%20Image%202026-09-29%20at%2012.58.26%20AM.jpeg",
    description: "Comprehensive apparel brand identity showcase: storefront facade signage, oversized hoodie merchandise, embroidered cap, garment tags, tissue wrap, matte black packaging box, and mobile shopping app preview.",
    tags: ["Streetwear", "Apparel", "Visual Identity", "Merchandise"],
  },
  {
    id: "bare-wear-logo",
    num: "34",
    title: "Bare Wear Logo — Negative Space Mark",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/CLOTHE%20BRAND%20LOGO.jpg.jpeg",
    description: "Minimalist fashion house emblem utilizing clever negative-space silhouette within bold contemporary letterforms.",
    tags: ["Logo Design", "Negative Space", "Fashion"],
  },
  {
    id: "the-palak-co-logo",
    num: "35",
    title: "The Palak Co. — Brandmark",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/PALAK%20BEAUTY%20LOGO.jpg.jpeg",
    description: "Graceful serif monogram blending profile silhouette and botanical leaf flourishes for beauty, wellness and skincare branding.",
    tags: ["Monogram", "Beauty Logo", "Minimalist"],
  },
  {
    id: "design-adda-studio",
    num: "36",
    title: "Design Adda Studio — Brand Identity",
    category: "Brand Identity",
    year: "2025",
    img: "/logo-designs/1.jpeg",
    description: "Brand identity & logo design crafted for client Design Adda Studio, integrating an architectural shelter, pencil trajectory, and golden stars.",
    tags: ["Client Project", "Logo Design", "Identity", "Gold Accent"],
  },
  {
    id: "pepsi-3d-can",
    num: "37",
    title: "3D Pepsi Can — Dynamic Render",
    category: "3D Modeling",
    year: "2025",
    img: "/3d-designs/3D%20BOTTLE.jpg.jpeg",
    description: "Digital 3D modeling and product visualization of an icy Pepsi beverage can with angled dynamic perspective, realistic metallic highlights, and drop shadows.",
    tags: ["3D Modeling", "Product Render", "Industrial Design"],
  },
  {
    id: "fanta-3d-bottle",
    num: "38",
    title: "Fanta Orange — 3D Bottle Design",
    category: "3D Modeling",
    year: "2025",
    img: "/3d-designs/FANTA%203D%20BOTTLE.jpg.jpeg",
    description: "Detailed 3D container render for Fanta Orange featuring custom contoured bottle geometry, volumetric citrus color shading, and studio lighting.",
    tags: ["3D Packaging", "Lighting", "Product Modeling"],
  },
  {
    id: "shampoo-3d-bottle",
    num: "39",
    title: "3D Shampoo Container & Pump",
    category: "3D Modeling",
    year: "2025",
    img: "/3d-designs/SHAMPOO%203D%20BOTTLE.jpg.jpeg",
    description: "Studio product modeling of a cosmetic shampoo bottle with realistic dispenser pump mechanics, soft pastel backdrop, and contact shadows.",
    tags: ["3D Cosmetics", "Product Visualization", "Rendering"],
  },
  {
    id: "banaras-cultural-poster",
    num: "40",
    title: "Banaras — Spiritual & Ancient City",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/BANARAS%20POSTER.png",
    description: "Cultural tribute poster featuring split-typography masking over golden Kashi river ghats, temple spires, holy boats, and evocative Hindi caption 'काशी — आस्था, संस्कृति और सुकून'.",
    tags: ["Poster Design", "Typography Masking", "Culture", "Digital Art"],
  },
  {
    id: "fashion-model-sale",
    num: "41",
    title: "Special Sale — 80% Off Campaign",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/MODEL%20POSTER.png",
    description: "Modern commercial fashion campaign poster with high-contrast emerald canvas, multi-angle model photography cutouts, and editorial typography.",
    tags: ["Fashion Poster", "Editorial Layout", "Commercial"],
  },
  {
    id: "mono-new-arrival",
    num: "42",
    title: "MONO — New Arrival",
    category: "Posters & Art",
    year: "2025",
    img: "/posters/POSTER.png",
    description: "Minimalist urban apparel release poster employing a geometric three-column triptych format with technical grid background and high-fashion mood.",
    tags: ["Minimal Poster", "Triptych", "Street Fashion"],
  },
  {
    id: "money-heist-poster",
    num: "43",
    title: "Money Heist — Cinematic Film Poster",
    category: "Posters & Art",
    year: "2024",
    img: "/posters/WhatsApp%20Image%202026-09-21%20at%203.05.45%20PM.jpeg",
    description: "Dark, gritty photomontage poster design inspired by Netflix's Money Heist. Blends Polaroid-style cast portraits, Salvador Dali mask iconography, and weathered banknote newsprint texture.",
    tags: ["Movie Poster", "Photomontage", "Dark Aesthetics"],
  },
  {
    id: "moonlit-waterfall",
    num: "44",
    title: "Moonlit Waterfall — Fantasy Matte Painting",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/WhatsApp%20Image%202026-09-21%20at%203.05.45%20PM3.jpeg",
    description: "Surreal nighttime fantasy photomanipulation combining a colossal moon, roaring waterfall gorge, twilight mist atmosphere, and lone traveler figure.",
    tags: ["Matte Painting", "Photomanipulation", "Fantasy Art"],
  },
  {
    id: "vintage-car-drive",
    num: "45",
    title: "Vintage Car Drive — Film Color Grading",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/WhatsApp%20Image%202026-09-21%20at%203.05.45%20PM%20(5).jpeg",
    description: "1950s Kodachrome analog film simulation on classic automobile rally photography, infusing rich grain, aged borders, and warm sunlight patina.",
    tags: ["Color Grading", "Film Emulation", "Vintage"],
  },
  {
    id: "iron-man-typography",
    num: "46",
    title: "Tony Stark — Typography Portrait",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/WhatsApp%20Image%202026-09-21%20at%203.05.45%20PM%20(2).jpeg",
    description: "Intricate text-shading art piece forming Robert Downey Jr.'s Iron Man visage using Marvel dialogue transcripts and character monologues in high-contrast shadow.",
    tags: ["Typography Art", "Marvel", "Text Masking"],
  },
  {
    id: "retro-stipple-portrait",
    num: "47",
    title: "Retro Ink Stipple Portrait",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/WhatsApp%20Image%202026-09-21%20at%203.05.45%20PM%20(3).jpeg",
    description: "Vintage pointillism and hatched contour portrait study with rich tonal depth, classic cat-eye eyeliner, and 60s bow aesthetic.",
    tags: ["Stippling", "Ink Art", "Digital Sketch"],
  },
  {
    id: "landscape-cabin-grading",
    num: "48",
    title: "Alpine Cabin — Before/After Recolor",
    category: "Posters & Art",
    year: "2025",
    img: "/designs/WhatsApp%20Image%202026-09-21%20at%203.05.29%20PM2.jpeg",
    description: "Side-by-side color transformation demonstrating mood manipulation from alpine daylight to twilight lavender surrealism.",
    tags: ["Photo Editing", "Before/After", "Environment"],
  },
];

const CATEGORIES = [
  "All",
  "Book & Editorial",
  "Brand Identity",
  "3D Modeling",
  "Posters & Art",
];

// Software Suite (Exactly the 4 requested: Photoshop, Illustrator, Corel draw, InDesign)
const SOFTWARES = [
  {
    name: "Photoshop",
    fullName: "Adobe Photoshop",
    abbr: "Ps",
    color: "#31A8FF",
    border: "rgba(49, 168, 255, 0.4)",
    bg: "rgba(49, 168, 255, 0.08)",
    specialty: "Photo Manipulation & Matte Compositing",
    desc: "Surreal matte paintings, high-end commercial retouching, complex mask cutouts, and cinematic color grading.",
  },
  {
    name: "Illustrator",
    fullName: "Adobe Illustrator",
    abbr: "Ai",
    color: "#FF9A00",
    border: "rgba(255, 154, 0, 0.4)",
    bg: "rgba(255, 154, 0, 0.08)",
    specialty: "Vector Branding & Digital Inking",
    desc: "Pixel-perfect brand logos, custom typography, negative-space marks, and vector illustration systems.",
  },
  {
    name: "Corel draw",
    fullName: "CorelDRAW Technical Suite",
    abbr: "Cd",
    color: "#00C853",
    border: "rgba(0, 200, 83, 0.4)",
    bg: "rgba(0, 200, 83, 0.08)",
    specialty: "Print Production & Vector Architecture",
    desc: "Large-format outdoor banners, commercial dieline packaging, signages, and pre-press manufacturing.",
  },
  {
    name: "InDesign",
    fullName: "Adobe InDesign",
    abbr: "Id",
    color: "#FF3366",
    border: "rgba(255, 51, 102, 0.4)",
    bg: "rgba(255, 51, 102, 0.08)",
    specialty: "Editorial Layout & Book Publishing",
    desc: "Multi-page publication volumes, editorial catalogs, restaurant menus, and master page grid architecture.",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // High-performance RAF scroll parallax: 0 React re-renders, 120 FPS
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (portraitRef.current) {
            portraitRef.current.style.transform = `translate3d(0, ${Math.min(y * 0.14, 140)}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── MASTER SCROLL-REVEAL: Intersection Observer (zero React state) ──
  useEffect(() => {
    // 1. Generic reveal elements (.reveal, .reveal-left, .reveal-right)
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right');
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealIO.observe(el));

    // 2. Staggered portfolio card reveal
    const cardEls = document.querySelectorAll<HTMLElement>('.reveal-card');
    const cardIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const idx = Number(el.dataset.cardIdx ?? 0);
            setTimeout(() => el.classList.add('visible'), idx * 80);
            cardIO.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    cardEls.forEach((el, i) => {
      el.dataset.cardIdx = String(i % 6); // reset stagger per row of 3
      cardIO.observe(el);
    });

    // 3. Software card stagger reveal
    const swEls = document.querySelectorAll<HTMLElement>('.sw-card-reveal');
    const swIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const idx = Number(el.dataset.swIdx ?? 0);
            setTimeout(() => el.classList.add('visible'), idx * 110);
            swIO.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    swEls.forEach((el, i) => {
      el.dataset.swIdx = String(i);
      swIO.observe(el);
    });

    // 4. Animated stat counters + ring glow
    const countUp = (el: HTMLElement, target: string) => {
      const isPercent = target.includes('%');
      const isPlus = target.includes('+');
      const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
      const duration = 1400;
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = Math.min(now - startTime, duration);
        const progress = elapsed / duration;
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * num);
        el.textContent = `${current}${isPercent ? '%' : ''}${isPlus ? '+' : ''}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const statEls = document.querySelectorAll<HTMLElement>('.stat-counter');
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = el.dataset.target ?? el.textContent ?? '';
            el.dataset.target = target;
            countUp(el, target);
            el.closest('.stat-ring')?.classList.add('lit');
            statIO.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach((el) => statIO.observe(el));

    // 5. Contact heading word-by-word reveal
    const wordEls = document.querySelectorAll<HTMLElement>('.contact-heading-word');
    const wordIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            wordEls.forEach((w, i) => {
              setTimeout(() => w.classList.add('visible'), i * 120);
            });
            wordIO.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (wordEls[0]) wordIO.observe(wordEls[0]);

    return () => {
      revealIO.disconnect();
      cardIO.disconnect();
      swIO.disconnect();
      statIO.disconnect();
      wordIO.disconnect();
    };
  }, []);


  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const currentProject = activeLightboxIndex !== null ? filteredProjects[activeLightboxIndex] : null;

  const handleNextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! + 1) % filteredProjects.length);
  };

  const handlePrevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-[#c9a84c] selection:text-black overflow-x-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* LUXURY EDITORIAL PRELOADER */}
      <LuxuryPreloader onComplete={() => window.scrollTo(0, 0)} />


      {/* ─── STATIC LUXURY AMBIENT GLOW (NON-DISTURBING) ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#c9a84c]/[0.03] rounded-full blur-[200px]" />
      </div>

      {/* Lightbox Modal with Multi-Page Reader */}
      <LightboxModal
        isOpen={activeLightboxIndex !== null}
        project={currentProject}
        onClose={() => setActiveLightboxIndex(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
        currentIndex={activeLightboxIndex ?? 0}
        totalCount={filteredProjects.length}
      />

      {/* ─── NAVBAR (CENTERED CONTENT) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-black/75 border-b border-white/[0.07]">
        <a className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white hover:text-[#c9a84c] transition-colors" href="#">
          <span className="w-8 h-8 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] font-black text-xs shadow-lg shadow-[#c9a84c]/10">
            PS
          </span>
          <span>Palak Singh <span className="text-[#c9a84c] text-xs font-normal">/ Graphic Designer</span></span>
        </a>
        <div className="flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          <a href="#work" className="text-white/60 hover:text-white transition-colors">Work ({PROJECTS.length})</a>
          <a href="#software" className="text-white/60 hover:text-white transition-colors">Software</a>
          <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-[#c9a84c] hover:underline">Contact</a>
        </div>
      </nav>

      {/* ─── HERO SECTION (CONTINUOUS KINETIC TYPOGRAPHY & SMOOTH PARALLAX) ─── */}
      <section className="relative min-h-screen pt-20 sm:pt-24 pb-10 px-4 sm:px-6 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        {/* Availability Badge */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest uppercase text-white/70">
          <span className="w-2 h-2 rounded-full bg-emerald-400 heartbeat-dot" />
          <span>Available for Freelance & Creative Collaborations</span>
        </div>

        {/* ─── KINETIC CONTINUOUS MARQUEE & FLOATING PORTRAIT ─── */}
        <div className="relative w-full overflow-hidden select-none py-2 flex flex-col items-center justify-center">
          {/* Row 1: PALAK gliding smoothly leftward (Continuous 60-120fps CSS Marquee) */}
          <div className="w-full overflow-hidden">
            <div className="marquee-left">
              <span className="font-black uppercase text-[15vw] sm:text-[11vw] leading-[0.82] tracking-tighter text-white/95 text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] px-4">
                PALAK · GRAPHIC DESIGNER · PALAK · VISUAL ARTIST · BRAND ARCHITECT ·&nbsp;
              </span>
              <span className="font-black uppercase text-[15vw] sm:text-[11vw] leading-[0.82] tracking-tighter text-white/95 text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] px-4" aria-hidden="true">
                PALAK · GRAPHIC DESIGNER · PALAK · VISUAL ARTIST · BRAND ARCHITECT ·&nbsp;
              </span>
            </div>
          </div>

          {/* Center Floating Portrait Overlapping Text with Smooth Parallax */}
          <div
            ref={portraitRef}
            className="relative -mt-12 sm:-mt-20 md:-mt-28 w-[190px] sm:w-[230px] md:w-[260px] aspect-[3/4] z-20 mx-auto will-change-transform"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#c9a84c] shadow-[0_20px_60px_rgba(201,168,76,0.35)] bg-[#121212] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/palak-pics/Palak%20professional%20picture.jpeg"
                alt="Palak Singh - Graphic Designer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Bottom Badge */}
              <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-left">
                <div>
                  <div className="text-[11px] font-bold text-white">Palak Singh</div>
                  <div className="text-[9px] text-[#c9a84c] font-mono">Graphic Designer · India</div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/40">
                  ✦ 2026
                </span>
              </div>
            </div>

            {/* Floating Gold Star Badge */}
            <div
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full border border-[#c9a84c] flex items-center justify-center text-[#c9a84c] text-xs font-mono bg-black/90 shadow-lg shadow-[#c9a84c]/30"
            >
              ✦
            </div>
          </div>

          {/* Row 2: SINGH gliding smoothly rightward (Continuous 60-120fps CSS Marquee) */}
          <div className="w-full overflow-hidden -mt-10 sm:-mt-16">
            <div className="marquee-right">
              <span
                className="font-black uppercase text-[15vw] sm:text-[11vw] leading-[0.82] tracking-tighter text-transparent text-center px-4"
                style={{ WebkitTextStroke: "1.5px rgba(201,168,76,0.8)" }}
              >
                SINGH · BOOK DESIGN · BRAND IDENTITY · 3D PRODUCT · EDITORIAL ·&nbsp;
              </span>
              <span
                className="font-black uppercase text-[15vw] sm:text-[11vw] leading-[0.82] tracking-tighter text-transparent text-center px-4"
                style={{ WebkitTextStroke: "1.5px rgba(201,168,76,0.8)" }}
                aria-hidden="true"
              >
                SINGH · BOOK DESIGN · BRAND IDENTITY · 3D PRODUCT · EDITORIAL ·&nbsp;
              </span>
            </div>
          </div>
        </div>

        {/* Centered Tagline with Balanced Spacing */}
        <div className="mt-5 sm:mt-6 text-center z-20 max-w-2xl mx-auto">
          <p className="text-sm sm:text-xl font-medium tracking-wide text-[#c9a84c] uppercase">
            Graphic Designer · Book Design · Brand Identity · 3D Art
          </p>

          <p className="mt-1.5 text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
            Crafting visual identities, luxury packaging, publication books, 3D product renders, and high-impact commercial campaigns.
          </p>
        </div>

        {/* Centered Action Buttons */}
        <div className="mt-5 flex items-center justify-center gap-4 z-20 flex-wrap">
          <a
            href="#work"
            className="px-7 py-3 rounded-full bg-[#c9a84c] text-black font-bold text-xs tracking-widest uppercase hover:bg-[#e0c06a] transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/20"
          >
            Explore Selected Works ({PROJECTS.length}) ↓
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full border border-white/20 text-white font-medium text-xs tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
          >
            Get In Touch ↗
          </a>
        </div>

        {/* Centered Scroll Indicator */}
        <div className="mt-5 z-20 flex flex-col items-center">
          <a href="#work" className="scroll-pill" aria-label="Scroll down">
            <span className="scroll-pill-dot" />
          </a>
        </div>
      </section>

      {/* ─── SELECTED WORK SECTION (100% CENTER-ALIGNED) ─── */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto z-10 relative" id="work">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <span className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2">
            <span>✦</span> Selected Work <span>✦</span>
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase mt-2">
            Featured Portfolio
          </h2>
          <div className="gold-divider mt-4" />
          <p className="text-xs sm:text-sm text-white/50 mt-4 max-w-xl mx-auto">
            Click any project to view the full uncropped artwork in high-resolution, or flip through multi-page publication books.
          </p>
          <div className="mt-3 text-xs font-mono text-[#c9a84c]">
            Showing {filteredProjects.length} of {PROJECTS.length} Works
          </div>
        </div>

        {/* Centered Filter Pills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap pb-10 reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Centered Cards Grid (Mockup V2 Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-card reveal-card clickable-card group flex flex-col justify-between"
              onClick={() => setActiveLightboxIndex(index)}
            >

              {/* Image Container with Proper Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616] flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="card-img max-h-full max-w-full object-contain rounded"
                  loading="lazy"
                />

                {/* Floating View Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#c9a84c]/50 text-[10px] font-mono text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.pages && project.pages.length > 1
                    ? `Read ${project.pages.length} Pages 📖`
                    : "View Full ↗"}
                </div>

                {/* Number Watermark */}
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/40">
                  #{project.num}
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="p-5 flex flex-col justify-between flex-1 border-t border-white/5 bg-[#101010]">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#c9a84c] mb-1.5 uppercase">
                    <span>{project.category}</span>
                    <span className="text-white/40">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#c9a84c] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/55 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                {project.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SOFTWARE MASTERY SECTION (100% CENTERED, EXACT 4 TOOLS) ─── */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 z-10 relative" id="software">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2">
            <span>✦</span> Core Arsenal <span>✦</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
            Software Mastery
          </h2>
          <div className="gold-divider mt-4" />
          <p className="text-xs sm:text-sm text-white/50 mt-4 max-w-xl mx-auto">
            The core creative powerhouses utilized to execute vector branding, photorealistic compositing, large-format manufacturing, and editorial volumes.
          </p>
        </div>

        {/* 4 Software Cards (Minimalist Luxury · Zero Proficiency Numbers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {SOFTWARES.map((sw, index) => (
            <div
              key={sw.name}
              className="sw-card-reveal relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2 group text-left flex flex-col justify-between"
              style={{
                backgroundColor: "#111111",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sw.border;
                e.currentTarget.style.boxShadow = `0 16px 40px -10px ${sw.bg}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >

              <div>
                {/* Top: Icon + Abbreviation badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg border"
                    style={{
                      backgroundColor: sw.bg,
                      borderColor: sw.border,
                      color: sw.color,
                    }}
                  >
                    {sw.abbr}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/50 bg-white/[0.03]">
                    Tool · 0{index + 1}
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {sw.name}
                </h3>
                <p
                  className="text-xs font-mono mt-1 font-semibold"
                  style={{ color: sw.color }}
                >
                  {sw.specialty}
                </p>

                {/* Description */}
                <p className="text-xs text-white/55 mt-3 leading-relaxed">
                  {sw.desc}
                </p>
              </div>

              {/* Bottom Subtle Pill */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>{sw.fullName}</span>
                <span className="text-[#c9a84c]">✦ Mastered</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT & SECOND PROFESSIONAL PHOTO (100% CENTER-ALIGNED) ─── */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 z-10 relative" id="about">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <span className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2">
            <span>✦</span> Behind The Work <span>✦</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-2">
            About The Designer
          </h2>
          <div className="gold-divider mt-4" />
        </div>

        {/* 100% Centered Showcase */}
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Centered Portrait Frame */}
          <div className="reveal-left relative w-48 sm:w-56 md:w-64 aspect-[3/4] rounded-2xl border-2 border-[#c9a84c] p-1.5 shadow-[0_20px_50px_rgba(201,168,76,0.25)] bg-[#121212] group mb-8 overflow-hidden">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/palak-pics/Palak%20professional%20picture2.jpeg"
                alt="Palak Singh - Portrait"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-2 right-2 text-center">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Palak Singh</div>
                <div className="text-[10px] text-[#c9a84c] font-mono">Graphic Designer · India</div>
              </div>
            </div>
          </div>

          {/* Centered Headline */}
          <h3 className="reveal text-2xl sm:text-4xl font-black tracking-tight text-white uppercase max-w-2xl">
            Transforming Ideas Into Iconic Visuals
          </h3>

          {/* Centered Bio */}
          <div className="reveal-right mt-6 text-sm sm:text-base text-white/70 space-y-4 font-light leading-relaxed max-w-2xl text-center">
            <p>
              Hello! I&apos;m <span className="text-white font-medium">Palak Singh</span>, an India-based graphic designer and visual artist specializing in brand identities, multi-page publication books, 3D product visualization, and high-impact advertising posters.
            </p>
            <p>
              With advanced expertise across <span className="text-[#31A8FF] font-medium">Photoshop</span>, <span className="text-[#FF9A00] font-medium">Illustrator</span>, <span className="text-[#00C853] font-medium">Corel draw</span>, and <span className="text-[#FF3366] font-medium">InDesign</span>, I turn client requirements into cohesive, high-converting visual assets across physical packaging, commercial print, and digital media.
            </p>
          </div>

          {/* Centered Metrics — Animated Count-Up */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/10 text-center w-full max-w-lg">
            <div>
              <div className="stat-ring inline-block">
                <div className="stat-counter text-2xl sm:text-4xl font-black text-[#c9a84c]">48+</div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider font-mono mt-1">Portfolio Works</div>
            </div>
            <div>
              <div className="stat-ring inline-block">
                <div className="stat-counter text-2xl sm:text-4xl font-black text-[#c9a84c]">4</div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider font-mono mt-1">Design Softwares</div>
            </div>
            <div>
              <div className="stat-ring inline-block">
                <div className="stat-counter text-2xl sm:text-4xl font-black text-[#c9a84c]">100%</div>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider font-mono mt-1">Custom Craft</div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── CONTACT SECTION (100% CENTER-ALIGNED) ─── */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto text-center border-t border-white/10 z-10 relative" id="contact">
        <span className="text-[#c9a84c] text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 reveal">
          <span>✦</span> Start A Conversation <span>✦</span>
        </span>
        <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-white uppercase mt-4 leading-none">
          <span className="contact-heading-word">Let&apos;s</span>{" "}
          <span className="contact-heading-word">Build</span>{" "}
          <span className="contact-heading-word">Something</span>
          <br />
          <span
            className="contact-heading-word text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(201,168,76,0.9)" }}
          >
            Extraordinary
          </span>
        </h2>
        <p className="reveal mt-6 text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
          Have an upcoming project, brand identity revamp, packaging concept, publication book, or freelance requirement? Reach out directly and let&apos;s bring your vision to life.
        </p>

        {/* Direct One-Click Communication Channels (No raw IDs shown on UI) */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-5 max-w-xl mx-auto">
          {/* Email Button */}
          <a
            href="mailto:palaksingh.creator@gmail.com"
            className="px-9 py-4 rounded-full bg-[#c9a84c] text-black font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-[#e0c06a] transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/20 flex items-center gap-2.5 cursor-pointer"
            aria-label="Send Email"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Send Email ↗</span>
          </a>

          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/_.palakokbye/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 rounded-full border border-white/20 text-white bg-white/[0.04] font-bold text-xs sm:text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:scale-105 transition-all flex items-center gap-2.5 shadow-xl shadow-black/40 cursor-pointer"
            aria-label="Connect on Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram ↗</span>
          </a>
        </div>

        {/* Studio Commission Card (100% Centered) */}
        <div className="reveal mt-16 p-8 rounded-2xl border border-white/10 bg-[#0f0f0f] max-w-xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-white/10 gap-3 text-center sm:text-left">
            <div>
              <div className="text-sm font-bold text-white">Palak Singh — Design Services</div>
              <div className="text-xs text-[#c9a84c] font-mono">Graphic Design, 3D Renders &amp; Publication</div>
            </div>
            <span className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 heartbeat-dot" /> Open for Commissions
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/60 text-center sm:text-left">
            <div>
              <div className="text-white/40 uppercase font-mono text-[10px]">Services</div>
              <div className="text-white mt-1">Branding, 3D Renders, Book Design, Posters</div>
            </div>
            <div>
              <div className="text-white/40 uppercase font-mono text-[10px]">Location</div>
              <div className="text-white mt-1">India · Available Worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER TICKER (Continuous Gold Marquee) ─── */}
      <div className="footer-ticker-wrap">
        <div className="footer-ticker">
          <span>Palak Singh ✦ Graphic Designer ✦ Book Design ✦ Brand Identity ✦ 3D Art ✦ Posters ✦ India ✦ Available Worldwide ✦ Open for Commissions ✦ </span>
          <span aria-hidden="true">Palak Singh ✦ Graphic Designer ✦ Book Design ✦ Brand Identity ✦ 3D Art ✦ Posters ✦ India ✦ Available Worldwide ✦ Open for Commissions ✦ </span>
        </div>
      </div>

      {/* ─── FOOTER (100% CENTER-ALIGNED) ─── */}
      <footer className="py-12 px-6 sm:px-12 flex flex-col items-center justify-center gap-5 text-center text-xs font-mono text-white/40 z-10 relative">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <a href="#work" className="hover:text-[#c9a84c] transition-colors">Portfolio</a>
          <a href="#software" className="hover:text-[#c9a84c] transition-colors">Software</a>
          <a href="#about" className="hover:text-[#c9a84c] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#c9a84c] transition-colors">Contact</a>
          <span className="text-white/20">|</span>
          <a href="mailto:palaksingh.creator@gmail.com" className="text-white/70 hover:text-[#c9a84c] transition-colors">Email ↗</a>
          <a href="https://www.instagram.com/_.palakokbye/" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline transition-colors">Instagram ↗</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-[#c9a84c] transition-colors">Top ↑</a>
        </div>
        <div>
          © {new Date().getFullYear()} Palak Singh — Graphic Designer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
