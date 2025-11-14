import { ReactNode } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import I18nInitializer from '@/components/I18nInitializer';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    showBackToHome?: boolean;
    showLanguageSelector?: boolean;
}

export default function AuthLayout({ 
    children, 
    title, 
    showBackToHome = true, 
    showLanguageSelector = true 
}: AuthLayoutProps) {
    const { t } = useTranslation();

    return (
        <>
            {title && <Head title={title} />}
            <I18nInitializer />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    {/* Navigation Controls */}
                    {(showBackToHome || showLanguageSelector) && (
                        <div className="flex justify-between items-center">
                            {showBackToHome ? (
                                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    {t('auth.login.backToHome')}
                                </Link>
                            ) : (
                                <div />
                            )}
                            {showLanguageSelector && <LanguageSelector />}
                        </div>
                    )}

                    {/* Main Content */}
                    {children}
                </div>
            </div>
        </>
    );
}