import type { MetadataRoute } from "next";
import { SITE_URL } from "@/libs/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/scenarios`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/scenarios/rules`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
