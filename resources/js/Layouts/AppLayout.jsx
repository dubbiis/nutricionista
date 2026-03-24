import { useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    PlusCircle,
    Users,
    Settings,
    LogOut,
    User,
    PanelLeft,
} from 'lucide-react';
import Logo from '@/Components/Logo';
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
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
    SidebarTrigger,
    useSidebar,
} from '@/Components/ui/sidebar';

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home, routeName: 'dashboard' },
    { label: 'Nuevo Informe', href: '/reports/create', icon: PlusCircle, routeName: 'reports.create' },
    { label: 'Pacientes', href: '/patients', icon: Users, routeName: 'patients.*' },
    { label: 'Ajustes', href: '/settings', icon: Settings, routeName: 'settings.index' },
];

function AppSidebar() {
    const { url } = usePage();

    const isActive = (item) => {
        return url.startsWith(item.href);
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                                    M
                                </div>
                                <span className="truncate font-semibold text-sm">
                                    MVM Nutrición
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item)}
                                        tooltip={item.label}
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarUserMenu />
            </SidebarFooter>
        </Sidebar>
    );
}

function SidebarUserMenu() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <User className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="truncate font-medium text-sm">
                                    {user?.name ?? 'Usuario'}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user?.email ?? ''}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        align="start"
                        className="w-56"
                    >
                        <DropdownMenuItem asChild>
                            <Link href={route('profile.edit')} className="cursor-pointer">
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
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function TopBar() {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
        </header>
    );
}

export default function AppLayout({ title, children }) {
    return (
        <SidebarProvider>
            {title && <Head title={title} />}

            <AppSidebar />

            <SidebarInset>
                <TopBar />

                <motion.div
                    className="flex-1 overflow-auto"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            </SidebarInset>
        </SidebarProvider>
    );
}
