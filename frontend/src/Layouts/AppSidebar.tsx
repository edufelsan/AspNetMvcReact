import { router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import {
  BarChart3,
  Home,
  Users,
  Settings,
  Bell,
  DollarSign,
  Calendar,
  Mail,
  LogOut,
  User,
  Globe,
  Sun,
  Moon,
  Monitor,
  Palette,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Componentes de bandeiras
const BrazilFlag = () => (
  <svg width="16" height="12" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#009739"/>
    <polygon points="10,2 17,7 10,12 3,7" fill="#FEDD00"/>
    <circle cx="10" cy="7" r="2.5" fill="#0052CC"/>
  </svg>
);

const USAFlag = () => (
  <svg width="16" height="12" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#B22234"/>
    <g fill="#FFFFFF">
      {[1, 3, 5, 7, 9, 11, 13].map(i => (
        <rect key={i} x="0" y={i} width="20" height="1"/>
      ))}
    </g>
    <rect x="0" y="0" width="8" height="7" fill="#3C3B6E"/>
  </svg>
);

const SpainFlag = () => (
  <svg width="16" height="12" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#C60B1E"/>
    <rect x="0" y="3.5" width="20" height="7" fill="#FFC400"/>
  </svg>
);

const languages = [
  { code: 'en', name: 'English', flag: <USAFlag /> },
  { code: 'pt', name: 'Português', flag: <BrazilFlag /> },
  { code: 'es', name: 'Español', flag: <SpainFlag /> },
];

const themes = [
  { value: 'light' as const, label: 'dashboard.theme.light', icon: Sun },
  { value: 'dark' as const, label: 'dashboard.theme.dark', icon: Moon },
  { value: 'system' as const, label: 'dashboard.theme.system', icon: Monitor },
];

interface User {
  id: number;
  name: string;
  email: string;
}

interface AppSidebarProps {
  user?: User;
}

// Dados de navegação
const navigationData = {
  main: [
    {
      title: "dashboard.nav.overview",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "dashboard.nav.analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "dashboard.nav.finances",
      url: "/dashboard/finances",
      icon: DollarSign,
      items: [
        {
          title: "dashboard.nav.revenue",
          url: "/dashboard/finances/revenue",
        },
        {
          title: "dashboard.nav.expenses",
          url: "/dashboard/finances/expenses",
        },
        {
          title: "dashboard.nav.reports",
          url: "/dashboard/finances/reports",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "dashboard.nav.calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "dashboard.nav.messages",
      url: "/dashboard/messages",
      icon: Mail,
    },
    {
      title: "dashboard.nav.notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
  ],
  settings: [
    {
      title: "dashboard.nav.users",
      url: "/dashboard/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemTitle: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemTitle)) {
      newExpanded.delete(itemTitle);
    } else {
      newExpanded.add(itemTitle);
    }
    setExpandedItems(newExpanded);
  };

  const handleLogout = () => {
    router.post('/Auth/Logout', {}, {
      forceFormData: true,
    });
  };

  const navigateTo = (url: string) => {
    router.get(url);
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {t('dashboard.appName')}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {t('dashboard.appSubtitle')}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Navegação Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('dashboard.nav.main')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.items?.length) {
                        toggleExpanded(item.title);
                      } else {
                        navigateTo(item.url);
                      }
                    }}
                    tooltip={t(item.title)}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span className="flex-1">{t(item.title)}</span>
                    {item.items?.length && (
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedItems.has(item.title) ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </SidebarMenuButton>
                  {item.items?.length && expandedItems.has(item.title) && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            onClick={() => navigateTo(subItem.url)}
                          >
                            <span>{t(subItem.title)}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Ferramentas */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('dashboard.nav.tools')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.secondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigateTo(item.url)}
                    tooltip={t(item.title)}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{t(item.title)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configurações */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>{t('dashboard.nav.settings')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.settings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigateTo(item.url)}
                    tooltip={t(item.title)}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{t(item.title)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage 
                      src={`https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`} 
                      alt={user?.name || 'User'} 
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || t('dashboard.user.defaultName')}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || t('dashboard.user.defaultEmail')}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage 
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`} 
                        alt={user?.name || 'User'} 
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || t('dashboard.user.defaultName')}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.email || t('dashboard.user.defaultEmail')}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => navigateTo('/Profile')}>
                  <User className="mr-2 h-4 w-4" />
                  {t('dashboard.user.profile')}
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigateTo('/dashboard/preferences')}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t('dashboard.user.settings')}
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Globe className="mr-2 h-4 w-4" />
                    {t('dashboard.user.language')}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {languages.map((language) => (
                      <DropdownMenuItem
                        key={language.code}
                        onClick={() => i18n.changeLanguage(language.code)}
                        className="flex items-center gap-2"
                      >
                        {language.flag}
                        {language.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Palette className="mr-2 h-4 w-4" />
                    {t('dashboard.user.theme')}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {themes.map((themeOption) => {
                      const Icon = themeOption.icon;
                      return (
                        <DropdownMenuItem
                          key={themeOption.value}
                          onClick={() => setTheme(themeOption.value)}
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          {t(themeOption.label)}
                          {theme === themeOption.value && (
                            <span className="ml-auto">✓</span>
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('dashboard.user.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;