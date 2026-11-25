import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/payment.html"] },
    sitemap: "https://portfolio-two-ashen-80.vercel.app/sitemap.xml",
  };
}
