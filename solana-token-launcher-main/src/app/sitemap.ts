// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zrp.one";
  
  const routes = [
    { path: "", priority: 1.0, changefreq: "daily" },
    { path: "/create-mint", priority: 0.9, changefreq: "weekly" },
    { path: "/pricing", priority: 0.8, changefreq: "weekly" },
    { path: "/faq", priority: 0.8, changefreq: "weekly" },
    { path: "/guide", priority: 0.8, changefreq: "weekly" },
    { path: "/about", priority: 0.7, changefreq: "monthly" },
    { path: "/contact", priority: 0.7, changefreq: "monthly" },
    { path: "/tokens", priority: 0.7, changefreq: "daily" },
    { path: "/burn-lp", priority: 0.7, changefreq: "weekly" },
    { path: "/revoke", priority: 0.7, changefreq: "weekly" },
    { path: "/airdrop", priority: 0.7, changefreq: "weekly" },
    { path: "/add-liquidity", priority: 0.7, changefreq: "weekly" },
    { path: "/liquidity-guide", priority: 0.6, changefreq: "monthly" },
    { path: "/dex-comparison", priority: 0.6, changefreq: "monthly" },
    { path: "/distribution", priority: 0.6, changefreq: "monthly" },
    { path: "/airdrop-guide", priority: 0.6, changefreq: "monthly" },
    { path: "/staking", priority: 0.6, changefreq: "monthly" },
    { path: "/meme-vs-utility", priority: 0.6, changefreq: "monthly" },
    { path: "/marketing", priority: 0.6, changefreq: "monthly" },
    { path: "/security", priority: 0.6, changefreq: "monthly" },
    { path: "/tokenomics", priority: 0.6, changefreq: "monthly" },
    { path: "/tokenomics-calculator", priority: 0.6, changefreq: "monthly" },
    { path: "/no-code-creator", priority: 0.6, changefreq: "monthly" },
    { path: "/launch", priority: 0.6, changefreq: "monthly" },
    { path: "/list-token-dex", priority: 0.6, changefreq: "monthly" },
    { path: "/community", priority: 0.6, changefreq: "monthly" },
    { path: "/burn", priority: 0.6, changefreq: "monthly" },
    { path: "/affiliates", priority: 0.5, changefreq: "monthly" },
    { path: "/why-zrp", priority: 0.5, changefreq: "monthly" },
    { path: "/checklist", priority: 0.5, changefreq: "monthly" },
    { path: "/blog", priority: 0.5, changefreq: "weekly" },
    { path: "/terms", priority: 0.3, changefreq: "yearly" },
    { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changefreq as any,
    priority: route.priority,
  }));
}
