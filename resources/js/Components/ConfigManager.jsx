import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings2,
    Download,
    Save,
    Trash2,
    Loader2,
    Check,
    ChevronsUpDown,
} from 'lucide-react';
import { toast } from 'sonner';
import {
    useReportForm,
    useReportDispatch,
} from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/Components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/Components/ui/command';

export default function ConfigManager({ configurations: initialConfigs }) {
    const state = useReportForm();
    const dispatch = useReportDispatch();

    const [configs, setConfigs] = useState(initialConfigs || []);
    const [selectedConfig, setSelectedConfig] = useState(null);
    const [configName, setConfigName] = useState('');
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loadOpen, setLoadOpen] = useState(false);

    const handleLoad = (config) => {
        setSelectedConfig(config);
        setLoadOpen(false);

        if (config.data) {
            dispatch({ type: 'LOAD_CONFIGURATION', payload: config.data });
            toast.success(`Configuración "${config.name}" cargada.`);
        }
    };

    const handleSave = async () => {
        if (!configName.trim()) {
            toast.error('Escribe un nombre para la configuración.');
            return;
        }

        setSaving(true);
        try {
            // Serializar el estado actual (sin isDirty)
            const { isDirty, ...data } = state;

            const response = await window.axios.post('/api/configurations', {
                name: configName.trim(),
                data,
            });

            const newConfig = response.data;
            setConfigs((prev) => [...prev, newConfig].sort((a, b) => a.name.localeCompare(b.name)));
            setSelectedConfig(newConfig);
            setConfigName('');
            toast.success('Configuración guardada.');
        } catch (error) {
            console.log('Error al guardar configuración:', error);
            const msg =
                error.response?.data?.message ||
                'Error al guardar la configuración.';
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedConfig) return;

        setDeleting(true);
        try {
            await window.axios.delete(
                `/api/configurations/${selectedConfig.id}`
            );
            setConfigs((prev) =>
                prev.filter((c) => c.id !== selectedConfig.id)
            );
            toast.success(
                `Configuración "${selectedConfig.name}" eliminada.`
            );
            setSelectedConfig(null);
        } catch (error) {
            console.log('Error al eliminar configuración:', error);
            const msg =
                error.response?.data?.message ||
                'Error al eliminar la configuración.';
            toast.error(msg);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Card className="border shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-base flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Configuraciones
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
                {/* Cargar configuración */}
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Cargar
                    </label>
                    <Popover open={loadOpen} onOpenChange={setLoadOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={loadOpen}
                                className="w-full justify-between text-sm h-8"
                            >
                                <span className="truncate">
                                    {selectedConfig
                                        ? selectedConfig.name
                                        : 'Seleccionar configuración...'}
                                </span>
                                <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[290px] p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Buscar configuración..." />
                                <CommandList>
                                    <CommandEmpty>
                                        Sin configuraciones guardadas.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {configs.map((config) => (
                                            <CommandItem
                                                key={config.id}
                                                value={config.name}
                                                onSelect={() =>
                                                    handleLoad(config)
                                                }
                                            >
                                                <Check
                                                    className={`mr-2 h-3.5 w-3.5 ${
                                                        selectedConfig?.id ===
                                                        config.id
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    }`}
                                                />
                                                <span className="truncate">
                                                    {config.name}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Guardar nueva configuración */}
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground flex items-center gap-1">
                        <Save className="h-3 w-3" />
                        Guardar nueva
                    </label>
                    <div className="flex gap-1.5">
                        <Input
                            value={configName}
                            onChange={(e) => setConfigName(e.target.value)}
                            placeholder="Nombre..."
                            className="h-8 text-sm flex-1"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                            }}
                        />
                        <Button
                            onClick={handleSave}
                            disabled={saving || !configName.trim()}
                            size="sm"
                            className="h-8 px-3 shrink-0"
                        >
                            {saving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Save className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Borrar configuración cargada */}
                <AnimatePresence>
                    {selectedConfig && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="w-full h-8 text-xs"
                            >
                                {deleting ? (
                                    <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                                )}
                                Borrar "{selectedConfig.name}"
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
