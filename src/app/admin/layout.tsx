'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Logo from '@/components/layout/logo';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  Newspaper,
  LogOut,
  Package,
  Loader2,
  ChevronRight,
  Zap,
  BarChart3,
  Users,
  ShoppingCart,
  MessageSquare,
  Settings,
  Bell,
  Search,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { motion, AnimatePresence } from 'framer-motion';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-500' },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, color: 'text-emerald-500' },
  { href: '/admin/users', label: 'Users', icon: Users, color: 'text-violet-500' },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper, color: 'text-orange-500' },
  { href: '/admin/products', label: 'Products', icon: Package, color: 'text-pink-500' },
  { href: '/admin/categories', label: 'Categories', icon: Tag, color: 'text-amber-500' },
  { href: '/admin/certifications', label: 'Certifications', icon: ShieldCheck, color: 'text-cyan-500' },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, color: 'text-rose-500' },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare, color: 'text-indigo-500' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, color: 'text-slate-500' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 h-12 w-12 blur-xl bg-primary/20 animate-pulse rounded-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;
  const userInitial = user?.name?.split(' ').map(n => n[0]).join('') || user?.email?.charAt(0).toUpperCase() || 'A';

  // Breadcrumbs logic
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
        <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                    <Zap className="size-5 text-white" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-slate-900">Antigravity</span>
                    <span className="truncate text-[10px] font-medium text-slate-500 uppercase tracking-widest">Admin Panel</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-3 py-4">
          <SidebarMenu space-y-1>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={`
                      relative group h-11 px-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <div className={`
                        transition-transform duration-200 group-hover:scale-110
                        ${isActive ? 'text-primary' : `${item.color} opacity-70 group-hover:opacity-100`}
                      `}>
                        <item.icon size={20} />
                      </div>
                      <span className="text-[14px]">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-slate-100">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-700">All services online</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-[#F8FAFC]">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 text-slate-500 hover:text-primary transition-colors" />
            <Separator orientation="vertical" className="h-4 bg-slate-200" />

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-3 w-3 mx-1 text-slate-300" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-slate-900">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-slate-500 hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            {/* Global Search */}
            <div className="relative hidden lg:flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search resources, users, orders..."
                className="w-full lg:w-[320px] rounded-xl bg-slate-100/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 pl-10 h-10 text-sm placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-500">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border-2 border-white" />
                <span className="sr-only">Notifications</span>
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0 hover:bg-slate-100 overflow-hidden border border-slate-200">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">{userInitial}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 rounded-2xl p-2 border-slate-200" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-slate-900">{user?.name}</p>
                      <p className="text-xs leading-none text-slate-500 mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="p-1">
                    <DropdownMenuItem className="rounded-xl px-4 py-2 text-sm font-medium focus:bg-slate-50 cursor-pointer">
                      <Users className="mr-2 h-4 w-4 text-slate-400" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl px-4 py-2 text-sm font-medium focus:bg-slate-50 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4 text-slate-400" />
                      Preferences
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="p-1">
                    <DropdownMenuItem onClick={handleLogout} className="rounded-xl px-4 py-2 text-sm font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-4 md:p-8 pt-6">
            {children}
          </div>

          <footer className="mt-auto px-8 py-6 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-bold text-slate-900">Antigravity</span>
                <span className="text-slate-300">|</span>
                <span>© {new Date().getFullYear()} Evergreen Switchgear. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[10px] uppercase tracking-tighter font-bold">
                  v2.1.0-stable
                </div>
              </div>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
