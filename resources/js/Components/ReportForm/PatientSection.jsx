import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Hash } from 'lucide-react';
import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import PatientSearch from '@/Components/PatientSearch';
import PatientForm from '@/Components/PatientForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export default function PatientSection() {
    const { patient } = useReportForm();
    const dispatch = useReportDispatch();
    const [showPatientForm, setShowPatientForm] = useState(false);

    const handleSelectPatient = (selectedPatient) => {
        dispatch({ type: 'SET_PATIENT', payload: selectedPatient });
    };

    return (
        <div id="section-patient" className="scroll-mt-4">
            <Card className="mb-4 border shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Paciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <PatientSearch onSelect={handleSelectPatient} />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPatientForm(true)}
                        >
                            <UserPlus className="mr-1 h-4 w-4" />
                            Crear Paciente
                        </Button>
                    </div>

                    {patient && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-lg border bg-muted/50 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-sm">
                                        {patient.name} {patient.surname}
                                    </p>
                                    {patient.email && (
                                        <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                            <Mail className="h-3 w-3" />
                                            {patient.email}
                                        </p>
                                    )}
                                </div>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Hash className="h-3 w-3" />
                                    {patient.visit_count ?? 0} visitas
                                </Badge>
                            </div>
                        </motion.div>
                    )}

                    <PatientForm
                        open={showPatientForm}
                        onOpenChange={setShowPatientForm}
                        patient={null}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
