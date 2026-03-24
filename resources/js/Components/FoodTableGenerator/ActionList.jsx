import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils } from 'lucide-react';
import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/Components/ui/select';

const FREQUENCY_OPTIONS = [
    { value: 'sin_cambios', label: 'Sin cambios' },
    { value: 'aumentar', label: 'Aumentar' },
    { value: 'disminuir', label: 'Disminuir' },
    { value: 'eliminar', label: 'Eliminar' },
];

const EMPHASIS_OPTIONS = [
    { value: 'sin_enfasis', label: 'Sin Énfasis' },
    { value: 'leve', label: '+ Leve' },
    { value: 'moderado', label: '++ Moderado' },
    { value: 'alto', label: '+++ Alto' },
];

const FREQUENCY_BADGE_STYLES = {
    sin_cambios: 'bg-gray-100 text-gray-700 border-gray-200',
    aumentar: 'bg-green-50 text-green-700 border-green-200',
    disminuir: 'bg-amber-50 text-amber-700 border-amber-200',
    eliminar: 'bg-red-50 text-red-700 border-red-200',
};

const EMPHASIS_BADGE_STYLES = {
    sin_enfasis: 'bg-gray-100 text-gray-600 border-gray-200',
    leve: 'bg-blue-50 text-blue-600 border-blue-200',
    moderado: 'bg-violet-50 text-violet-600 border-violet-200',
    alto: 'bg-rose-50 text-rose-700 border-rose-200',
};

const itemVariants = {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 20, scale: 0.96 },
};

function ActionItem({ action, index }) {
    const dispatch = useReportDispatch();

    const handleUpdate = (field, value) => {
        dispatch({
            type: 'UPDATE_FOOD_ACTION',
            payload: { index, data: { [field]: value } },
        });
    };

    const handleRemove = () => {
        dispatch({ type: 'REMOVE_FOOD_ACTION', payload: index });
    };

    const freqLabel =
        FREQUENCY_OPTIONS.find((o) => o.value === action.frequency)?.label ||
        action.frequency;
    const emphLabel =
        EMPHASIS_OPTIONS.find((o) => o.value === action.emphasis)?.label ||
        action.emphasis;

    return (
        <motion.div
            layout
            variants={itemVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="rounded-md border bg-background p-2.5 space-y-2"
        >
            {/* Cabecera: nombre + tipo + botón X */}
            <div className="flex items-start justify-between gap-1">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight truncate">
                        {action.source_name}
                    </p>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {action.source_type === 'category'
                            ? 'Categoría'
                            : 'Alimento'}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={handleRemove}
                >
                    <X className="h-3.5 w-3.5" />
                </Button>
            </div>

            {/* Selectores inline */}
            <div className="grid grid-cols-2 gap-1.5">
                <Select
                    value={action.frequency}
                    onValueChange={(val) => handleUpdate('frequency', val)}
                >
                    <SelectTrigger className="h-7 text-[11px] px-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {FREQUENCY_OPTIONS.map((opt) => (
                            <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className="text-xs"
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={action.emphasis}
                    onValueChange={(val) => handleUpdate('emphasis', val)}
                >
                    <SelectTrigger className="h-7 text-[11px] px-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {EMPHASIS_OPTIONS.map((opt) => (
                            <SelectItem
                                key={opt.value}
                                value={opt.value}
                                className="text-xs"
                            >
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Badges de resumen visual */}
            <div className="flex gap-1 flex-wrap">
                <motion.div
                    key={action.frequency}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                >
                    <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                            FREQUENCY_BADGE_STYLES[action.frequency] || ''
                        }`}
                    >
                        {freqLabel}
                    </Badge>
                </motion.div>
                <motion.div
                    key={action.emphasis}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                >
                    <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 ${
                            EMPHASIS_BADGE_STYLES[action.emphasis] || ''
                        }`}
                    >
                        {emphLabel}
                    </Badge>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function ActionList() {
    const { foodActions } = useReportForm();

    return (
        <Card className="border shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-base flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Acciones
                    {foodActions.length > 0 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto">
                            {foodActions.length}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                {foodActions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        Sin acciones añadidas
                    </p>
                ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-0.5">
                        <AnimatePresence mode="popLayout">
                            {foodActions.map((action, index) => (
                                <ActionItem
                                    key={`${action.source_type}-${action.source_id}-${index}`}
                                    action={action}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
