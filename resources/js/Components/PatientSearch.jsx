import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from '@/Components/ui/command';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/Components/ui/popover';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';

export default function PatientSearch({
    onSelect,
    placeholder = 'Buscar paciente...',
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);

    const fetchPatients = useCallback(async (searchQuery) => {
        if (searchQuery.length < 2) {
            setPatients([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `/patients/search?q=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.log('Error buscando pacientes:', error);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetchPatients(query);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, fetchPatients]);

    const handleSelect = (patient) => {
        setOpen(false);
        setQuery(`${patient.name} ${patient.surname}`);
        onSelect(patient);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (!open) setOpen(true);
                    }}
                    onFocus={() => {
                        if (query.length >= 2) setOpen(true);
                    }}
                    placeholder={placeholder}
                    className="w-full"
                />
            </PopoverTrigger>
            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false}>
                    <CommandList>
                        {loading && (
                            <div className="py-4 text-center text-sm text-muted-foreground">
                                Buscando...
                            </div>
                        )}
                        {!loading && patients.length === 0 && query.length >= 2 && (
                            <CommandEmpty>
                                No se encontraron pacientes.
                            </CommandEmpty>
                        )}
                        {!loading && patients.length > 0 && (
                            <CommandGroup>
                                {patients.map((patient) => (
                                    <CommandItem
                                        key={patient.id}
                                        value={String(patient.id)}
                                        onSelect={() =>
                                            handleSelect(patient)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {patient.name}{' '}
                                                {patient.surname}
                                            </span>
                                            {patient.email && (
                                                <span className="text-xs text-muted-foreground">
                                                    {patient.email}
                                                </span>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
