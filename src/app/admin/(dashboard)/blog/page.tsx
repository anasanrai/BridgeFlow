"use client";

import { useEffect, useState, useCallback } from "react";
import {
    FileText,
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Star,
    Save,
    X,
    Loader2,
    Search,
} from "lucide-react";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    read_time: string;
    featured: boolean;
    is_published: boolean;
    seo_title: string;
    seo_description: string;
    og_image: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

const CATEGORIES = ["Automation", "AI", "Tutorials", "Industry"];

const blankPost: Partial<BlogPost> = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Automation",
    read_time: "5 min read",
    featured: false,
    is_published: true,
    seo_title: "",
    seo_description: "",
    og_image: "",
    image_url: "",
};

export default function BlogAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

    const loadPosts = useCallback(async () => {
        const res = await fetch("/api/admin/content/blog_posts");
        const { data } = await res.json();
        setPosts(data || []);
        setLoading(false);
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = async () => {
        if (!editing) return;
        setSaving(true);
        try {
            const method = editing.id ? "PUT" : "POST";
            const res = await fetch("/api/admin/content/blog_posts", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });
            if (res.ok) {
                showToast(editing.id ? "Post updated!" : "Post created!");
                setEditing(null);
                loadPosts();
            }
        } catch {
            showToast("Error saving post");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this post?")) return;
        await fetch(`/api/admin/content/blog_posts?id=${id}`, { method: "DELETE" });
        showToast("Post deleted");
        loadPosts();
    };

    const generateSlug = (title: string) =>
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const filteredPosts = posts.filter(
        (p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium animate-bounce">
                    {toast}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <FileText className="w-6 h-6 text-gold-400" />
                        Blog Posts
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {posts.length} posts total
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditing({ ...blankPost });
                        setActiveTab("content");
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-gold-400/25 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </button>
            </div>

            {/* Editor Modal */}
            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 card-glow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-white">
                                {editing.id ? "Edit Post" : "New Post"}
                            </h2>
                            <button
                                onClick={() => setEditing(null)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-4 mb-6 border-b border-white/5">
                            <button
                                onClick={() => setActiveTab("content")}
                                className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === "content" ? "text-gold-400" : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                Content
                                {activeTab === "content" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("seo")}
                                className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === "seo" ? "text-gold-400" : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                SEO & Social
                                {activeTab === "seo" && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-gradient" />
                                )}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeTab === "content" ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Title
                                        </label>
                                        <input
                                            value={editing.title || ""}
                                            onChange={(e) =>
                                                setEditing({
                                                    ...editing,
                                                    title: e.target.value,
                                                    slug: editing.id
                                                        ? editing.slug
                                                        : generateSlug(e.target.value),
                                                })
                                            }
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="Post title"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                                Slug
                                            </label>
                                            <input
                                                value={editing.slug || ""}
                                                onChange={(e) =>
                                                    setEditing({ ...editing, slug: e.target.value })
                                                }
                                                className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors font-mono text-sm"
                                                placeholder="post-slug"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                                Category
                                            </label>
                                            <select
                                                value={editing.category || "Automation"}
                                                onChange={(e) =>
                                                    setEditing({ ...editing, category: e.target.value })
                                                }
                                                className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                            >
                                                {CATEGORIES.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                                Read Time
                                            </label>
                                            <input
                                                value={editing.read_time || ""}
                                                onChange={(e) =>
                                                    setEditing({ ...editing, read_time: e.target.value })
                                                }
                                                className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                                placeholder="5 min read"
                                            />
                                        </div>
                                        <div className="flex items-end gap-4 pb-1">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={editing.featured || false}
                                                    onChange={(e) =>
                                                        setEditing({
                                                            ...editing,
                                                            featured: e.target.checked,
                                                        })
                                                    }
                                                    className="accent-gold-400 w-4 h-4"
                                                />
                                                <span className="text-sm text-gray-300">Featured</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={editing.is_published !== false}
                                                    onChange={(e) =>
                                                        setEditing({
                                                            ...editing,
                                                            is_published: e.target.checked,
                                                        })
                                                    }
                                                    className="accent-gold-400 w-4 h-4"
                                                />
                                                <span className="text-sm text-gray-300">Published</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Excerpt
                                        </label>
                                        <textarea
                                            value={editing.excerpt || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, excerpt: e.target.value })
                                            }
                                            rows={2}
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                                            placeholder="Brief description..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                                            Cover Image URL
                                            <span className="text-[10px] text-gray-500 font-normal">Direct link to PNG/JPG</span>
                                        </label>
                                        <input
                                            value={editing.image_url || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, image_url: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors font-mono text-xs"
                                            placeholder="https://example.com/cover-image.jpg"
                                        />
                                        {editing.image_url && (
                                            <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-white/10 bg-navy-950">
                                                <img
                                                    src={editing.image_url}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            Content
                                        </label>
                                        <textarea
                                            value={editing.content || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, content: e.target.value })
                                            }
                                            rows={10}
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors resize-none font-mono text-sm"
                                            placeholder="Write your blog post content here... (Supports plain text, separate paragraphs with blank lines)"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/10">
                                        <h4 className="text-sm font-semibold text-gold-400 mb-2">SEO Optimization</h4>
                                        <p className="text-xs text-gray-400">
                                            Customize how this post appears in search engine results and social media shares. If left blank, we&apos;ll use the post title and excerpt.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                                            SEO Title
                                            <span className="text-[10px] text-gray-500">{editing.seo_title?.length || 0}/60 characters</span>
                                        </label>
                                        <input
                                            value={editing.seo_title || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, seo_title: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="Custom SEO Title (Browser tab and search results)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center justify-between">
                                            SEO Description
                                            <span className="text-[10px] text-gray-500">{editing.seo_description?.length || 0}/160 characters</span>
                                        </label>
                                        <textarea
                                            value={editing.seo_description || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, seo_description: e.target.value })
                                            }
                                            rows={3}
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                                            placeholder="Meta description for search engines..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                            OG Image URL
                                        </label>
                                        <input
                                            value={editing.og_image || ""}
                                            onChange={(e) =>
                                                setEditing({ ...editing, og_image: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 bg-navy-900/80 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                                            placeholder="https://example.com/social-preview.jpg"
                                        />
                                        <p className="text-[10px] text-gray-500 mt-1.5">
                                            Recommended size: 1200x630. This image appears when you share the post on social media.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                            <button
                                onClick={() => setEditing(null)}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !editing.title || !editing.slug}
                                className="flex items-center gap-2 px-5 py-2.5 gold-gradient text-navy-950 font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-gold-400/25 transition-all disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {saving ? "Saving..." : "Save Post"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full pl-11 pr-4 py-2.5 bg-navy-900/50 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-400/50 transition-colors text-sm"
                />
            </div>

            {/* Posts Table */}
            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-16 glass rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16 glass rounded-xl">
                    <FileText className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                    <p className="text-gray-400">No blog posts yet</p>
                    <button
                        onClick={() => setEditing({ ...blankPost })}
                        className="mt-4 text-sm text-gold-400 hover:text-gold-300"
                    >
                        Create your first post →
                    </button>
                </div>
            ) : (
                <div className="glass rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Post
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredPosts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-10 rounded bg-navy-800 border border-white/5 overflow-hidden flex-shrink-0">
                                                {post.image_url ? (
                                                    <img src={post.image_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full gold-gradient opacity-20" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {post.featured && (
                                                    <Star className="w-4 h-4 text-gold-400 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-white line-clamp-1">
                                                        {post.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5 font-mono">
                                                        /{post.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${post.is_published
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                                                }`}
                                        >
                                            {post.is_published ? (
                                                <Eye className="w-3 h-3" />
                                            ) : (
                                                <EyeOff className="w-3 h-3" />
                                            )}
                                            {post.is_published ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => setEditing(post)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
