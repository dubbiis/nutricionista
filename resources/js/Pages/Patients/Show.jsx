import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Pencil,
    Plus,
    Eye,
    FileText,
    Download,
    Mail,
    Calendar,
    User,
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PatientForm from '@/Components/PatientForm';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/Components/ui/table';
import { cn } from '@/lib/utils';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function Show({ patient }) {
    const [formOpen, setFormOpen] = useState(false);

    const reports = patient.reports ?? [];

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const genderLabel = (gender) => {
        const map = {
            male: 'Masculino',
            female: 'Femenino',
            hombre: 'Hombre',
            mujer: 'Mujer',
        };
        return map[gender?.toLowerCase()] || gender || '—';
    };

    return (
        <AppLayout title={`${patient.name} ${patient.surname}`}>
            <motion.div
                className="p-6 space-y-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                {/* Navegación */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/patients">
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    </Button>
                </div>

                {/* Tarjeta de información */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl">
                                    {patient.name} {patient.surname}
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    {patient.email && (
                                        <span className="flex items-center gap-1.5">
                                            <Mail className="h-3.5 w-3.5" />
                                            {patient.email}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {patient.visit_count} visitas
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setFormOpen(true)}
                            >
                                <Pencil className="h-4 w-4" />
                                Editar
                            </Button>
                        </CardHeader>
                    </Card>
                </motion.div>

                {/* Sección de informes */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">
                            Informes
                        </h2>
                        <Button size="sm" asChild>
                            <Link
                                href={`/reports/create?patient_id=${patient.id}`}
                            >
                                <Plus className="h-4 w-4" />
                                Nuevo Informe
                            </Link>
                        </Button>
                    </div>

                    {reports.length === 0 ? (
                        <motion.div
                            className="flex flex-col items-center justify-center py-12 text-center rounded-lg border bg-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FileText className="h-10 w-10 text-muted-foreground/50 mb-3" />
                            <h3 className="text-base font-medium text-muted-foreground">
                                Sin informes
                            </h3>
                            <p className="text-sm text-muted-foreground/70 mt-1">
                                Este paciente aún no tiene informes generados.
                            </p>
                            <Button className="mt-4" size="sm" asChild>
                                <Link
                                    href={`/reports/create?patient_id=${patient.id}`}
                                >
                                    <Plus className="h-4 w-4" />
                                    Crear primer informe
                                </Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="rounded-lg border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Patología</TableHead>
                                        <TableHead>Género</TableHead>
                                        <TableHead className="text-right">
                                            Acciones
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <motion.tbody
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {reports.map((report) => (
                                        <motion.tr
                                            key={report.id}
                                            variants={rowVariants}
                                            className="border-b transition-colors hover:bg-muted/50"
                                        >
                                            <TableCell>
                                                {formatDate(report.created_at)}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {report.pathology || '—'}
                                            </TableCell>
                                            <TableCell>
                                                {genderLabel(report.gender)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/reports/${report.id}`}
                                                            title="Ver"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/reports/${report.id}/edit`}
                                                            title="Editar"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`/reports/${report.id}/pdf`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="Descargar PDF"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </Table>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Modal editar */}
            <PatientForm
                open={formOpen}
                onOpenChange={setFormOpen}
                patient={patient}
            />
        </AppLayout>
    );
}
