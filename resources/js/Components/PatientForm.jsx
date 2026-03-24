import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function PatientForm({ open, onOpenChange, patient }) {
    const isEdit = !!patient;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: patient?.name ?? '',
        surname: patient?.surname ?? '',
        email: patient?.email ?? '',
        visit_count: patient?.visit_count ?? 0,
    });

    useEffect(() => {
        if (open) {
            setData({
                name: patient?.name ?? '',
                surname: patient?.surname ?? '',
                email: patient?.email ?? '',
                visit_count: patient?.visit_count ?? 0,
            });
        }
    }, [open, patient]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    isEdit ? 'Paciente actualizado' : 'Paciente creado'
                );
                onOpenChange(false);
                reset();
            },
        };

        if (isEdit) {
            put(`/patients/${patient.id}`, options);
        } else {
            post('/patients', options);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <DialogContent asChild forceMount>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <DialogHeader>
                                <DialogTitle>
                                    {isEdit
                                        ? 'Editar paciente'
                                        : 'Nuevo paciente'}
                                </DialogTitle>
                                <DialogDescription>
                                    {isEdit
                                        ? 'Modifica los datos del paciente.'
                                        : 'Rellena los datos para crear un nuevo paciente.'}
                                </DialogDescription>
                            </DialogHeader>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Nombre del paciente"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="surname">Apellidos</Label>
                                    <Input
                                        id="surname"
                                        value={data.surname}
                                        onChange={(e) =>
                                            setData('surname', e.target.value)
                                        }
                                        placeholder="Apellidos del paciente"
                                        required
                                    />
                                    {errors.surname && (
                                        <p className="text-sm text-destructive">
                                            {errors.surname}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Correo electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="correo@ejemplo.com"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="visit_count">
                                        N.º de visitas previas
                                    </Label>
                                    <Input
                                        id="visit_count"
                                        type="number"
                                        min="0"
                                        value={data.visit_count}
                                        onChange={(e) =>
                                            setData(
                                                'visit_count',
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                    />
                                    {errors.visit_count && (
                                        <p className="text-sm text-destructive">
                                            {errors.visit_count}
                                        </p>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Guardando...'
                                            : isEdit
                                              ? 'Guardar cambios'
                                              : 'Crear paciente'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    );
}
