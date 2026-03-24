import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ recentReports, stats }) {
    return (
        <AppLayout title="Dashboard">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                    Bienvenida a MVM Nutrición Integrada
                </p>
                {/* Stats cards y reportes recientes se implementarán en Fase 2 */}
            </div>
        </AppLayout>
    );
}
