import { createClientSideClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";

// Import local fallbacks
import * as homeData from "@/data/home";
import * as servicesData from "@/data/services";
import * as aboutData from "@/data/about";
import * as blogData from "@/data/blog";
import * as caseStudiesData from "@/data/case-studies";
import * as siteData from "@/data/site";

import { Database } from "@/types/database";

const getPublicClient = createClientSideClient;

// ─── Cached data fetchers (ISR — revalidate every 60 seconds) ───

export const getSiteConfig = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");

            const [configRes, settingsRes] = await Promise.all([
                (sb.from("site_config" as any) as any).select("*").limit(1).single(),
                (sb.from("site_settings" as any) as any).select("*").limit(1).single()
            ]);


            const config = configRes.data as Database['public']['Tables']['site_config']['Row'] | null;
            const settings = settingsRes.data as Database['public']['Tables']['site_settings']['Row'] | null;

            if (config) {
                // Ensure Templates is in navLinks
                let navLinks = Array.isArray(config.nav_links) ? [...config.nav_links] : [...siteData.navLinks];
                const hasTemplates = navLinks.some((link: any) => link?.href === '/templates');
                if (!hasTemplates) {
                    // Inject Templates link after Services (index 2)
                    navLinks.splice(2, 0, { label: "Templates", href: "/templates" });
                }

                return {
                    name: config.name || siteData.siteConfig.name,
                    tagline: config.tagline || siteData.siteConfig.tagline,
                    description: config.description || siteData.siteConfig.description,
                    email: config.email || siteData.siteConfig.email,
                    url: config.url || siteData.siteConfig.url,
                    location: config.location || siteData.siteConfig.location,
                    copyright: config.copyright || siteData.siteConfig.copyright,
                    logo: config.logo || siteData.siteConfig.logo,
                    og_image: config.og_image || siteData.siteConfig.og_image,
                    navLinks: navLinks,
                    footerLinks: (() => {
                        const fl = config.footer_links;
                        if (!fl) return siteData.footerLinks;
                        // DB stores as array [{title, links}] — convert to Record<string, Array<{label,href}>>
                        if (Array.isArray(fl) && fl.length > 0) {
                            const record: Record<string, Array<{ label: string; href: string }>> = {};
                            fl.forEach((section: any) => {
                                if (section?.title && Array.isArray(section.links)) {
                                    record[section.title] = section.links;
                                }
                            });
                            return Object.keys(record).length > 0 ? record : siteData.footerLinks;
                        }

                        // DB stores as Record already
                        if (typeof fl === 'object' && fl !== null && Object.keys(fl).length > 0) return fl;
                        return siteData.footerLinks;
                    })(),
                    socialLinks: Array.isArray(settings?.social_links) && (settings.social_links as any[]).length > 0
                        ? settings.social_links
                        : (Array.isArray((config as any).social_links) && (config as any).social_links.length > 0 ? (config as any).social_links : siteData.socialLinks),
                    liveDemos: Array.isArray(settings?.live_demos) && (settings.live_demos as any[]).length > 0
                        ? settings.live_demos
                        : (Array.isArray((config as any).live_demos) && (config as any).live_demos.length > 0 ? (config as any).live_demos : null),
                };
            }
        } catch { }

        // 3. Fallback logic: Ensure standard links exist in local data before returning
        const hasTemplates = siteData.navLinks.some(link => link.href === '/templates');
        if (!hasTemplates) {
            siteData.navLinks.splice(2, 0, { label: "Templates", href: "/templates" });
        }

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
            const { data } = await sb.from("home_content").select("*").limit(1).single() as { data: Database['public']['Tables']['home_content']['Row'] | null };
            if (data) return {
                // Merge DB values with defaults to ensure all enterprise fields are present
                hero: data.hero ? { ...homeData.defaultHomeContent.hero, ...data.hero as any } : homeData.defaultHomeContent.hero,
                stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : homeData.defaultHomeContent.stats,
                features: Array.isArray(data.services_overview) && data.services_overview.length > 0 ? data.services_overview : homeData.defaultHomeContent.features,
                results: homeData.defaultHomeContent.results,
                process: Array.isArray(data.process_steps) && data.process_steps.length > 0 ? data.process_steps : homeData.defaultHomeContent.process,
                testimonials: Array.isArray(data.testimonials) && data.testimonials.length > 0 ? data.testimonials : homeData.defaultHomeContent.testimonials,
                cta: data.cta ? { ...homeData.defaultHomeContent.cta, ...data.cta as any } : homeData.defaultHomeContent.cta,
            };
        } catch { }
        return homeData.defaultHomeContent;
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
                title: (metadataRes.data as any)?.title?.split("|")[0].trim() || servicesData.servicesHero.title,
                description: (metadataRes.data as any)?.description || servicesData.servicesHero.description,
            };

            let services = Array.isArray(servicesRes.data) && servicesRes.data.length > 0 ? servicesRes.data : servicesData.services;

            const hasGHL = services.some((s: { title?: string }) => {
                const t = (s?.title || "").toLowerCase();
                return t.includes("gohighlevel") || t.includes("highlevel") || t.includes("ghl");
            });
            if (!hasGHL) {
                const localGHL = servicesData.services.find((s) => s.title.toLowerCase().includes("gohighlevel"));
                if (localGHL) services = [localGHL, ...services];
            }

            return {
                hero,
                services,
                benefits: Array.isArray(benefitsRes.data) && benefitsRes.data.length > 0 ? benefitsRes.data : servicesData.benefits,
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

export const getAboutContent = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            // Use correct table names matching the admin dashboard
            const [valuesRes, teamRes, techRes, milestonesRes, settingsRes] = await Promise.all([
                sb.from("company_values").select("*").order("sort_order"),
                sb.from("team_members").select("*").eq("is_active", true).order("sort_order"),
                sb.from("tech_stack").select("*").order("sort_order"),
                sb.from("milestones").select("*").order("sort_order"),
                sb.from("site_settings").select("*").limit(1).single(),
            ]);

            const config = (await sb.from("site_config").select("*").limit(1).single()).data as Database['public']['Tables']['site_config']['Row'] | null;
            const settings = settingsRes.data as Database['public']['Tables']['site_settings']['Row'] | null;

            const founderImageUrl = settings?.founder_image;
            const teamMember = teamRes.data?.length ? teamRes.data[0] : aboutData.team[0];

            // Override founder image if it exists in site_settings
            if (founderImageUrl && teamMember) {
                (teamMember as any).avatar_url = founderImageUrl;
            }

            return {
                hero: aboutData.aboutHero,
                mission: {
                    ...aboutData.mission,
                    content: aboutData.mission.paragraphs.join("\n\n")
                },
                values: valuesRes.data?.length ? valuesRes.data : aboutData.values,
                teamMember: teamMember,
                techStack: techRes.data?.length ? techRes.data : aboutData.techStack,
                milestones: milestonesRes.data?.length ? milestonesRes.data : aboutData.milestones,
            };
        } catch { }
        return {
            hero: aboutData.aboutHero,
            mission: {
                ...aboutData.mission,
                content: aboutData.mission.paragraphs.join("\n\n")
            },
            values: aboutData.values,
            teamMember: aboutData.team[0],
            techStack: aboutData.techStack,
            milestones: aboutData.milestones,
        };
    },
    ["about-content"],
    { revalidate: 60, tags: ["about-content"] }
);

export const getBlogPosts = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");
            const { data } = await sb.from("blog_posts").select("*").eq("is_published", true).order("created_at", { ascending: false }) as { data: Database['public']['Tables']['blog_posts']['Row'][] | null };
            if (data && data.length > 0) return data.map((p) => ({
                ...p,
                date: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
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
        const { data } = await (sb.from("blog_posts" as any) as any).select("*").eq("slug", slug).single();
        const p = data as any;
        if (p) return {
            ...p,
            readTime: p.read_time,
            date: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            content: p.content ? p.content.split("\n\n") : [],
        };

    } catch { }
    return blogData.blogPostContent?.[slug] || null;
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

export async function getPageMetadata(path: string) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await (sb.from("page_metadata" as any) as any).select("*").eq("path", path).single();
        return data as any;


    } catch { }
    return null;
}

export async function getPageSEO(path: string) {
    const [override, site] = await Promise.all([
        getPageMetadata(path),
        getSiteConfig(),
    ]);

    const overrideData = override as any;
    return {
        title: overrideData?.title || (path === "/" ? `${site.name} | ${site.tagline}` : `${site.name}`),
        description: overrideData?.description || site.description,
        ogImage: overrideData?.og_image || site.og_image || "/images/og-default.png",

        siteName: site.name,
        url: site.url,
    };
}

// ─── Search: aggregates blog posts + case studies for site-wide search ───
export const getAllSearchItems = unstable_cache(
    async () => {
        try {
            const sb = getPublicClient();
            if (!sb) throw new Error("No Supabase");

            const [blogRes, caseStudiesRes] = await Promise.all([
                (sb.from("blog_posts" as any) as any).select("title, slug, excerpt").eq("is_published", true),
                (sb.from("case_studies" as any) as any).select("title, slug, excerpt").eq("is_published", true),
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

            if (items.length > 0) return items;
        } catch { }

        // Fallback to local static data
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
