// ── JSON field interfaces ──────────────────────────────────────────────────────

export interface BillingAddress {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface PaymentMethod {
  type?: string | null;
  last4?: string | null;
  brand?: string | null;
  exp_month?: number | null;
  exp_year?: number | null;
}

export interface SocialLinks {
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  [key: string]: string | null | undefined;
}

export interface SeoDefaults {
  title?: string | null;
  description?: string | null;
  og_image?: string | null;
  keywords?: string[] | null;
}

// ── Database schema ────────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          billing_address: BillingAddress | null;
          payment_method: PaymentMethod | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          billing_address?: BillingAddress | null;
          payment_method?: PaymentMethod | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          billing_address?: BillingAddress | null;
          payment_method?: PaymentMethod | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_config: {
        Row: {
          id: string;
          site_name: string | null;
          tagline: string | null;
          logo_url: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          address: string | null;
          social_links: SocialLinks;
          seo_defaults: SeoDefaults;
          updated_at: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          founder_image: string | null;
          social_links: SocialLinks;
          live_demos: Record<string, unknown>;
          payment_settings: Record<string, unknown>;
          updated_at: string;
        };
      };
      home_content: {
        Row: {
          id: string;
          hero: Record<string, unknown>;
          stats: Record<string, unknown>;
          services_overview: Record<string, unknown>;
          process_steps: Record<string, unknown>;
          testimonials: Record<string, unknown>;
          cta: Record<string, unknown>;
          seo_title: string | null;
          seo_description: string | null;
          og_image: string | null;
          updated_at: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          icon: string | null;
          description: string | null;
          features: string[];
          color: string | null;
          sort_order: number | null;
          is_active: boolean | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image: string | null;
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
        Row: { id: string; slug: string; title: string; excerpt: string | null; content: string | null; category: string | null; read_time: string | null; featured: boolean | null; is_published: boolean | null; seo_title: string | null; seo_description: string | null; og_image: string | null; created_at: string; updated_at: string; };
      };
      case_studies: {
        Row: { id: string; slug: string; title: string; industry: string | null; client: string | null; excerpt: string | null; challenge: string | null; solution: string | null; results: any; tags: any; is_published: boolean | null; sort_order: number | null; seo_title: string | null; seo_description: string | null; og_image: string | null; created_at: string; updated_at: string; };
      };
      page_metadata: {
        Row: { id: string; path: string; title: string | null; description: string | null; og_image: string | null; created_at: string; updated_at: string; };
      };
      leads: {
        Row: { id: string; name: string; email: string; phone: string | null; message: string; package_interest: string | null; source: string | null; status: string | null; created_at: string; };
        Insert: { id?: string; name: string; email: string; phone?: string | null; message: string; package_interest?: string | null; source?: string | null; status?: string | null; created_at?: string; };
        Update: { id?: string; name?: string; email?: string; phone?: string | null; message?: string; package_interest?: string | null; source?: string | null; status?: string | null; created_at?: string; };
      };
      contact_submissions: {
        Row: { id: string; name: string; email: string; company: string | null; budget: string | null; message: string; status: string | null; notes: string | null; created_at: string; };
        Insert: { id?: string; name: string; email: string; company?: string | null; budget?: string | null; message: string; status?: string | null; notes?: string | null; created_at?: string; };
      };
      newsletter_subscribers: {
        Row: { id: string; email: string; is_active: boolean | null; subscribed_at: string; };
        Insert: { id?: string; email: string; is_active?: boolean | null; subscribed_at?: string; };
      };
      webhooks: {
        Row: { id: string; name: string; url: string; secret: string | null; events: string[]; is_active: boolean | null; created_at: string; updated_at: string; };
        Insert: { id?: string; name: string; url: string; secret?: string | null; events: string[]; is_active?: boolean | null; created_at?: string; updated_at?: string; };
      };
      telemetry: {
        Row: { id: string; event_type: string; path: string | null; session_id: string | null; referrer: string | null; user_agent: string | null; data: any; created_at: string; };
        Insert: { id?: string; event_type: string; path?: string | null; session_id?: string | null; referrer?: string | null; user_agent?: string | null; data?: any; created_at?: string; };
      };
      activity_log: {
        Row: { id: string; action: string; section: string; details: string | null; created_at: string; };
        Insert: { id?: string; action: string; section: string; details?: string | null; created_at?: string; };
        Update: { id?: string; action?: string; section?: string; details?: string | null; };
      };
      // ── New SaaS Platform Tables ───────────────────────────────────────────
      templates: {
        Row: {
          id: string; name: string; slug: string; description: string | null;
          long_description: string | null; short_description: string | null;
          categories: unknown; difficulty: string | null; nodes: unknown; node_count: number | null;
          setup_time: string | null; value: number | null; what_it_does: unknown;
          featured: boolean | null; status: string; image_url: string | null;
          image_urls: unknown; workflow_json: unknown; n8n_workflow_id: string | null;
          order: number | null; connection_count: number | null; json_url: string | null;
          json_access: string | null; tools: unknown;
          created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; name: string; slug: string; description?: string | null;
          long_description?: string | null; short_description?: string | null;
          categories?: unknown; difficulty?: string | null; nodes?: unknown; node_count?: number | null;
          setup_time?: string | null; value?: number | null; what_it_does?: unknown;
          featured?: boolean | null; status?: string; image_url?: string | null;
          image_urls?: unknown; workflow_json?: unknown; n8n_workflow_id?: string | null;
          order?: number | null; connection_count?: number | null; json_url?: string | null;
          json_access?: string | null; tools?: unknown; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; name?: string; slug?: string; description?: string | null;
          categories?: unknown; difficulty?: string | null; nodes?: unknown; node_count?: number | null;
          setup_time?: string | null; value?: number | null; what_it_does?: unknown;
          featured?: boolean | null; status?: string; image_url?: string | null;
          image_urls?: unknown; workflow_json?: unknown; n8n_workflow_id?: string | null;
          order?: number | null; updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string; order_id: string; org_id: string | null;
          plan_name: string | null; plan_price: number | null;
          customer_email: string | null; customer_name: string | null;
          payment_method: string | null; status: string; gateway_id: string | null;
          metadata: unknown; created_at: string;
        };
        Insert: {
          id?: string; order_id: string; org_id?: string | null;
          plan_name?: string | null; plan_price?: number | null;
          customer_email?: string | null; customer_name?: string | null;
          payment_method?: string | null; status?: string; gateway_id?: string | null;
          metadata?: unknown; created_at?: string;
        };
        Update: {
          id?: string; status?: string; gateway_id?: string | null; metadata?: unknown;
        };
      };
      purchases: {
        Row: {
          id: string; user_email: string; template_id: string | null;
          amount: number | null; currency: string | null; gateway: string | null;
          transaction_id: string | null; status: string; created_at: string;
        };
        Insert: {
          id?: string; user_email: string; template_id?: string | null;
          amount?: number | null; currency?: string | null; gateway?: string | null;
          transaction_id?: string | null; status?: string; created_at?: string;
        };
        Update: { id?: string; status?: string; };
      };
      payment_settings: {
        Row: {
          id: string; provider: string | null; mode: string | null; is_active: boolean | null;
          paypal_enabled: boolean | null; paypal_mode: string | null; paypal_currency: string | null;
          bank_enabled: boolean | null; bank_name: string | null; bank_account_name: string | null;
          bank_account_number: string | null; bank_routing_number: string | null;
          bank_swift_code: string | null; bank_iban: string | null; bank_instructions: string | null;
          wallets_enabled: boolean | null; currency: string | null; tax_rate: number | null;
          invoice_prefix: string | null; payment_terms: string | null;
          stripe_enabled: boolean | null; moyasar_enabled: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string; provider?: string | null; mode?: string | null; is_active?: boolean | null;
          paypal_enabled?: boolean | null; paypal_mode?: string | null;
          bank_enabled?: boolean | null; bank_account_name?: string | null;
          wallets_enabled?: boolean | null; currency?: string | null;
          tax_rate?: number | null; invoice_prefix?: string | null;
          stripe_enabled?: boolean | null; moyasar_enabled?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string; provider?: string | null; mode?: string | null; is_active?: boolean | null;
          updated_at?: string | null; [key: string]: unknown;
        };
      };
      // Multi-tenant SaaS core
      organizations: {
        Row: {
          id: string; name: string; slug: string; plan: string | null;
          stripe_customer_id: string | null; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; name: string; slug: string; plan?: string | null;
          stripe_customer_id?: string | null; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; name?: string; slug?: string; plan?: string | null;
          stripe_customer_id?: string | null; updated_at?: string;
        };
      };
      memberships: {
        Row: {
          id: string; user_id: string; org_id: string;
          role: "owner" | "admin" | "member"; created_at: string;
        };
        Insert: {
          id?: string; user_id: string; org_id: string;
          role?: "owner" | "admin" | "member"; created_at?: string;
        };
        Update: { role?: "owner" | "admin" | "member"; };
      };
      projects: {
        Row: {
          id: string; org_id: string; name: string; description: string | null;
          created_at: string; updated_at: string;
        };
        Insert: { id?: string; org_id: string; name: string; description?: string | null; };
        Update: { name?: string; description?: string | null; updated_at?: string; };
      };
      automations: {
        Row: {
          id: string; project_id: string; name: string; description: string | null;
          n8n_workflow_id: string | null; trigger_type: string | null; status: string;
          config: unknown; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; project_id: string; name: string; description?: string | null;
          n8n_workflow_id?: string | null; trigger_type?: string | null; status?: string;
          config?: unknown; created_at?: string; updated_at?: string;
        };
        Update: {
          name?: string; description?: string | null; n8n_workflow_id?: string | null;
          status?: string; config?: unknown; updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string; project_id: string; name: string; model: string | null;
          system_prompt: string | null; tools: unknown; config: unknown;
          is_active: boolean; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; project_id: string; name: string; model?: string | null;
          system_prompt?: string | null; tools?: unknown; config?: unknown;
          is_active?: boolean; created_at?: string; updated_at?: string;
        };
        Update: {
          name?: string; model?: string | null; system_prompt?: string | null;
          tools?: unknown; config?: unknown; is_active?: boolean; updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string; org_id: string; stripe_subscription_id: string | null;
          plan: string; status: string; current_period_start: string | null;
          current_period_end: string | null; created_at: string;
        };
        Insert: {
          id?: string; org_id: string; stripe_subscription_id?: string | null;
          plan: string; status?: string; current_period_start?: string | null;
          current_period_end?: string | null; created_at?: string;
        };
        Update: {
          stripe_subscription_id?: string | null; plan?: string; status?: string;
          current_period_start?: string | null; current_period_end?: string | null;
        };
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

