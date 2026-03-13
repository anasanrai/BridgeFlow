export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          billing_address: any | null;
          payment_method: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          billing_address?: any | null;
          payment_method?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          billing_address?: any | null;
          payment_method?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_config: {
        Row: {
          id: string;
          name: string;
          tagline: string | null;
          description: string | null;
          url: string | null;
          email: string | null;
          location: string | null;
          copyright: string | null;
          logo: string | null;
          nav_links: any;
          footer_links: any;
          social_links: any;
          og_image: string | null;
          updated_at: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          founder_image: string | null;
          social_links: any;
          live_demos: any;
          payment_settings: any;
          updated_at: string;
        };
      };
      home_content: {
        Row: {
          id: string;
          hero: any;
          stats: any;
          trustedBy: any;
          features: any;
          results: any;
          process: any;
          testimonials: any;
          cta: any;
          updated_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          icon: string | null;
          description: string | null;
          features: any;
          color: string | null;
          sort_order: number | null;
          is_active: boolean | null;
          created_at: string;
          updated_at: string;
        };
      };
      benefits: {
        Row: { id: string; icon: string | null; title: string; description: string | null; sort_order: number | null; created_at: string; };
      };
      team_members: {
        Row: { id: string; name: string; role: string; initials: string; bio: string | null; avatar_url: string | null; sort_order: number | null; is_active: boolean | null; created_at: string; updated_at: string; };
      };
      company_values: {
        Row: { id: string; icon: string | null; title: string; description: string | null; sort_order: number | null; created_at: string; };
      };
      milestones: {
        Row: { id: string; year: string; title: string; description: string | null; sort_order: number | null; created_at: string; };
      };
      tech_stack: {
        Row: { id: string; icon: string | null; name: string; description: string | null; sort_order: number | null; created_at: string; };
      };
      blog_posts: {
        Row: { id: string; slug: string; title: string; excerpt: string | null; content: string | null; category: string | null; read_time: string | null; featured: boolean | null; is_published: boolean | null; created_at: string; updated_at: string; };
      };
      case_studies: {
        Row: { id: string; slug: string; title: string; industry: string | null; client: string | null; excerpt: string | null; challenge: string | null; solution: string | null; results: any; tags: any; is_published: boolean | null; sort_order: number | null; created_at: string; updated_at: string; };
      };
      page_metadata: {
        Row: { id: string; path: string; title: string | null; description: string | null; og_image: string | null; created_at: string; updated_at: string; };
      };
      leads: {
        Row: { id: string; name: string; email: string; phone: string | null; message: string; package_interest: string | null; source: string | null; status: string | null; created_at: string; };
        Insert: { id?: string; name: string; email: string; phone?: string | null; message: string; package_interest?: string | null; source?: string | null; status?: string | null; created_at?: string; };
        Update: { id?: string; name?: string; email?: string; phone?: string | null; message?: string; package_interest?: string | null; source?: string | null; status?: string | null; created_at?: string; };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
