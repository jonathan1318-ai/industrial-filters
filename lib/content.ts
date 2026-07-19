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
  type LucideIcon,
} from "lucide-react";

export type ProductCategory = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

// Launch taxonomy per docs/CONTENT.md. Full product records (specs, images,
// datasheets) move to Sanity per docs/DATA.md once that's wired up.
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

export type Industry = {
  title: string;
  icon: LucideIcon;
};

export const industries: Industry[] = [
  { title: "Manufacturing", icon: Factory },
  { title: "Semiconductor", icon: Cpu },
  { title: "Food & Beverage", icon: UtensilsCrossed },
  { title: "Chemical", icon: FlaskConical },
  { title: "HVAC", icon: AirVent },
  { title: "Water Treatment", icon: Droplet },
];
