import { useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
    Pencil,
    FileDown,
    Mail,
    User,
    FileText,
    ClipboardList,
    UtensilsCrossed,
    StickyNote,
    Calendar,
    Trash2,
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Separator } from '@/Components/ui/separator';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/Components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/Components/ui/tooltip';
import PageTransition from '@/Components/PageTransition';

const fadeInVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const genderLabels = {
    masculino: 'Masculino',
    femenino: 'Femenino',
};

const recipientLabels = {
    entrevistado: 'Entrevistado',
    no_entrevistado: 'No entrevistado',
};

const emphasisLabels = {
    normal: 'Normal',
    increase: 'Aumentar',
    decrease: 'Reducir',
    avoid: 'Evitar',
};

const emphasisColors = {
    normal: 'secondary',
    increase: 'default',
    decrease: 'outline',
    avoid: 'destructive',
};

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function Show({ report }) {
    const catalogItems = report?.catalog_items || [];
    const foodActions = report?.food_actions || [];

    // Agrupar items de catálogo por sección
    const catalogBySection = useMemo(() => {
        const grouped = {};
        catalogItems.forEach((item) => {
            const section = item.section;
            if (!section) return;
            const key = section.slug || section.id;
            if (!grouped[key]) {
                grouped[key] = {
                    name: section.name,
                    slug: section.slug,
                    sortOrder: section.sort_order ?? 0,
                    items: [],
                };
            }
            grouped[key].items.push(item);
        });
        return Object.values(grouped).sort((a, b) => a.sortOrder - b.sortOrder);
    }, [catalogItems]);

    return (
        <AppLayout title={`Informe #${report?.id || ''}`}>
            <PageTransition>
            <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
                {/* Barra superior: Paciente + fecha + acciones */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Informe #{report?.id}
                            </h1>
                            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                                <User className="h-4 w-4" />
                                <span>
                                    {report?.patient_name
                                        ? `${report.patient_name} ${report.patient_surname || ''}`
                                        : 'Destinatario no disponible'}
                                </span>
                                <span className="text-muted-foreground/50">|</span>
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(report?.created_at)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/reports/${report?.id}/edit`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                                <a
                                    href={`/reports/${report?.id}/pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FileDown className="mr-2 h-4 w-4" />
                                    Descargar PDF
                                </a>
                            </Button>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled
                                            >
                                                <Mail className="mr-2 h-4 w-4" />
                                                Enviar por Email
                                            </Button>
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Próximamente</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                    if (confirm('¿Eliminar este informe? Esta acción no se puede deshacer.')) {
                                        router.delete(`/reports/${report?.id}`, {
                                            onSuccess: () => toast.success('Informe eliminado'),
                                        });
                                    }
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </motion.div>

                <Separator />

                {/* Información del paciente */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.08 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <User className="h-4 w-4" />
                                Destinatario
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {report?.patient_name ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Nombre</span>
                                        <p className="font-medium">{report.patient_name} {report.patient_surname || ''}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Email</span>
                                        <p className="font-medium">{report.patient_email || '—'}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No se encontró información del destinatario.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Datos del informe */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.16 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <FileText className="h-4 w-4" />
                                Datos del Informe
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Patología</span>
                                    <p className="font-medium">{report?.pathology || '—'}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Género</span>
                                    <p className="font-medium">
                                        {genderLabels[report?.gender] || report?.gender || '—'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Destinatario</span>
                                    <p className="font-medium">
                                        {recipientLabels[report?.recipient] || report?.recipient || '—'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Selecciones del catálogo agrupadas por sección */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.24 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ClipboardList className="h-4 w-4" />
                                Selecciones del Catálogo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {catalogBySection.length > 0 ? (
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-4"
                                >
                                    {catalogBySection.map((section) => (
                                        <motion.div
                                            key={section.slug}
                                            variants={fadeInVariants}
                                        >
                                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                                {section.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {section.items.map((item) => (
                                                    <Badge
                                                        key={item.id}
                                                        variant="secondary"
                                                    >
                                                        {item.label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No se seleccionaron elementos del catálogo.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Acciones alimentarias */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.32 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <UtensilsCrossed className="h-4 w-4" />
                                Acciones Alimentarias
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {foodActions.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Alimento</TableHead>
                                            <TableHead>Frecuencia</TableHead>
                                            <TableHead>Énfasis</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {foodActions.map((action, index) => (
                                            <TableRow key={action.id || index}>
                                                <TableCell className="font-medium">
                                                    {action.source_name || '—'}
                                                </TableCell>
                                                <TableCell>
                                                    {action.frequency || '—'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={emphasisColors[action.emphasis] || 'secondary'}
                                                    >
                                                        {emphasisLabels[action.emphasis] || action.emphasis || '—'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No se registraron acciones alimentarias.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notas */}
                <motion.div
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <StickyNote className="h-4 w-4" />
                                Anotaciones
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {report?.notes ? (
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                    {report.notes}
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Sin anotaciones.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            </PageTransition>
        </AppLayout>
    );
}
