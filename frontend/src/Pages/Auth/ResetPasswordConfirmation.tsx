import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

interface ResetPasswordConfirmationProps {
    email: string;
}

export default function ResetPasswordConfirmation({ email }: ResetPasswordConfirmationProps) {
    const { t } = useTranslation();
    
    return (
        <>
            <Head title={t('auth.resetPasswordConfirmation.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-emerald-50 dark:from-gray-900 dark:via-background dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    {/* Language Selector */}
                    <div className="flex justify-end">
                        <LanguageSelector />
                    </div>
                    
                    {/* Success Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold text-green-900">
                                    {t('auth.resetPasswordConfirmation.title')}
                                </CardTitle>
                                <CardDescription className="text-base text-green-700">
                                    {t('auth.resetPasswordConfirmation.description')}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Success Message */}
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-green-900">
                                            {t('auth.resetPasswordConfirmation.changeCompleted')}
                                        </h3>
                                        <p className="text-sm text-green-800 mt-1">
                                            {t('auth.resetPasswordConfirmation.passwordChanged', { email })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Security Information */}
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-blue-900">
                                            {t('auth.resetPasswordConfirmation.emailNotification')}
                                        </h3>
                                        <p className="text-sm text-blue-800 mt-1">
                                            {t('auth.resetPasswordConfirmation.emailSent')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Security Tips */}
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <h3 className="text-sm font-medium text-amber-900 mb-2">
                                    🔒 {t('auth.resetPasswordConfirmation.securityTips')}
                                </h3>
                                <ul className="text-sm text-amber-800 space-y-1">
                                    <li>• {t('auth.resetPasswordConfirmation.loggedOutDevices')}</li>
                                    <li>• {t('auth.resetPasswordConfirmation.keepSecure')}</li>
                                    <li>• {t('auth.resetPasswordConfirmation.dontShare')}</li>
                                </ul>
                            </div>

                            {/* Login Button */}
                            <Link href="/Auth/Login">
                                <Button className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                    {t('auth.resetPasswordConfirmation.signInNow')}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>

                            {/* Additional Actions */}
                            <div className="text-center pt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.resetPasswordConfirmation.needHelp')}{' '}
                                    <Link href="/Support" className="text-primary hover:underline font-medium">
                                        {t('auth.resetPasswordConfirmation.contact')}
                                    </Link>
                                </p>
                                
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.resetPasswordConfirmation.or')}{' '}
                                    <Link href="/" className="text-primary hover:underline font-medium">
                                        {t('auth.resetPasswordConfirmation.backToHome')}
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t('auth.resetPasswordConfirmation.securityAlert')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}