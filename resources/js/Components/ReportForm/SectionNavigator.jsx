import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, FileText, Salad, Pill, FlaskConical, BookOpen, StickyNote, Utensils, GlassWater } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/Components/ui/collapsible';

const GROUP_CONFIG = {
    patient: { label: 'Destinatario', icon: User, sectionId: 'section-patient' },
    reportData: { label: 'Datos del Informe', icon: FileText, sectionId: 'section-report-data' },
    estrategias: { label: 'Estrategias', icon: Salad },
    indicaciones: { label: 'Indicaciones', icon: Utensils },
    licuados: { label: 'Licuados', icon: GlassWater },
    suplementacion: { label: 'Suplementacion', icon: Pill },
    analitica: { label: 'Analitica', icon: FlaskConical },
    referencias: { label: 'Referencias', icon: BookOpen },
    notes: { label: 'Anotaciones', icon: StickyNote, sectionId: 'section-notes' },
};

const GROUP_ORDER = [
    'patient',
    'reportData',
    'estrategias',
    'indicaciones',
    'licuados',
    'suplementacion',
    'analitica',
    'referencias',
    'notes',
];

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export default function SectionNavigator({ catalogs }) {
    const [activeSection, setActiveSection] = useState('section-patient');
    const [openGroups, setOpenGroups] = useState({});
    const observerRef = useRef(null);

    // Construir lista plana de todos los section IDs para el observer
    const allSectionIds = useMemo(() => {
        const ids = ['section-patient', 'section-report-data'];
        GROUP_ORDER.forEach((groupKey) => {
            if (catalogs[groupKey]) {
                catalogs[groupKey].forEach((section) => {
                    ids.push(`section-${section.slug}`);
                });
            }
        });
        ids.push('section-notes');
        return ids;
    }, [catalogs]);

    // IntersectionObserver para detectar la seccion visible
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Tomar la primera visible (la mas alta en el viewport)
                    const sorted = visibleEntries.sort(
                        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
                    );
                    setActiveSection(sorted[0].target.id);
                }
            },
            {
                rootMargin: '-64px 0px -60% 0px',
                threshold: 0.1,
            }
        );

        // Observar todos los section IDs
        allSectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        observerRef.current = observer;

        return () => observer.disconnect();
    }, [allSectionIds]);

    const toggleGroup = (groupKey) => {
        setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
    };

    // Determinar a que grupo pertenece la seccion activa
    const activeGroup = useMemo(() => {
        if (!activeSection) return null;
        for (const groupKey of GROUP_ORDER) {
            if (catalogs[groupKey]) {
                for (const section of catalogs[groupKey]) {
                    if (`section-${section.slug}` === activeSection) {
                        return groupKey;
                    }
                }
            }
        }
        return null;
    }, [activeSection, catalogs]);

    return (
        <nav className="h-full overflow-y-auto py-4 pr-2">
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Secciones
            </h3>
            <ul className="space-y-0.5">
                {GROUP_ORDER.map((groupKey) => {
                    const config = GROUP_CONFIG[groupKey];
                    if (!config) return null;

                    const Icon = config.icon;
                    const hasSections = catalogs[groupKey] && catalogs[groupKey].length > 0;

                    // Grupos simples (sin sub-items)
                    if (config.sectionId) {
                        const isActive = activeSection === config.sectionId;
                        return (
                            <li key={groupKey}>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(config.sectionId)}
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span className="truncate">{config.label}</span>
                                </button>
                            </li>
                        );
                    }

                    // Grupos con sub-items (secciones del catalogo)
                    if (!hasSections) return null;

                    const isGroupActive = activeGroup === groupKey;
                    const isOpen = openGroups[groupKey] ?? isGroupActive;

                    return (
                        <li key={groupKey}>
                            <Collapsible open={isOpen} onOpenChange={() => toggleGroup(groupKey)}>
                                <CollapsibleTrigger asChild>
                                    <button
                                        type="button"
                                        className={cn(
                                            'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                            isGroupActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        )}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="flex-1 truncate text-left">{config.label}</span>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="h-3.5 w-3.5" />
                                        </motion.div>
                                    </button>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.ul
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-4 mt-0.5 space-y-0.5 border-l pl-2"
                                            >
                                                {catalogs[groupKey].map((section) => {
                                                    const sectionId = `section-${section.slug}`;
                                                    const isItemActive = activeSection === sectionId;
                                                    return (
                                                        <li key={section.id}>
                                                            <button
                                                                type="button"
                                                                onClick={() => scrollToSection(sectionId)}
                                                                className={cn(
                                                                    'flex w-full items-center rounded-md px-2 py-1.5 text-xs transition-colors',
                                                                    isItemActive
                                                                        ? 'bg-primary/10 font-medium text-primary'
                                                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                                                )}
                                                            >
                                                                <span className="truncate">{section.name}</span>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </CollapsibleContent>
                            </Collapsible>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
