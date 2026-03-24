import { motion } from 'framer-motion';

export default function Logo({ className = '', size = 'md' }) {
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-16 w-16',
        xl: 'h-24 w-24',
    };

    const fontSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl',
        xl: 'text-3xl',
    };

    return (
        <motion.div
            className={`flex items-center gap-2 ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`${sizes[size]} rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold ${fontSizes[size]}`}
            >
                M
            </div>
        </motion.div>
    );
}
