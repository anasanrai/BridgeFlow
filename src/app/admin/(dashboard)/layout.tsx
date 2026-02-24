import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-navy-950">
            <AdminSidebar />
            <main className="ml-64 min-h-screen">
                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
