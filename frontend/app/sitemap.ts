import type { MetadataRoute } from "next";

const siteUrl = "https://aspcvacademy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/courses",
    "/register",
    "/about",
    "/contact",
    "/hvac",
    "/entrepreneurship",
    "/digital-marketing",
    "/sales",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/courses" || route === "/register" ? 0.9 : 0.7,
  }));
}
