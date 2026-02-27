import { createClient } from "@supabase/supabase-js";

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

export async function getSiteConfig() {
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
    };
}

export async function getHomeContent() {
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
}

export async function getServices() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const [servicesRes, benefitsRes, metadataRes] = await Promise.all([
            sb.from("services").select("*").eq("is_active", true).order("sort_order"),
            sb.from("benefits").select("*").order("sort_order"),
            sb.from("page_metadata").select("*").eq("path", "/services").single(),
        ]);

        // Merge static hero with database metadata if available
        const hero = {
            ...servicesData.servicesHero,
            title: metadataRes.data?.title?.split("|")[0].trim() || servicesData.servicesHero.title,
            description: metadataRes.data?.description || servicesData.servicesHero.description,
        };

        let services = servicesRes.data && servicesRes.data.length > 0 ? servicesRes.data : servicesData.services;

        // Ensure GoHighLevel service is always included (from local fallback if missing in DB)
        const hasGHL = services.some((s: any) => {
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
}

export async function getBenefits() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("benefits").select("*").order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return servicesData.benefits;
}

export async function getTeamMembers() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("team_members").select("*").order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return aboutData.team;
}

export async function getCompanyValues() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("company_values").select("*").order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return aboutData.values;
}

export async function getMilestones() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("milestones").select("*").order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return aboutData.milestones;
}

export async function getTechStack() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("tech_stack").select("*").order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return aboutData.techStack;
}

export async function getBlogPosts() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("blog_posts").select("*").eq("is_published", true).order("created_at", { ascending: false });
        if (data && data.length > 0) return data.map((p: any) => ({
            ...p,
            date: new Date(p.created_at as string).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            readTime: p.read_time,
        }));
    } catch { }
    return blogData.posts;
}

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
    return blogData.blogPostContent[slug] || null;
}

export async function getCaseStudies() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("case_studies").select("*").eq("is_published", true).order("sort_order");
        if (data && data.length > 0) return data;
    } catch { }
    return caseStudiesData.caseStudies;
}

export async function getCaseStudy(slug: string) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data } = await sb.from("case_studies").select("*").eq("slug", slug).single();
        if (data) return data;
    } catch { }
    // Fallback logic for local data
    return caseStudiesData.caseStudies.find(s => s.slug === slug) || null;
}

export async function getGeneralPageContent(path: string, fallbackHero: any) {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");
        const { data: metadata } = await sb.from("page_metadata").select("*").eq("path", path).single();

        if (metadata) {
            return {
                hero: {
                    ...fallbackHero,
                    title: metadata.title?.split("|")[0].trim() || fallbackHero.title,
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
export async function getAllSearchItems() {
    try {
        const sb = getPublicClient();
        if (!sb) throw new Error("No Supabase");

        const [blogRes, caseStudiesRes] = await Promise.all([
            sb.from("blog_posts").select("title, slug, excerpt").eq("is_published", true),
            sb.from("case_studies").select("title, slug, excerpt").eq("is_published", true),
        ]);

        const blogItems = (blogRes.data || []).map((p: any) => ({
            ...p,
            type: "blog",
            url: `/blog/${p.slug}`,
        }));

        const caseItems = (caseStudiesRes.data || []).map((p: any) => ({
            ...p,
            type: "case-study",
            url: `/case-studies/${p.slug}`,
        }));

        return [...blogItems, ...caseItems];
    } catch { }

    // Fallback to local data
    const blogItems = blogData.posts.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        type: "blog",
        url: `/blog/${p.slug}`,
    }));

    const caseItems = caseStudiesData.caseStudies.map((p: any) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        type: "case-study",
        url: `/case-studies/${p.slug}`,
    }));

    return [...blogItems, ...caseItems];
}
export async function getAboutContent() {
    try {
        const [team, values, milestones, tech] = await Promise.all([
            getTeamMembers(),
            getCompanyValues(),
            getMilestones(),
            getTechStack(),
        ]);

        const { hero } = await getGeneralPageContent("/about", aboutData.aboutHero);

        return {
            hero: hero,
            mission: {
                title: aboutData.mission.title,
                highlight: aboutData.mission.highlight,
                content: aboutData.mission.paragraphs.join("\n\n"),
            },
            values: values,
            teamMember: team,
            techStack: tech.map((t: any) => ({ ...t, desc: t.description || t.desc })),
            milestones: milestones,
        };
    } catch { }

    return {
        hero: aboutData.aboutHero,
        mission: {
            title: aboutData.mission.title,
            highlight: aboutData.mission.highlight,
            content: aboutData.mission.paragraphs.join("\n\n"),
        },
        values: aboutData.values,
        teamMember: aboutData.team,
        techStack: aboutData.techStack,
        milestones: aboutData.milestones,
    };
}
