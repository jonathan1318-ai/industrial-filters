/**
 * Placeholder content, shaped like the Sanity schema in docs/DATA.md.
 * Product specs below are illustrative industry-standard values for each
 * category (micron ratings, materials, temperature ranges) — not confirmed
 * Firuta specs. Replace with real catalog data (and move to Sanity) before
 * launch; see docs/ROADMAP.md Phase 2.
 */
import {
  AirVent,
  Cpu,
  Droplet,
  Droplets,
  Factory,
  Filter,
  FlaskConical,
  Gauge,
  Package,
  ShieldCheck,
  UtensilsCrossed,
  Wrench,
  ClipboardCheck,
  LifeBuoy,
} from "lucide-react";
import type {
  Industry,
  Post,
  Product,
  ProductCategory,
  Service,
} from "@/lib/content/types";

export const productCategories: ProductCategory[] = [
  {
    title: "Filter Cartridges",
    slug: "filter-cartridges",
    description: "Pleated and depth cartridges for liquid and gas filtration.",
    icon: Filter,
  },
  {
    title: "Bag Filters",
    slug: "bag-filters",
    description: "High dirt-holding capacity bag filtration for process fluids.",
    icon: Package,
  },
  {
    title: "Hydraulic Filters",
    slug: "hydraulic-filters",
    description: "Protect hydraulic systems from contamination and wear.",
    icon: Gauge,
  },
  {
    title: "HEPA Filters",
    slug: "hepa-filters",
    description: "High-efficiency particulate filtration for clean environments.",
    icon: ShieldCheck,
  },
  {
    title: "Water Filters",
    slug: "water-filters",
    description: "Filtration systems for process and treated water.",
    icon: Droplets,
  },
  {
    title: "Air Filters",
    slug: "air-filters",
    description: "Air filtration for HVAC and industrial ventilation systems.",
    icon: AirVent,
  },
];

export const industries: Industry[] = [
  {
    title: "Manufacturing",
    slug: "manufacturing",
    icon: Factory,
    summary: "Process and hydraulic filtration for general manufacturing lines.",
    body: "Manufacturing facilities rely on consistent filtration to protect hydraulic systems, coolants, and process fluids from contamination that causes unplanned downtime.",
  },
  {
    title: "Semiconductor",
    slug: "semiconductor",
    icon: Cpu,
    summary: "Ultra-high-purity air and liquid filtration for cleanroom processes.",
    body: "Semiconductor fabrication demands tightly controlled particulate levels. HEPA and ultra-fine cartridge filtration support cleanroom air handling and process water purity.",
  },
  {
    title: "Food & Beverage",
    slug: "food-beverage",
    icon: UtensilsCrossed,
    summary: "Hygienic filtration for food-safe process lines.",
    body: "Food and beverage production requires filtration materials and housings suited to hygienic, food-contact environments across process water and product lines.",
  },
  {
    title: "Chemical",
    slug: "chemical",
    icon: FlaskConical,
    summary: "Chemically compatible filtration for aggressive process fluids.",
    body: "Chemical processing needs filter media and housings selected for compatibility with the fluids involved, from mild aqueous solutions to aggressive solvents.",
  },
  {
    title: "HVAC",
    slug: "hvac",
    icon: AirVent,
    summary: "Air filtration for commercial and industrial HVAC systems.",
    body: "HVAC systems depend on properly rated air filtration to maintain indoor air quality, equipment efficiency, and compliance with ventilation standards.",
  },
  {
    title: "Water Treatment",
    slug: "water-treatment",
    icon: Droplet,
    summary: "Filtration for potable, process, and wastewater treatment.",
    body: "Water treatment facilities use staged filtration — from sediment to fine polishing — to meet water quality targets across potable and process water systems.",
  },
];

export const products: Product[] = [
  {
    title: "5 Micron Pleated Cartridge Filter",
    slug: "5-micron-pleated-cartridge-filter",
    categorySlug: "filter-cartridges",
    shortDescription: "General-purpose pleated cartridge for liquid filtration.",
    description:
      "A pleated polypropylene cartridge offering high surface area and dirt-holding capacity for general-purpose liquid filtration in industrial process lines.",
    specs: [
      { label: "Micron Rating", value: "5 µm nominal" },
      { label: "Material", value: "Polypropylene" },
      { label: "Max Operating Temp", value: "80°C" },
      { label: "Standard Length", value: "10\" / 20\" / 30\"" },
    ],
    industrySlugs: ["manufacturing", "chemical", "water-treatment"],
  },
  {
    title: "1 Micron Depth Cartridge Filter",
    slug: "1-micron-depth-cartridge-filter",
    categorySlug: "filter-cartridges",
    shortDescription: "Fine-rated depth cartridge for polishing applications.",
    description:
      "A wound depth cartridge for fine particulate removal, suited to final polishing stages ahead of sensitive process equipment.",
    specs: [
      { label: "Micron Rating", value: "1 µm nominal" },
      { label: "Material", value: "Cotton / Polypropylene blend" },
      { label: "Max Operating Temp", value: "70°C" },
      { label: "Standard Length", value: "10\" / 20\"" },
    ],
    industrySlugs: ["semiconductor", "chemical"],
  },
  {
    title: "Polypropylene Filter Bag – Size 2",
    slug: "polypropylene-filter-bag-size-2",
    categorySlug: "bag-filters",
    shortDescription: "High dirt-holding bag filter for process fluids.",
    description:
      "A needle-felt polypropylene bag filter offering high flow rates and dirt-holding capacity, suitable for standard Size 2 bag housings.",
    specs: [
      { label: "Micron Rating", value: "1–200 µm range" },
      { label: "Material", value: "Polypropylene felt" },
      { label: "Max Operating Temp", value: "82°C" },
      { label: "Housing Size", value: "Size 2" },
    ],
    industrySlugs: ["manufacturing", "chemical"],
  },
  {
    title: "Nylon Mesh Filter Bag – Size 1",
    slug: "nylon-mesh-filter-bag-size-1",
    categorySlug: "bag-filters",
    shortDescription: "Washable mesh bag for reusable filtration applications.",
    description:
      "A nylon monofilament mesh bag designed for reusable, washable filtration where consistent micron rating over repeated cleanings is required.",
    specs: [
      { label: "Micron Rating", value: "25–800 µm range" },
      { label: "Material", value: "Nylon monofilament mesh" },
      { label: "Max Operating Temp", value: "90°C" },
      { label: "Housing Size", value: "Size 1" },
    ],
    industrySlugs: ["food-beverage", "manufacturing"],
  },
  {
    title: "10 Micron Hydraulic Return Line Filter",
    slug: "10-micron-hydraulic-return-line-filter",
    categorySlug: "hydraulic-filters",
    shortDescription: "Return-line element for hydraulic reservoir protection.",
    description:
      "A glass-fiber media return-line filter element protecting hydraulic reservoirs from ingressed contamination, sized for common return-line housings.",
    specs: [
      { label: "Micron Rating", value: "10 µm absolute" },
      { label: "Media", value: "Glass fiber" },
      { label: "Max Operating Pressure", value: "10 bar" },
      { label: "Collapse Rating", value: "10 bar ΔP" },
    ],
    industrySlugs: ["manufacturing"],
  },
  {
    title: "High-Pressure Hydraulic Inline Filter",
    slug: "high-pressure-hydraulic-inline-filter",
    categorySlug: "hydraulic-filters",
    shortDescription: "Inline element rated for high-pressure hydraulic circuits.",
    description:
      "A high-collapse-rated inline filter element for high-pressure hydraulic circuits, protecting pumps and valves from fine particulate contamination.",
    specs: [
      { label: "Micron Rating", value: "3 µm absolute" },
      { label: "Media", value: "Glass fiber, multi-layer" },
      { label: "Max Operating Pressure", value: "420 bar" },
      { label: "Collapse Rating", value: "210 bar ΔP" },
    ],
    industrySlugs: ["manufacturing"],
  },
  {
    title: "H13 HEPA Filter Panel",
    slug: "h13-hepa-filter-panel",
    categorySlug: "hepa-filters",
    shortDescription: "EN 1822 H13-rated panel for cleanroom air handling.",
    description:
      "A rigid-frame HEPA panel filter rated to EN 1822 class H13, providing 99.95% particulate removal efficiency for cleanroom and controlled-environment air handling.",
    specs: [
      { label: "Efficiency Class", value: "H13 (EN 1822), 99.95% @ MPPS" },
      { label: "Media", value: "Micro-fiberglass" },
      { label: "Frame", value: "Galvanized steel" },
      { label: "Max Operating Temp", value: "70°C" },
    ],
    industrySlugs: ["semiconductor", "food-beverage"],
  },
  {
    title: "H14 HEPA Filter Module",
    slug: "h14-hepa-filter-module",
    categorySlug: "hepa-filters",
    shortDescription: "Ultra-low penetration module for critical cleanrooms.",
    description:
      "An H14-rated HEPA module for the most demanding cleanroom applications, offering 99.995% particulate removal for critical semiconductor and pharmaceutical environments.",
    specs: [
      { label: "Efficiency Class", value: "H14 (EN 1822), 99.995% @ MPPS" },
      { label: "Media", value: "Micro-fiberglass" },
      { label: "Frame", value: "Anodized aluminum" },
      { label: "Max Operating Temp", value: "70°C" },
    ],
    industrySlugs: ["semiconductor"],
  },
  {
    title: "Sediment Water Filter Cartridge",
    slug: "sediment-water-filter-cartridge",
    categorySlug: "water-filters",
    shortDescription: "Pre-filtration stage for particulate and sediment removal.",
    description:
      "A spun polypropylene sediment cartridge for pre-filtration stages, removing sand, silt, and particulate ahead of finer filtration or treatment stages.",
    specs: [
      { label: "Micron Rating", value: "5 µm nominal" },
      { label: "Material", value: "Spun polypropylene" },
      { label: "Max Operating Temp", value: "50°C" },
      { label: "Standard Length", value: "10\" / 20\"" },
    ],
    industrySlugs: ["water-treatment", "food-beverage"],
  },
  {
    title: "Carbon Block Water Filter",
    slug: "carbon-block-water-filter",
    categorySlug: "water-filters",
    shortDescription: "Activated carbon block for taste, odor, and chlorine reduction.",
    description:
      "An extruded activated carbon block filter for reducing chlorine, taste, and odor in process and drinking water applications.",
    specs: [
      { label: "Micron Rating", value: "0.5–5 µm nominal" },
      { label: "Material", value: "Activated carbon (coconut shell)" },
      { label: "Max Operating Temp", value: "40°C" },
      { label: "Standard Length", value: "10\" / 20\"" },
    ],
    industrySlugs: ["water-treatment", "food-beverage"],
  },
  {
    title: "MERV 13 Pleated Air Filter",
    slug: "merv-13-pleated-air-filter",
    categorySlug: "air-filters",
    shortDescription: "High-efficiency pleated panel for HVAC systems.",
    description:
      "A MERV 13-rated pleated panel filter for HVAC systems requiring higher particulate capture without excessive pressure drop.",
    specs: [
      { label: "Efficiency Rating", value: "MERV 13 (ASHRAE 52.2)" },
      { label: "Media", value: "Synthetic pleated media" },
      { label: "Frame", value: "Beverage board" },
      { label: "Standard Depth", value: "2\" / 4\"" },
    ],
    industrySlugs: ["hvac", "manufacturing"],
  },
  {
    title: "HVAC Panel Air Filter",
    slug: "hvac-panel-air-filter",
    categorySlug: "air-filters",
    shortDescription: "Standard-efficiency panel filter for general HVAC intake.",
    description:
      "A standard pleated panel air filter for general HVAC pre-filtration and intake protection across commercial and industrial buildings.",
    specs: [
      { label: "Efficiency Rating", value: "MERV 8 (ASHRAE 52.2)" },
      { label: "Media", value: "Synthetic pleated media" },
      { label: "Frame", value: "Beverage board" },
      { label: "Standard Depth", value: "1\" / 2\"" },
    ],
    industrySlugs: ["hvac"],
  },
];

export const services: Service[] = [
  {
    title: "Filter Selection & Consultation",
    slug: "filter-selection-consultation",
    icon: ClipboardCheck,
    summary: "Application review and product recommendation for your process.",
    body: "We review your process conditions — fluid or air type, flow rate, particulate load, temperature, and pressure — to recommend a filtration solution matched to the application rather than a generic catalog pick.",
  },
  {
    title: "Installation Support",
    slug: "installation-support",
    icon: Wrench,
    summary: "On-site and remote support for filtration system installation.",
    body: "Our team supports the installation of new filtration housings and systems, including sizing verification, fitment checks, and commissioning guidance.",
  },
  {
    title: "Preventive Maintenance & Replacement",
    slug: "preventive-maintenance-replacement",
    icon: ClipboardCheck,
    summary: "Scheduled replacement programs to avoid unplanned downtime.",
    body: "Scheduled filter replacement programs, sized to your process's contamination load, reduce the risk of unplanned downtime from filter fouling or bypass.",
  },
  {
    title: "Emergency Filtration Support",
    slug: "emergency-filtration-support",
    icon: LifeBuoy,
    summary: "Rapid sourcing support when a filtration failure halts production.",
    body: "When a filtration failure threatens to halt production, our team helps source and expedite replacement filtration equipment as quickly as possible.",
  },
];

export const posts: Post[] = [
  {
    title: "How to Choose the Right Micron Rating for Your Application",
    slug: "how-to-choose-the-right-micron-rating",
    excerpt:
      "Micron rating is one of the most misunderstood filtration specs. Here's how to match it to your process.",
    body: "Micron rating describes the smallest particle size a filter is designed to capture, but nominal and absolute ratings mean different things — and picking the wrong one can mean either premature fouling or inadequate protection. Start with your process's contamination sensitivity and work backward from there, rather than defaulting to the finest rating available.",
    author: "Firuta Tech Services",
    publishedAt: "2026-05-12",
  },
  {
    title: "Preventive Maintenance Tips for Industrial Filtration Systems",
    slug: "preventive-maintenance-tips-for-filtration-systems",
    excerpt:
      "A scheduled replacement program beats reactive filter changes — here's why.",
    body: "Waiting for a differential pressure alarm before replacing a filter often means the system has already been running inefficiently for some time. A scheduled replacement interval, sized to your contamination load, keeps flow rates and system efficiency consistent.",
    author: "Firuta Tech Services",
    publishedAt: "2026-06-03",
  },
  {
    title: "Understanding HEPA Filter Efficiency Ratings",
    slug: "understanding-hepa-filter-efficiency-ratings",
    excerpt:
      "H13 vs H14 — what the EN 1822 efficiency classes actually mean for your cleanroom.",
    body: "EN 1822 defines HEPA efficiency classes from H13 through H14 based on Most Penetrating Particle Size (MPPS) testing. Choosing between them comes down to your cleanroom classification and the contamination sensitivity of your process, not simply picking the higher-rated option by default.",
    author: "Firuta Tech Services",
    publishedAt: "2026-07-01",
  },
];
