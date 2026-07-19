import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Firuta Tech Services",
    short_name: "Firuta",
    description:
      "Industrial filtration solutions for manufacturing, semiconductor, food & beverage, chemical, HVAC and water treatment facilities across Malaysia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0c355b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
