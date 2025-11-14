import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';
import I18nInitializer from '@/components/I18nInitializer';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    showFooter?: boolean;
}

export default function AppLayout({ children, title, showFooter = true }: AppLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <I18nInitializer />
            
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                {showFooter && <Footer />}
            </div>
        </>
    );
}