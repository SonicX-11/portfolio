import { MetadataRoute } from "next";

const SITE_URL = "https://portfolio-two-ashen-80.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: SITE_URL + "/pricing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
