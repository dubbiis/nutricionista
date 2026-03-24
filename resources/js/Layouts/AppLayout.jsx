import { useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    PlusCircle,
    Settings,
    LogOut,
    User,
    ChevronLeft,
    Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/Components/ui/tooltip';

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Nuevo Informe', href: '/reports/create', icon: PlusCircle },
    { label: 'Ajustes', href: '/settings', icon: Settings },
];

export default function AppLayout({ title, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props;
    const user = auth?.user;

    const isActive = (href) => url.startsWith(href);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <TooltipProvider delayDuration={0}>
            {title && <Head title={title} />}

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <motion.aside
                    className="flex flex-col border-r bg-sidebar text-sidebar-foreground shrink-0 overflow-hidden"
                    animate={{ width: collapsed ? 60 : 200 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    {/* Header con logo */}
                    <div className="flex h-14 items-center border-b border-sidebar-border px-3">
                        <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
                            <img
                                src="/images/logo.png"
                                alt="MVM"
                                className="h-8 w-8 shrink-0 rounded-lg object-contain"
                            />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        className="truncate font-semibold text-sm whitespace-nowrap"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        MVM Nutrición
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 py-3 px-2 space-y-1">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            const linkContent = (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                                        active
                                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                    )}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                className="truncate whitespace-nowrap"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            );

                            if (collapsed) {
                                return (
                                    <Tooltip key={item.label}>
                                        <TooltipTrigger asChild>
                                            {linkContent}
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            {item.label}
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return <div key={item.label}>{linkContent}</div>;
                        })}
                    </nav>

                    {/* Footer con usuario */}
                    <div className="border-t border-sidebar-border p-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent transition-colors">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        <User className="h-3.5 w-3.5" />
                                    </div>
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.div
                                                className="flex flex-col items-start min-w-0"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <span className="truncate text-xs font-medium">
                                                    {user?.name ?? 'Usuario'}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" align="start" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Perfil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-destructive focus:text-destructive"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Cerrar sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </motion.aside>

                {/* Main content */}
                <div className="flex flex-1 flex-col min-w-0">
                    {/* Top bar */}
                    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </header>

                    {/* Page content */}
                    <motion.main
                        className="flex-1 overflow-auto p-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.main>
                </div>
            </div>
        </TooltipProvider>
    );
}
