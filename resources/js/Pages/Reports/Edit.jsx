import { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
    ReportFormProvider,
    useSerializeReport,
} from '@/hooks/useReportForm';
import AppLayout from '@/Layouts/AppLayout';
import SectionNavigator from '@/Components/ReportForm/SectionNavigator';
import PatientSection from '@/Components/ReportForm/PatientSection';
import ReportDataSection from '@/Components/ReportForm/ReportData';
import NotesSection from '@/Components/ReportForm/NotesSection';
import CatalogSections from '@/Components/ReportForm/CatalogSections';
import FoodTableGenerator from '@/Components/FoodTableGenerator/FoodTableGenerator';
import ActionList from '@/Components/FoodTableGenerator/ActionList';
import ConfigManager from '@/Components/ConfigManager';
import { Button } from '@/Components/ui/button';

const fadeInVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};

function ReportBuilderContent({
    report,
    catalogs,
    foods,
    foodCategories,
    foodTableTypes,
    configurations,
    settings,
}) {
    const serialize = useSerializeReport();
    const [saving, setSaving] = useState(false);
    const scrollContainerRef = useRef(null);

    const handleSave = () => {
        const data = serialize();

        if (!data.patient_name) {
            toast.error('Debes indicar el nombre del destinatario antes de guardar.');
            return;
        }

        setSaving(true);
        router.put(`/reports/${report.id}`, data, {
            onSuccess: () => {
                toast.success('Informe actualizado correctamente.');
                setSaving(false);
            },
            onError: (errors) => {
                console.log('Errores al actualizar informe:', errors);
                const firstError = Object.values(errors)[0];
                toast.error(firstError || 'Error al actualizar el informe.');
                setSaving(false);
            },
        });
    };

    return (
        <div className="grid grid-cols-[250px_1fr_340px] gap-6 h-[calc(100vh-64px)]">
            {/* Columna izquierda: Navegador de secciones */}
            <div className="border-r bg-background">
                <SectionNavigator catalogs={catalogs} />
            </div>

            {/* Columna central: Formulario */}
            <div
                ref={scrollContainerRef}
                className="overflow-y-auto py-6 px-2"
            >
                <div className="max-w-2xl mx-auto space-y-2">
                    {/* Seccion Paciente */}
                    <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3 }}
                    >
                        <PatientSection />
                    </motion.div>

                    {/* Seccion Datos del Informe */}
                    <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        <ReportDataSection />
                    </motion.div>

                    {/* Secciones del catálogo */}
                    <CatalogSections catalogs={catalogs} />

                    {/* Seccion Anotaciones */}
                    <motion.div
                        variants={fadeInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3 }}
                    >
                        <NotesSection />
                    </motion.div>

                    {/* Boton Guardar (sticky) */}
                    <div className="sticky bottom-0 pb-4 pt-2 bg-gradient-to-t from-background via-background to-transparent">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full"
                            size="lg"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Actualizar Informe
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Columna derecha: Generador de Tablas + Configuraciones */}
            <div className="overflow-y-auto py-6 pr-4 space-y-4">
                <FoodTableGenerator foods={foods} foodCategories={foodCategories} />
                <ActionList />
                <ConfigManager configurations={configurations} />
            </div>
        </div>
    );
}

export default function Edit({
    report,
    catalogs,
    foods,
    foodCategories,
    foodTableTypes,
    configurations,
    settings,
}) {
    return (
        <AppLayout title="Editar Informe">
            <ReportFormProvider initialReport={{ report, catalogItems: report.catalog_items || [] }}>
                <ReportBuilderContent
                    {...{
                        report,
                        catalogs,
                        foods,
                        foodCategories,
                        foodTableTypes,
                        configurations,
                        settings,
                    }}
                />
            </ReportFormProvider>
        </AppLayout>
    );
}
