import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUpDown, Check, Plus, Layers, Apple } from 'lucide-react';
import { useReportDispatch } from '@/hooks/useReportForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/Components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/Components/ui/command';
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

const TAB_VARIANTS = {
    hidden: { opacity: 0, x: 8 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 },
};

function ComboboxSelector({ items, value, onSelect, placeholder, emptyText }) {
    const [open, setOpen] = useState(false);

    const selectedLabel = items.find((item) => item.id === value)?.name || '';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm h-9"
                >
                    <span className="truncate">
                        {value ? selectedLabel : placeholder}
                    </span>
                    <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[290px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={() => {
                                        onSelect(item);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-3.5 w-3.5 ${
                                            value === item.id ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />
                                    <span className="truncate">{item.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function FoodTableGenerator({ foods, foodCategories }) {
    const dispatch = useReportDispatch();
    const [activeTab, setActiveTab] = useState('category');

    // Estado para modo categoría
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryFrequency, setCategoryFrequency] = useState('sin_cambios');
    const [categoryEmphasis, setCategoryEmphasis] = useState('sin_enfasis');

    // Estado para modo alimento
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodFrequency, setFoodFrequency] = useState('sin_cambios');
    const [foodEmphasis, setFoodEmphasis] = useState('sin_enfasis');

    const handleAddAction = () => {
        if (activeTab === 'category' && selectedCategory) {
            dispatch({
                type: 'ADD_FOOD_ACTION',
                payload: {
                    source_type: 'category',
                    source_id: selectedCategory.id,
                    source_name: selectedCategory.name,
                    frequency: categoryFrequency,
                    emphasis: categoryEmphasis,
                },
            });
            setSelectedCategory(null);
            setCategoryFrequency('sin_cambios');
            setCategoryEmphasis('sin_enfasis');
        } else if (activeTab === 'food' && selectedFood) {
            dispatch({
                type: 'ADD_FOOD_ACTION',
                payload: {
                    source_type: 'food',
                    source_id: selectedFood.id,
                    source_name: selectedFood.name,
                    frequency: foodFrequency,
                    emphasis: foodEmphasis,
                },
            });
            setSelectedFood(null);
            setFoodFrequency('sin_cambios');
            setFoodEmphasis('sin_enfasis');
        }
    };

    const isReady =
        activeTab === 'category' ? !!selectedCategory : !!selectedFood;

    const currentFrequency =
        activeTab === 'category' ? categoryFrequency : foodFrequency;
    const currentEmphasis =
        activeTab === 'category' ? categoryEmphasis : foodEmphasis;
    const setFrequency =
        activeTab === 'category' ? setCategoryFrequency : setFoodFrequency;
    const setEmphasis =
        activeTab === 'category' ? setCategoryEmphasis : setFoodEmphasis;

    return (
        <Card className="border shadow-sm">
            <CardHeader className="pb-3 px-4 pt-4">
                <CardTitle className="text-base">Generador de Tablas</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
                {/* Tabs */}
                <div className="flex rounded-md border bg-muted p-0.5 gap-0.5">
                    <button
                        type="button"
                        onClick={() => setActiveTab('category')}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium transition-colors ${
                            activeTab === 'category'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Layers className="h-3.5 w-3.5" />
                        Por Categoría
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('food')}
                        className={`flex-1 flex items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-xs font-medium transition-colors ${
                            activeTab === 'food'
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Apple className="h-3.5 w-3.5" />
                        Por Alimento
                    </button>
                </div>

                {/* Contenido según tab */}
                <AnimatePresence mode="wait">
                    {activeTab === 'category' ? (
                        <motion.div
                            key="category"
                            variants={TAB_VARIANTS}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.15 }}
                            className="space-y-2"
                        >
                            <ComboboxSelector
                                items={foodCategories || []}
                                value={selectedCategory?.id || null}
                                onSelect={setSelectedCategory}
                                placeholder="Categoría"
                                emptyText="Sin resultados."
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="food"
                            variants={TAB_VARIANTS}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.15 }}
                            className="space-y-2"
                        >
                            <ComboboxSelector
                                items={foods || []}
                                value={selectedFood?.id || null}
                                onSelect={setSelectedFood}
                                placeholder="Alimento"
                                emptyText="Sin resultados."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Frecuencia y Énfasis — siempre visibles cuando hay selección */}
                <AnimatePresence>
                    {isReady && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2 overflow-hidden"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">
                                        Frecuencia
                                    </label>
                                    <Select
                                        value={currentFrequency}
                                        onValueChange={setFrequency}
                                    >
                                        <SelectTrigger className="h-8 text-xs">
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
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">
                                        Énfasis
                                    </label>
                                    <Select
                                        value={currentEmphasis}
                                        onValueChange={setEmphasis}
                                    >
                                        <SelectTrigger className="h-8 text-xs">
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
                            </div>

                            <Button
                                onClick={handleAddAction}
                                size="sm"
                                className="w-full h-8 text-xs"
                            >
                                <Plus className="mr-1 h-3.5 w-3.5" />
                                Añadir Acción
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
