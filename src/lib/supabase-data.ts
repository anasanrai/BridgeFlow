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
                    socialLinks: Array.isArray(settings?.social_links) && settings.social_links.length > 0
                        ? settings.social_links
                        : (Array.isArray(config.social_links) && config.social_links.length > 0 ? config.social_links : siteData.socialLinks),
                    liveDemos: Array.isArray(settings?.live_demos) && settings.live_demos.length > 0
                        ? settings.live_demos
                        : (Array.isArray(config.live_demos) && config.live_demos.length > 0 ? config.live_demos : null),
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
            const { data } = await sb.from("home_content").select("*").limit(1).single();
            if (data) return {
                // Merge DB values with defaults to ensure all enterprise fields are present
                hero: data.hero ? { ...homeData.defaultHomeContent.hero, ...data.hero } : homeData.defaultHomeContent.hero,
                stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : homeData.defaultHomeContent.stats,
                trustedBy: data.trustedBy ? { ...homeData.defaultHomeContent.trustedBy, ...data.trustedBy } : homeData.defaultHomeContent.trustedBy,
                features: Array.isArray(data.features) && data.features.length > 0 ? data.features : homeData.defaultHomeContent.features,
                results: Array.isArray(data.results) && data.results.length > 0 ? data.results : homeData.defaultHomeContent.results,
                process: Array.isArray(data.process) && data.process.length > 0 ? data.process : homeData.defaultHomeContent.process,
                testimonials: Array.isArray(data.testimonials) && data.testimonials.length > 0 ? data.testimonials : homeData.defaultHomeContent.testimonials,
                cta: data.cta ? { ...homeData.defaultHomeContent.cta, ...data.cta } : homeData.defaultHomeContent.cta,
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
                title: metadataRes.data?.title?.split("|")[0].trim() || servicesData.servicesHero.title,
                description: metadataRes.data?.description || servicesData.servicesHero.description,
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
                sb.from("site_settings").select("founder_image").limit(1).single(),
            ]);

            const founderImageUrl = settingsRes.data?.founder_image;
            const teamMember = teamRes.data?.length ? teamRes.data[0] : aboutData.team[0];

            // Override founder image if it exists in site_settings
            if (founderImageUrl && teamMember) {
                teamMember.avatar_url = founderImageUrl;
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

// ─── Search: aggregates blog posts + case studies for site-wide search ───
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
