import { Link } from '@inertiajs/react';
import { Separator } from "@/components/ui/separator";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="border-t bg-muted/50 backdrop-blur">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center space-y-6">
                    {/* Logo e Título */}
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <Link href="/">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                        </Link>
                        <Link href="/">
                            <span className="font-bold text-xl hover:text-primary transition-colors cursor-pointer">
                                ASP.NET Stack Template
                            </span>
                        </Link>
                    </div>

                    {/* Descrição do Template */}
                    <div className="space-y-2">
                        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                            {t('welcome.footer.description')}
                        </p>
                    </div>

                    <Separator className="w-20 mx-auto" />

                    {/* Copyright com coração */}
                    <p className="text-sm text-muted-foreground">
                        {t('welcome.footer.copyright').replace('❤️', '❤')}
                    </p>
                </div>
            </div>
        </footer>
    );
}