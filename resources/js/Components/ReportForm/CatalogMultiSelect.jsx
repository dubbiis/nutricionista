import { useState, useCallback, useMemo } from 'react';
import { useReportForm, useReportDispatch } from '@/hooks/useReportForm';
import { Popover, PopoverTrigger, PopoverContent } from '@/Components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from '@/Components/ui/command';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CatalogMultiSelect({ sectionSlug, sectionName, items }) {
    const [open, setOpen] = useState(false);
    const { catalogSelections } = useReportForm();
    const dispatch = useReportDispatch();

    const selectedIds = catalogSelections[sectionSlug] || [];

    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

    const selectedItems = useMemo(
        () => items.filter((item) => selectedSet.has(item.id)),
        [items, selectedSet]
    );

    const handleToggle = useCallback(
        (itemId) => {
            dispatch({
                type: 'TOGGLE_CATALOG_ITEM',
                payload: { sectionSlug, itemId },
            });
        },
        [dispatch, sectionSlug]
    );

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">{sectionName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {/* Popover con buscador */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between text-left font-normal"
                        >
                            <span className="truncate text-muted-foreground">
                                Buscar y seleccionar...
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command>
                            <CommandInput placeholder={`Buscar en ${sectionName}...`} />
                            <CommandList className="max-h-60 overflow-y-auto">
                                <CommandEmpty>Sin resultados.</CommandEmpty>
                                <CommandGroup>
                                    {items.map((item) => {
                                        const isSelected = selectedSet.has(item.id);
                                        return (
                                            <CommandItem
                                                key={item.id}
                                                value={item.label}
                                                onSelect={() => handleToggle(item.id)}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        isSelected ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                                <span className="truncate">{item.label}</span>
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* Chips de selección */}
                {selectedItems.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sin selecciones</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence mode="popLayout">
                            {selectedItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Badge className="gap-1 pr-1">
                                        <span className="truncate max-w-[200px]">
                                            {item.label}
                                        </span>
                                        <button
                                            type="button"
                                            className="ml-1 rounded-full p-0.5 hover:bg-primary-foreground/20 focus:outline-none"
                                            onClick={() => handleToggle(item.id)}
                                            aria-label={`Quitar ${item.label}`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
