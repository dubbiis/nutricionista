import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

export default function NotesSection() {
    const { reportData } = useReportForm();
    const dispatch = useReportDispatch();

    const handleChange = (value) => {
        dispatch({ type: 'SET_REPORT_DATA', payload: { notes: value } });
    };

    return (
        <div id="section-notes" className="scroll-mt-4">
            <Card className="mb-4 border shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Anotaciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notas adicionales</Label>
                        <Textarea
                            id="notes"
                            value={reportData.notes}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Escribe anotaciones adicionales sobre el informe..."
                            rows={5}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
