import { MetadataRoute } from "next";

const BASE_URL = "https://63agency.ma";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/fr/contact/thank-you", "/en/contact/thank-you"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
