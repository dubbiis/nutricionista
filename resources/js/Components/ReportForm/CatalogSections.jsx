import CatalogMultiSelect from './CatalogMultiSelect';
import { motion } from 'framer-motion';

const groupOrder = [
    'estrategias',
    'indicaciones',
    'licuados',
    'suplementacion',
    'analitica',
    'referencias',
];

const groupNames = {
    estrategias: 'Estrategias',
    indicaciones: 'Indicaciones',
    licuados: 'Licuados',
    suplementacion: 'Suplementación',
    analitica: 'Parámetros Analítica',
    referencias: 'Referencias',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

export default function CatalogSections({ catalogs }) {
    return (
        <div className="space-y-6">
            {groupOrder.map((group) => {
                const sections = catalogs[group] || [];
                if (sections.length === 0) return null;

                return (
                    <div key={group}>
                        <h2 className="text-lg font-semibold text-foreground mb-3">
                            {groupNames[group]}
                        </h2>
                        <motion.div
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {sections.map((section) => (
                                <motion.div
                                    key={section.id}
                                    id={`section-${section.slug}`}
                                    className="scroll-mt-4"
                                    variants={itemVariants}
                                >
                                    <CatalogMultiSelect
                                        sectionSlug={section.slug}
                                        sectionName={section.name}
                                        items={section.items}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
