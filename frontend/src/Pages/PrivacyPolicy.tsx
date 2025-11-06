import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Users, FileText } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('privacy.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 py-8 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('privacy.backToHome')}
                        </Link>
                        <LanguageSelector />
                    </div>

                    {/* Main Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="text-center pb-8">
                            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                {t('privacy.title')}
                            </CardTitle>
                            <p className="text-muted-foreground mt-2">
                                {t('privacy.lastUpdated')}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Introduction */}
                            <section>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.introduction')}
                                </p>
                            </section>

                            {/* Data Collection */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.dataCollection.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('privacy.dataCollection.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.dataCollection.personalInfo')}</li>
                                    <li>{t('privacy.dataCollection.accountInfo')}</li>
                                    <li>{t('privacy.dataCollection.usageData')}</li>
                                    <li>{t('privacy.dataCollection.technicalData')}</li>
                                </ul>
                            </section>

                            {/* Data Usage */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.dataUsage.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('privacy.dataUsage.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.dataUsage.provideServices')}</li>
                                    <li>{t('privacy.dataUsage.improveServices')}</li>
                                    <li>{t('privacy.dataUsage.communicate')}</li>
                                    <li>{t('privacy.dataUsage.security')}</li>
                                </ul>
                            </section>

                            {/* Data Protection */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.dataProtection.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('privacy.dataProtection.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.dataProtection.encryption')}</li>
                                    <li>{t('privacy.dataProtection.accessControl')}</li>
                                    <li>{t('privacy.dataProtection.regularAudits')}</li>
                                    <li>{t('privacy.dataProtection.secureStorage')}</li>
                                </ul>
                            </section>

                            {/* Data Sharing */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.dataSharing.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('privacy.dataSharing.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.dataSharing.consent')}</li>
                                    <li>{t('privacy.dataSharing.legal')}</li>
                                    <li>{t('privacy.dataSharing.serviceProviders')}</li>
                                </ul>
                            </section>

                            {/* Your Rights */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.yourRights.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('privacy.yourRights.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('privacy.yourRights.access')}</li>
                                    <li>{t('privacy.yourRights.rectification')}</li>
                                    <li>{t('privacy.yourRights.erasure')}</li>
                                    <li>{t('privacy.yourRights.portability')}</li>
                                    <li>{t('privacy.yourRights.objection')}</li>
                                </ul>
                            </section>

                            {/* Contact */}
                            <section className="bg-muted/30 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('privacy.contact.title')}</h2>
                                </div>
                                <p className="text-muted-foreground">
                                    {t('privacy.contact.description')}
                                </p>
                                <p className="text-muted-foreground mt-2">
                                    <strong>{t('privacy.contact.email')}</strong> privacy@yourcompany.com
                                </p>
                            </section>

                            {/* Footer Links */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {t('privacy.footer.terms')}
                                </Link>
                                <Link href="/Auth/Register" className="text-sm text-primary hover:underline">
                                    {t('privacy.footer.backToRegister')}
                                </Link>
                                <Link href="/Auth/Login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {t('privacy.footer.backToLogin')}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}