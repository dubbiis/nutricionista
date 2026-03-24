import { useState, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Users,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import PatientForm from '@/Components/PatientForm';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/Components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Badge } from '@/Components/ui/badge';
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

export default function Index({ patients }) {
    const [search, setSearch] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [editPatient, setEditPatient] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const filteredPatients = useMemo(() => {
        if (!search.trim()) return patients.data;
        const q = search.toLowerCase();
        return patients.data.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.surname.toLowerCase().includes(q) ||
                (p.email && p.email.toLowerCase().includes(q))
        );
    }, [search, patients.data]);

    const handleEdit = (patient) => {
        setEditPatient(patient);
        setFormOpen(true);
    };

    const handleCreate = () => {
        setEditPatient(null);
        setFormOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!patientToDelete) return;
        router.delete(`/patients/${patientToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Paciente eliminado');
                setDeleteDialogOpen(false);
                setPatientToDelete(null);
            },
        });
    };

    const handleDeleteClick = (patient) => {
        setPatientToDelete(patient);
        setDeleteDialogOpen(true);
    };

    return (
        <AppLayout title="Pacientes">
            <motion.div
                className="p-6 space-y-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                {/* Cabecera */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Pacientes
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Gestiona los pacientes de la consulta
                        </p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Nuevo Paciente
                    </Button>
                </div>

                {/* Buscador */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre, apellidos o email..."
                        className="pl-9"
                    />
                </div>

                {/* Tabla */}
                {filteredPatients.length === 0 ? (
                    <motion.div
                        className="flex flex-col items-center justify-center py-16 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium text-muted-foreground">
                            {search
                                ? 'No se encontraron pacientes'
                                : 'Sin pacientes'}
                        </h3>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                            {search
                                ? 'Prueba con otro término de búsqueda.'
                                : 'Crea el primer paciente para empezar.'}
                        </p>
                        {!search && (
                            <Button
                                className="mt-4"
                                onClick={handleCreate}
                            >
                                <Plus className="h-4 w-4" />
                                Nuevo Paciente
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <div className="rounded-lg border bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Apellidos</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-center">
                                        Visitas
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Informes
                                    </TableHead>
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
                                {filteredPatients.map((patient) => (
                                    <motion.tr
                                        key={patient.id}
                                        variants={rowVariants}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            {patient.name}
                                        </TableCell>
                                        <TableCell>
                                            {patient.surname}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {patient.email || '—'}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="secondary">
                                                {patient.visit_count}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline">
                                                {patient.reports_count}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/patients/${patient.id}`}
                                                        title="Ver"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleEdit(patient)
                                                    }
                                                    title="Editar"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            patient
                                                        )
                                                    }
                                                    title="Eliminar"
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </Table>
                    </div>
                )}

                {/* Paginación */}
                {patients.links && patients.last_page > 1 && (
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-sm text-muted-foreground">
                            Mostrando {patients.from}–{patients.to} de{' '}
                            {patients.total} pacientes
                        </p>
                        <div className="flex items-center gap-2">
                            {patients.links.map((link, index) => {
                                if (index === 0) {
                                    return (
                                        <Button
                                            key="prev"
                                            variant="outline"
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                        >
                                            {link.url ? (
                                                <Link href={link.url}>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Link>
                                            ) : (
                                                <span>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </span>
                                            )}
                                        </Button>
                                    );
                                }
                                if (index === patients.links.length - 1) {
                                    return (
                                        <Button
                                            key="next"
                                            variant="outline"
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                        >
                                            {link.url ? (
                                                <Link href={link.url}>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            ) : (
                                                <span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </span>
                                            )}
                                        </Button>
                                    );
                                }
                                return (
                                    <Button
                                        key={index}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        asChild={!!link.url}
                                        disabled={!link.url}
                                    >
                                        {link.url ? (
                                            <Link href={link.url}>
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span>{link.label}</span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Modal crear/editar */}
            <PatientForm
                open={formOpen}
                onOpenChange={setFormOpen}
                patient={editPatient}
            />

            {/* Dialog confirmar eliminación */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Eliminar paciente</DialogTitle>
                        <DialogDescription>
                            ¿Estás segura de que quieres eliminar a{' '}
                            <span className="font-medium text-foreground">
                                {patientToDelete?.name}{' '}
                                {patientToDelete?.surname}
                            </span>
                            ? Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
