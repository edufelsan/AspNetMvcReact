import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Scale, FileText, Shield, AlertCircle, Mail, Clock, Calendar } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function TermsOfService() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('terms.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 py-8 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('terms.header.backHome')}
                        </Link>
                        <LanguageSelector />
                    </div>

                    {/* Main Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="text-center pb-8">
                            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                {t('terms.title')}
                            </CardTitle>
                            <p className="text-muted-foreground mt-2">
                                {t('terms.header.lastUpdated')}: {t('terms.lastUpdated')}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Introduction */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.introduction.title')}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t('terms.sections.introduction.content1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('terms.sections.introduction.content2')}
                                </p>
                            </section>

                            {/* Service Description */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.service.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.service.content1')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('terms.sections.service.feature1')}</li>
                                    <li>{t('terms.sections.service.feature2')}</li>
                                    <li>{t('terms.sections.service.feature3')}</li>
                                    <li>{t('terms.sections.service.feature4')}</li>
                                </ul>
                            </section>

                            {/* User Obligations */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.obligations.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.obligations.content1')}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>{t('terms.sections.obligations.rule1')}</li>
                                    <li>{t('terms.sections.obligations.rule2')}</li>
                                    <li>{t('terms.sections.obligations.rule3')}</li>
                                    <li>{t('terms.sections.obligations.rule4')}</li>
                                    <li>{t('terms.sections.obligations.rule5')}</li>
                                </ul>
                            </section>

                            {/* Intellectual Property */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.intellectual.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.intellectual.content1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('terms.sections.intellectual.content2')}
                                </p>
                            </section>

                            {/* Limitation of Liability */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.liability.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.liability.content1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('terms.sections.liability.content2')}
                                </p>
                            </section>

                            {/* Account Termination */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.termination.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.termination.content1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('terms.sections.termination.content2')}
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.changes.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {t('terms.sections.changes.content1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('terms.sections.changes.content2')}
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section className="bg-muted/30 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold">{t('terms.sections.contact.title')}</h2>
                                </div>
                                <p className="text-muted-foreground mb-2">
                                    {t('terms.sections.contact.content1')}
                                </p>
                                <p className="text-muted-foreground">
                                    <strong>Email:</strong> support@aspnetstack.com
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {t('terms.sections.contact.responseTime')}
                                </p>
                            </section>

                            {/* Footer Links */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {t('terms.footer.home')}
                                </Link>
                                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {t('terms.footer.privacy')}
                                </Link>
                                <Link href="/dashboard" className="text-sm text-primary hover:underline">
                                    {t('terms.footer.dashboard')}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}