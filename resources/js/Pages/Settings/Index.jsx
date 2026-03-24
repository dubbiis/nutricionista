import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
    Save,
    Plus,
    X,
    Search,
    ChevronDown,
    ChevronRight,
    FileText,
    ListTree,
    Utensils,
    Loader2,
} from 'lucide-react';

import AppLayout from '@/Layouts/AppLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/Components/ui/collapsible';

/* ───────────── Animation variants ───────────── */

const fadeIn = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.25, ease: 'easeOut' },
};

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.04 },
    },
};

const staggerItem = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* ═══════════════════════════════════════════════
   Tab 1 — Textos PDF
   ═══════════════════════════════════════════════ */

const settingsFields = [
    { key: 'pdf_brand_name', label: 'Nombre de marca', type: 'input' },
    { key: 'pdf_brand_subtitle', label: 'Subtítulo de marca', type: 'input' },
    { key: 'pdf_intro_text', label: 'Texto introductorio del PDF', type: 'textarea', rows: 6 },
    { key: 'desc_pescados', label: 'Descripción — Pescados', type: 'textarea' },
    { key: 'desc_carnes', label: 'Descripción — Carnes', type: 'textarea' },
    { key: 'desc_verduras', label: 'Descripción — Verduras', type: 'textarea' },
    { key: 'desc_fruta', label: 'Descripción — Fruta', type: 'textarea' },
    { key: 'desc_setas', label: 'Descripción — Setas', type: 'textarea' },
    { key: 'desc_legumbres', label: 'Descripción — Legumbres', type: 'textarea' },
    { key: 'desc_cereales', label: 'Descripción — Cereales', type: 'textarea' },
    { key: 'desc_tuberculos', label: 'Descripción — Tubérculos', type: 'textarea' },
];

function TextosPdfTab({ settings }) {
    const [form, setForm] = useState(() => {
        const initial = {};
        settingsFields.forEach((f) => {
            initial[f.key] = settings[f.key] ?? '';
        });
        return initial;
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setSaving(true);
        const payload = Object.entries(form).map(([key, value]) => ({ key, value }));

        router.put(
            '/settings',
            { settings: payload },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Textos guardados correctamente.');
                    setSaving(false);
                },
                onError: (errors) => {
                    toast.error('Error al guardar los textos.');
                    console.error('Settings save error:', errors);
                    setSaving(false);
                },
            },
        );
    };

    return (
        <motion.div {...fadeIn}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5" />
                        Textos del PDF
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.div
                        className="space-y-5"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {settingsFields.map((field) => (
                            <motion.div key={field.key} variants={staggerItem}>
                                <label
                                    htmlFor={field.key}
                                    className="mb-1.5 block text-sm font-medium text-foreground"
                                >
                                    {field.label}
                                </label>
                                {field.type === 'input' ? (
                                    <Input
                                        id={field.key}
                                        value={form[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    />
                                ) : (
                                    <Textarea
                                        id={field.key}
                                        value={form[field.key]}
                                        rows={field.rows ?? 3}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    />
                                )}
                            </motion.div>
                        ))}

                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="mr-2 h-4 w-4" />
                                )}
                                Guardar Textos
                            </Button>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   Tab 2 — Catálogos
   ═══════════════════════════════════════════════ */

function CatalogSection({ section, onItemAdded, onItemRemoved }) {
    const [open, setOpen] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [adding, setAdding] = useState(false);

    const handleAdd = async () => {
        if (!newLabel.trim()) return;
        setAdding(true);
        try {
            const res = await window.axios.post('/api/catalog-items', {
                catalog_section_id: section.id,
                label: newLabel.trim(),
            });
            onItemAdded(section.id, res.data);
            setNewLabel('');
            toast.success(`"${res.data.label}" añadido.`);
        } catch (err) {
            console.error('Error adding catalog item:', err);
            toast.error('Error al añadir el elemento.');
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (item) => {
        try {
            await window.axios.delete(`/api/catalog-items/${item.id}`);
            onItemRemoved(section.id, item.id);
            toast.success(`"${item.label}" eliminado.`);
        } catch (err) {
            console.error('Error deleting catalog item:', err);
            toast.error('Error al eliminar el elemento.');
        }
    };

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <motion.div
                className="rounded-lg border bg-card"
                variants={staggerItem}
            >
                <CollapsibleTrigger asChild>
                    <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors rounded-lg"
                    >
                        <span className="font-medium text-sm">
                            {section.name}
                        </span>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                                {section.items?.length ?? 0}
                            </Badge>
                            <motion.div
                                animate={{ rotate: open ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </motion.div>
                        </div>
                    </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            className="border-t px-4 pb-4 pt-3 space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Items list */}
                            {section.items?.length === 0 && (
                                <p className="text-sm text-muted-foreground py-2">
                                    Sin elementos todavía.
                                </p>
                            )}
                            <AnimatePresence mode="popLayout">
                                {section.items?.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.2 }}
                                        layout
                                    >
                                        <span className="text-sm">{item.label}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(item)}
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Add new item */}
                            <div className="flex items-center gap-2 pt-2">
                                <Input
                                    placeholder="Nuevo elemento..."
                                    value={newLabel}
                                    onChange={(e) => setNewLabel(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAdd();
                                        }
                                    }}
                                    className="h-9 text-sm"
                                />
                                <Button
                                    size="sm"
                                    onClick={handleAdd}
                                    disabled={!newLabel.trim() || adding}
                                >
                                    {adding ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Plus className="h-4 w-4" />
                                    )}
                                    <span className="ml-1">Añadir</span>
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </CollapsibleContent>
            </motion.div>
        </Collapsible>
    );
}

function CatalogosTab({ catalogSections: initialSections }) {
    const [sections, setSections] = useState(initialSections);

    const handleItemAdded = (sectionId, newItem) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === sectionId
                    ? { ...s, items: [...(s.items ?? []), newItem] }
                    : s,
            ),
        );
    };

    const handleItemRemoved = (sectionId, itemId) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === sectionId
                    ? { ...s, items: (s.items ?? []).filter((i) => i.id !== itemId) }
                    : s,
            ),
        );
    };

    return (
        <motion.div {...fadeIn}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <ListTree className="h-5 w-5" />
                        Secciones del Catálogo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.div
                        className="space-y-3"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {sections.map((section) => (
                            <CatalogSection
                                key={section.id}
                                section={section}
                                onItemAdded={handleItemAdded}
                                onItemRemoved={handleItemRemoved}
                            />
                        ))}
                        {sections.length === 0 && (
                            <p className="py-8 text-center text-muted-foreground">
                                No hay secciones de catálogo.
                            </p>
                        )}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   Tab 3 — Alimentos
   ═══════════════════════════════════════════════ */

function AlimentosTab({ foods: initialFoods }) {
    const [foods, setFoods] = useState(initialFoods);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const foodTypes = useMemo(() => {
        const types = [...new Set(initialFoods.map((f) => f.food_type).filter(Boolean))];
        return types.sort();
    }, [initialFoods]);

    const filteredFoods = useMemo(() => {
        return foods.filter((food) => {
            const matchesSearch =
                !search || food.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = !typeFilter || food.food_type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [foods, search, typeFilter]);

    const activeCount = useMemo(() => foods.filter((f) => f.is_active).length, [foods]);

    const handleToggle = async (food) => {
        // Optimistic update
        setFoods((prev) =>
            prev.map((f) =>
                f.id === food.id ? { ...f, is_active: !f.is_active } : f,
            ),
        );

        try {
            await window.axios.post(`/api/foods/${food.id}/toggle-active`);
        } catch (err) {
            // Revert on error
            console.error('Error toggling food active state:', err);
            setFoods((prev) =>
                prev.map((f) =>
                    f.id === food.id ? { ...f, is_active: food.is_active } : f,
                ),
            );
            toast.error('Error al cambiar el estado del alimento.');
        }
    };

    return (
        <motion.div {...fadeIn}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <Utensils className="h-5 w-5" />
                        Alimentos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar alimento..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="">Todos los tipos</option>
                            {foodTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Counter */}
                    <div className="mb-4 text-sm text-muted-foreground">
                        {activeCount} de {foods.length} alimentos activos
                        {(search || typeFilter) && (
                            <span className="ml-2">
                                — mostrando {filteredFoods.length}
                            </span>
                        )}
                    </div>

                    {/* Food list */}
                    <div className="max-h-[60vh] overflow-y-auto rounded-md border">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {filteredFoods.length === 0 ? (
                                <div className="py-12 text-center text-muted-foreground">
                                    No se encontraron alimentos.
                                </div>
                            ) : (
                                filteredFoods.map((food) => (
                                    <motion.div
                                        key={food.id}
                                        variants={staggerItem}
                                        layout
                                        className="flex items-center gap-3 border-b px-4 py-2.5 last:border-b-0 hover:bg-muted/40 transition-colors"
                                    >
                                        <Checkbox
                                            checked={food.is_active}
                                            onCheckedChange={() => handleToggle(food)}
                                        />
                                        <span
                                            className={`flex-1 text-sm ${
                                                food.is_active
                                                    ? 'text-foreground'
                                                    : 'text-muted-foreground line-through'
                                            }`}
                                        >
                                            {food.name}
                                        </span>
                                        {food.food_type && (
                                            <Badge variant="outline" className="text-xs">
                                                {food.food_type}
                                            </Badge>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════
   Main page
   ═══════════════════════════════════════════════ */

export default function SettingsIndex({ settings, catalogSections, foods }) {
    const [activeTab, setActiveTab] = useState('textos-pdf');

    return (
        <AppLayout title="Ajustes">
            <div className="p-6 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-2xl font-bold text-foreground">Ajustes</h1>
                    <p className="mt-1 text-muted-foreground">
                        Gestiona los textos del PDF, catálogos y alimentos.
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 max-w-lg">
                        <TabsTrigger value="textos-pdf" className="gap-1.5">
                            <FileText className="h-4 w-4 hidden sm:inline" />
                            Textos PDF
                        </TabsTrigger>
                        <TabsTrigger value="catalogos" className="gap-1.5">
                            <ListTree className="h-4 w-4 hidden sm:inline" />
                            Catálogos
                        </TabsTrigger>
                        <TabsTrigger value="alimentos" className="gap-1.5">
                            <Utensils className="h-4 w-4 hidden sm:inline" />
                            Alimentos
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent key="textos-pdf" value="textos-pdf" className="mt-4">
                            <TextosPdfTab settings={settings} />
                        </TabsContent>

                        <TabsContent key="catalogos" value="catalogos" className="mt-4">
                            <CatalogosTab catalogSections={catalogSections} />
                        </TabsContent>

                        <TabsContent key="alimentos" value="alimentos" className="mt-4">
                            <AlimentosTab foods={foods} />
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </div>
        </AppLayout>
    );
}
