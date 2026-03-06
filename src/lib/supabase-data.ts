import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Import local fallbacks
import * as homeData from "@/data/home";
import * as servicesData from "@/data/services";
import * as aboutData from "@/data/about";
import * as blogData from "@/data/blog";
import * as caseStudiesData from "@/data/case-studies";
import * as siteData from "@/data/site";

function getPublicClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// ─── Cached data fetchers (ISR — revalidate every 60 seconds) ───

export const getSiteConfig = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");

            const [configRes, settingsRes] = await Promise.all([
                sb.from("site_config").select("*").limit(1).single(),
                sb.from("site_settings").select("*").limit(1).single()
            ]);

            const config = configRes.data;
            const settings = settingsRes.data;

            if (config) {
                return {
                    name: config.name,
                    tagline: config.tagline,
                    description: config.description,
                    email: config.email,
                    url: config.url,
                    location: config.location,
                    copyright: config.copyright,
                    logo: config.logo,
                    og_image: config.og_image,
                    navLinks: (config.nav_links && config.nav_links.length > 0) ? config.nav_links : siteData.navLinks,
                    footerLinks: (config.footer_links && Object.keys(config.footer_links).length > 0) ? config.footer_links : siteData.footerLinks,
                    socialLinks: (settings?.social_links && settings.social_links.length > 0)
                        ? settings.social_links
                        : ((config.social_links && config.social_links.length > 0) ? config.social_links : siteData.socialLinks),
                    affiliateLinks: (settings?.affiliate_links && settings.affiliate_links.length > 0)
                        ? settings.affiliate_links
                        : siteData.defaultAffiliateLinks,
                    liveDemos: (settings?.live_demos && settings.live_demos.length > 0)
                        ? settings.live_demos
                        : null,
                };
            }
        } catch { }
        return {
            name: siteData.siteConfig.name,
            tagline: siteData.siteConfig.tagline,
            description: siteData.siteConfig.description,
            email: siteData.siteConfig.email,
            url: siteData.siteConfig.url,
            location: siteData.siteConfig.location,
            copyright: siteData.siteConfig.copyright,
            logo: siteData.siteConfig.logo,
            og_image: siteData.siteConfig.og_image,
            navLinks: siteData.navLinks,
            footerLinks: siteData.footerLinks,
            socialLinks: siteData.socialLinks,
            affiliateLinks: siteData.defaultAffiliateLinks,
            liveDemos: null,
        };
    },
    ["site-config"],
    { revalidate: 60, tags: ["site-config"] }
);

export const getHomeContent = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("home_content").select("*").limit(1).single();
            if (data) return {
                hero: data.hero || homeData.hero,
                stats: data.stats || homeData.stats,
                servicesOverview: data.services_overview?.length ? data.services_overview : homeData.servicesOverview,
                processSteps: data.process_steps?.length ? data.process_steps : homeData.processSteps,
                cta: data.cta || homeData.cta,
                offers: data.offers?.length ? data.offers : homeData.offers,
                demos: data.demos?.length ? data.demos : homeData.demos,
                affiliateLinks: siteData.defaultAffiliateLinks,
            };
        } catch { }
        return {
            hero: homeData.hero,
            stats: homeData.stats,
            servicesOverview: homeData.servicesOverview,
            processSteps: homeData.processSteps,
            cta: homeData.cta,
            offers: homeData.offers,
            demos: homeData.demos,
            affiliateLinks: siteData.defaultAffiliateLinks,
        };
    },
    ["home-content"],
    { revalidate: 60, tags: ["home-content"] }
);

export const getServices = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const [servicesRes, benefitsRes, metadataRes] = await Promise.all([
                sb.from("services").select("*").eq("is_active", true).order("sort_order"),
                sb.from("benefits").select("*").order("sort_order"),
                sb.from("page_metadata").select("*").eq("path", "/services").single(),
            ]);

            const hero = {
                ...servicesData.servicesHero,
                title: metadataRes.data?.title?.split("|")[0].trim() || servicesData.servicesHero.title,
                description: metadataRes.data?.description || servicesData.servicesHero.description,
            };

            let services = servicesRes.data && servicesRes.data.length > 0 ? servicesRes.data : servicesData.services;

            const hasGHL = services.some((s: { title?: string }) => {
                const t = (s.title || "").toLowerCase();
                return t.includes("gohighlevel") || t.includes("highlevel") || t.includes("ghl");
            });
            if (!hasGHL) {
                const localGHL = servicesData.services.find((s) => s.title.toLowerCase().includes("gohighlevel"));
                if (localGHL) services = [localGHL, ...services];
            }

            return {
                hero,
                services,
                benefits: benefitsRes.data && benefitsRes.data.length > 0 ? benefitsRes.data : servicesData.benefits,
            };
        } catch { }
        return {
            hero: servicesData.servicesHero,
            services: servicesData.services,
            benefits: servicesData.benefits,
        };
    },
    ["services"],
    { revalidate: 60, tags: ["services"] }
);

export const getBenefits = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("benefits").select("*").order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return servicesData.benefits;
    },
    ["benefits"],
    { revalidate: 60, tags: ["benefits"] }
);

export const getTeamMembers = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("team_members").select("*").order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return aboutData.team;
    },
    ["team-members"],
    { revalidate: 60, tags: ["team-members"] }
);

export const getCompanyValues = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("company_values").select("*").order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return aboutData.values;
    },
    ["company-values"],
    { revalidate: 60, tags: ["company-values"] }
);

export const getMilestones = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("milestones").select("*").order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return (aboutData as { milestones?: unknown[] }).milestones || [];
    },
    ["milestones"],
    { revalidate: 60, tags: ["milestones"] }
);

export const getTechStack = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("tech_stack").select("*").order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return aboutData.techStack;
    },
    ["tech-stack"],
    { revalidate: 60, tags: ["tech-stack"] }
);

export const getBlogPosts = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("blog_posts").select("*").eq("is_published", true).order("created_at", { ascending: false });
            if (data && data.length > 0) return data.map((p: Record<string, unknown>) => ({
                ...p,
                date: new Date(p.created_at as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                readTime: p.read_time,
            }));
        } catch { }
        return blogData.posts;
    },
    ["blog-posts"],
    { revalidate: 60, tags: ["blog-posts"] }
);

export async function getBlogPost(slug: string) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("blog_posts").select("*").eq("slug", slug).single();
        if (data) return {
            ...data,
            readTime: data.read_time,
            date: new Date(data.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            content: data.content ? data.content.split("\n\n") : [],
        };
    } catch { }
    return (blogData as { blogPostContent?: Record<string, unknown> }).blogPostContent?.[slug] || null;
}

export const getCaseStudies = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("case_studies").select("*").eq("is_published", true).order("sort_order");
            if (data && data.length > 0) return data;
        } catch { }
        return caseStudiesData.caseStudies;
    },
    ["case-studies"],
    { revalidate: 60, tags: ["case-studies"] }
);

export async function getCaseStudy(slug: string) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("case_studies").select("*").eq("slug", slug).single();
        if (data) return data;
    } catch { }
    return caseStudiesData.caseStudies.find((s) => s.slug === slug) || null;
}

export async function getGeneralPageContent(path: string, fallbackHero: Record<string, unknown>) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data: metadata } = await sb.from("page_metadata").select("*").eq("path", path).single();

        if (metadata) {
            return {
                hero: {
                    ...fallbackHero,
                    title: (metadata.title as string)?.split("|")[0].trim() || fallbackHero.title,
                    description: metadata.description || fallbackHero.description,
                }
            };
        }
    } catch { }
    return { hero: fallbackHero };
}

export async function getPageMetadata(path: string) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("page_metadata").select("*").eq("path", path).single();
        return data;
    } catch { }
    return null;
}

export async function getPageSEO(path: string) {
    const [override, site] = await Promise.all([
        getPageMetadata(path),
        getSiteConfig(),
    ]);

    return {
        title: override?.title || (path === "/" ? `${site.name} | ${site.tagline}` : `${site.name}`),
        description: override?.description || site.description,
        ogImage: override?.og_image || site.og_image || "/images/og-default.png",
        siteName: site.name,
        url: site.url,
    };
}

export const getAllSearchItems = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");

            const [blogRes, caseStudiesRes] = await Promise.all([
                sb.from("blog_posts").select("title, slug, excerpt").eq("is_published", true),
                sb.from("case_studies").select("title, slug, excerpt").eq("is_published", true),
            ]);

            const items: Array<{ title: string; href: string; type: string; excerpt?: string }> = [];

            if (blogRes.data) {
                blogRes.data.forEach((p: { title: string; slug: string; excerpt?: string }) => {
                    items.push({ title: p.title, href: `/blog/${p.slug}`, type: "blog", excerpt: p.excerpt });
                });
            }

            if (caseStudiesRes.data) {
                caseStudiesRes.data.forEach((c: { title: string; slug: string; excerpt?: string }) => {
                    items.push({ title: c.title, href: `/case-studies/${c.slug}`, type: "case-study", excerpt: c.excerpt });
                });
            }

            return items;
        } catch { }

        // Fallback to local data
        const items: Array<{ title: string; href: string; type: string; excerpt?: string }> = [];
        blogData.posts.forEach((p: { title: string; slug: string; excerpt?: string }) => {
            items.push({ title: p.title, href: `/blog/${p.slug}`, type: "blog", excerpt: p.excerpt });
        });
        caseStudiesData.caseStudies.forEach((c: { title: string; slug: string; excerpt?: string }) => {
            items.push({ title: c.title, href: `/case-studies/${c.slug}`, type: "case-study", excerpt: c.excerpt });
        });
        return items;
    },
    ["search-items"],
    { revalidate: 300, tags: ["search-items"] }
);

// ─── Composite About Content Fetcher ───
export async function getAboutContent() {
    const [values, teamMembers, techStack, milestones] = await Promise.all([
        getCompanyValues(),
        getTeamMembers(),
        getTechStack(),
        getMilestones(),
    ]);

    // Build hero from page metadata or fallback
    let hero = aboutData.aboutHero;
    try {
        const metadata = await getPageMetadata("/about");
        if (metadata) {
            hero = {
                ...hero,
                title: (metadata.title as string)?.split("|")[0].trim() || hero.title,
                description: (metadata.description as string) || hero.description,
            };
        }
    } catch { }

    // Build mission from local data (no separate Supabase table for this)
    const mission = {
        title: aboutData.mission.title,
        highlight: aboutData.mission.highlight,
        content: aboutData.mission.paragraphs.join("\n\n"),
    };

    return {
        hero,
        mission,
        values,
        teamMember: teamMembers?.[0] || aboutData.team[0],
        techStack,
        milestones,
    };
}
