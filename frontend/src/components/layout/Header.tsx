import { Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart3, Sun, Moon, Monitor } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';

interface AuthData {
    isAuthenticated: boolean;
    user: {
        Id: string;
        Name: string;
        Email: string;
        FirstName?: string;
        LastName?: string;
    } | null;
}

export default function Header() {
    const { t } = useTranslation();
    const page = usePage();
    const auth = (page.props as any).auth as AuthData;
    const { theme, setTheme } = useTheme();

    const ThemeSelector = () => {
        const themes = [
            { value: 'light' as const, label: 'dashboard.theme.light', icon: Sun },
            { value: 'dark' as const, label: 'dashboard.theme.dark', icon: Moon },
            { value: 'system' as const, label: 'dashboard.theme.system', icon: Monitor },
        ];

        const currentTheme = themes.find(t => t.value === theme) || themes[2]; // default to system
        const Icon = currentTheme.icon;

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 w-9 px-0">
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{t('dashboard.user.theme')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {themes.map((themeOption) => {
                        const ThemeIcon = themeOption.icon;
                        return (
                            <DropdownMenuItem
                                key={themeOption.value}
                                onClick={() => setTheme(themeOption.value)}
                                className="flex items-center gap-2"
                            >
                                <ThemeIcon className="h-4 w-4" />
                                {t(themeOption.label)}
                                {theme === themeOption.value && (
                                    <span className="ml-auto">✓</span>
                                )}
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                    <Link href="/">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                    </Link>
                    <div>
                        <Link href="/">
                            <h1 className="font-bold text-xl hover:text-primary transition-colors cursor-pointer">
                                {t('welcome.title')}
                            </h1>
                        </Link>
                        <p className="text-xs text-muted-foreground">{t('welcome.subtitle')}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <ThemeSelector />
                    <LanguageSelector />
                    {(auth?.isAuthenticated === true) ? (
                        <Link href="/Dashboard">
                            <Button>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                {t('dashboard.title')}
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href="/Auth/Login">
                                <Button variant="outline" className="hidden sm:inline-flex">
                                    {t('auth.login.title')}
                                </Button>
                            </Link>
                            <Link href="/Auth/Register">
                                <Button>{t('welcome.hero.startNow')}</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}