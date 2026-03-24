import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';

export default function ReportDataSection() {
    const { reportData } = useReportForm();
    const dispatch = useReportDispatch();

    const handleChange = (field, value) => {
        dispatch({ type: 'SET_REPORT_DATA', payload: { [field]: value } });
    };

    return (
        <div id="section-report-data" className="scroll-mt-4">
            <Card className="mb-4 border shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Datos del Informe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="pathology">Patologia</Label>
                        <Textarea
                            id="pathology"
                            value={reportData.pathology}
                            onChange={(e) => handleChange('pathology', e.target.value)}
                            placeholder="Describe la patologia del paciente..."
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="gender">Genero</Label>
                            <Select
                                value={reportData.gender}
                                onValueChange={(value) => handleChange('gender', value)}
                            >
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Seleccionar genero" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="masculino">Masculino</SelectItem>
                                    <SelectItem value="femenino">Femenino</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="recipient">Destinatario</Label>
                            <Select
                                value={reportData.recipient}
                                onValueChange={(value) => handleChange('recipient', value)}
                            >
                                <SelectTrigger id="recipient">
                                    <SelectValue placeholder="Seleccionar destinatario" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="entrevistado">Entrevistado</SelectItem>
                                    <SelectItem value="no_entrevistado">No entrevistado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
