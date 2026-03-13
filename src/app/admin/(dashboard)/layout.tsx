import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerSideClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerSideClient();

    // Get current user for header
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar user={user} />
            <main className="lg:ml-64 min-h-screen transition-all duration-300">
                <div className="p-4 pt-20 lg:pt-6 lg:p-6">{children}</div>
            </main>
        </div>
    );
}
