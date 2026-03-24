import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function PatientSection() {
    const { patientData } = useReportForm();
    const dispatch = useReportDispatch();

    const handleChange = (field) => (e) => {
        dispatch({
            type: 'SET_PATIENT_DATA',
            payload: { [field]: e.target.value },
        });
    };

    return (
        <div id="section-patient" className="scroll-mt-4">
            <Card className="mb-4 border shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="h-4 w-4" />
                        Datos del Destinatario
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="patient-name">Nombre *</Label>
                            <Input
                                id="patient-name"
                                value={patientData.name}
                                onChange={handleChange('name')}
                                placeholder="Nombre del destinatario"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="patient-surname">Apellidos *</Label>
                            <Input
                                id="patient-surname"
                                value={patientData.surname}
                                onChange={handleChange('surname')}
                                placeholder="Apellidos del destinatario"
                                required
                            />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="patient-email">Correo electrónico</Label>
                            <Input
                                id="patient-email"
                                type="email"
                                value={patientData.email}
                                onChange={handleChange('email')}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </div>
    );
}
