import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/Components/ui/dialog';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FileText, CalendarClock, Eye, Pencil, PlusCircle, Inbox, Trash2, HardDrive } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/Components/PageTransition';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: 'easeOut',
        },
    }),
};

const tableVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.35,
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function truncate(text, maxLength = 40) {
    if (!text) return '—';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const statsCards = [
    {
        key: 'totalReports',
        label: 'Total Informes',
        icon: FileText,
        getValue: (stats) => stats.totalReports ?? 0,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
    },
    {
        key: 'lastReport',
        label: 'Último Informe',
        icon: CalendarClock,
        getValue: (stats) =>
            stats.lastReport?.created_at
                ? formatDate(stats.lastReport.created_at)
                : 'Sin informes',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
    },
];

export default function Dashboard({ recentReports = [], stats = {} }) {
    const [showUpgrade, setShowUpgrade] = useState(false);
    const isAtLimit = recentReports.length >= 10;

    return (
        <AppLayout title="Dashboard">
            <PageTransition>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                        <p className="mt-1 text-muted-foreground">
                            Bienvenida a MVM Nutrición Integrada
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {isAtLimit && (
                            <Button
                                variant="outline"
                                onClick={() => setShowUpgrade(true)}
                            >
                                <HardDrive className="mr-2 h-4 w-4" />
                                Conseguir más espacio
                            </Button>
                        )}
                        <Button asChild>
                            <Link href="/reports/create">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Nuevo Informe
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Dialog conseguir más espacio */}
                <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Límite de informes alcanzado</DialogTitle>
                            <DialogDescription>
                                Has alcanzado el máximo de 10 informes almacenados.
                                Para ampliar el espacio de almacenamiento, contacte con el desarrollador de la aplicación.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Stats cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {statsCards.map((card, i) => (
                        <motion.div
                            key={card.key}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.label}
                                    </CardTitle>
                                    <div className={`rounded-md p-2 ${card.bg}`}>
                                        <card.icon className={`h-4 w-4 ${card.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-foreground">
                                        {card.getValue(stats)}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Recent reports */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={tableVariants}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Informes Recientes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentReports.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="rounded-full bg-muted p-4 mb-4">
                                        <Inbox className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-lg font-medium text-muted-foreground">
                                        No hay informes todavía
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Crea tu primer informe para empezar.
                                    </p>
                                    <Button asChild className="mt-4" size="sm">
                                        <Link href="/reports/create">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Crear Informe
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Destinatario</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Patología</TableHead>
                                            <TableHead className="text-right">
                                                Acciones
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentReports.map((report, i) => (
                                            <motion.tr
                                                key={report.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.4 + i * 0.05,
                                                    duration: 0.3,
                                                }}
                                                className="border-b transition-colors hover:bg-muted/50"
                                            >
                                                <TableCell className="font-medium">
                                                    {report.patient_name
                                                        ? `${report.patient_name} ${report.patient_surname || ''}`
                                                        : 'Sin destinatario'}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(report.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    {truncate(report.pathology)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/reports/${report.id}`}
                                                            >
                                                                <Eye className="mr-1 h-4 w-4" />
                                                                Ver
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/reports/${report.id}/edit`}
                                                            >
                                                                <Pencil className="mr-1 h-4 w-4" />
                                                                Editar
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => {
                                                                if (confirm('¿Eliminar este informe?')) {
                                                                    router.delete(`/reports/${report.id}`, {
                                                                        onSuccess: () => toast.success('Informe eliminado'),
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="mr-1 h-4 w-4" />
                                                            Borrar
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            </PageTransition>
        </AppLayout>
    );
}
