import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';

interface EmailConfirmationResultProps {
    success: boolean;
    message: string;
    email?: string;
}

export default function EmailConfirmationResult({ success, message, email }: EmailConfirmationResultProps) {
    const { t } = useTranslation();
    
    const handleResendConfirmation = () => {
        // Fazer requisição para reenviar email de confirmação
        fetch('/Auth/ResendConfirmationEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(t('auth.emailConfirmationResult.common.resendSuccess'));
            } else {
                alert(t('auth.emailConfirmationResult.common.resendError') + ' ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(t('auth.emailConfirmationResult.common.resendErrorGeneric'));
        });
    };

    return (
        <>
            <Head title={success ? t('auth.emailConfirmationResult.success.title') : t('auth.emailConfirmationResult.error.title')} />
            
            <div className={`min-h-screen bg-gradient-to-br ${success 
                ? 'from-green-50 via-background to-emerald-50 dark:from-gray-900 dark:via-background dark:to-gray-900' 
                : 'from-red-50 via-background to-pink-50 dark:from-gray-900 dark:via-background dark:to-gray-900'} flex items-center justify-center p-4`}>
                <div className="w-full max-w-md space-y-6">
                    <LanguageSelector />
                    
                    {/* Result Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className={`h-16 w-16 mx-auto rounded-full ${success ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-pink-600'} flex items-center justify-center shadow-lg`}>
                                {success ? (
                                    <CheckCircle className="h-8 w-8 text-white" />
                                ) : (
                                    <XCircle className="h-8 w-8 text-white" />
                                )}
                            </div>
                            <div>
                                <CardTitle className={`text-2xl font-bold ${success ? 'text-green-900' : 'text-red-900'}`}>
                                    {success ? t('auth.emailConfirmationResult.success.title') : t('auth.emailConfirmationResult.error.title')}
                                </CardTitle>
                                <CardDescription className={`text-base ${success ? 'text-green-700' : 'text-red-700'}`}>
                                    {success ? t('auth.emailConfirmationResult.success.description') : t('auth.emailConfirmationResult.error.description')}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Message */}
                            <div className={`p-4 ${success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg`}>
                                <div className="flex items-start space-x-3">
                                    {success ? (
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                    )}
                                    <div>
                                        <p className={`text-sm ${success ? 'text-green-800' : 'text-red-800'}`}>
                                            {message}
                                        </p>
                                        {email && (
                                            <p className={`text-sm ${success ? 'text-green-700' : 'text-red-700'} mt-1 font-medium`}>
                                                {t('auth.emailConfirmationResult.common.email')} {email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {success ? (
                                // Success content
                                <>
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h3 className="text-sm font-medium text-blue-900 mb-2">
                                            {t('auth.emailConfirmationResult.success.congratulations')}
                                        </h3>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• {t('auth.emailConfirmationResult.success.accountActivated')}</li>
                                            <li>• {t('auth.emailConfirmationResult.success.accessResources')}</li>
                                            <li>• {t('auth.emailConfirmationResult.success.dataSecure')}</li>
                                        </ul>
                                    </div>

                                    <Link href="/Auth/Login">
                                        <Button className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                                            {t('auth.emailConfirmationResult.success.signIn')}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                // Error content
                                <>
                                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                        <h3 className="text-sm font-medium text-amber-900 mb-2">
                                            {t('auth.emailConfirmationResult.error.possibleCauses')}
                                        </h3>
                                        <ul className="text-sm text-amber-800 space-y-1">
                                            <li>• {t('auth.emailConfirmationResult.error.linkExpired')}</li>
                                            <li>• {t('auth.emailConfirmationResult.error.linkUsed')}</li>
                                            <li>• {t('auth.emailConfirmationResult.error.linkCorrupted')}</li>
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <Button 
                                            onClick={handleResendConfirmation}
                                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            {t('auth.emailConfirmationResult.error.resendEmail')}
                                        </Button>

                                        <Link href="/Auth/Login">
                                            <Button variant="outline" className="w-full h-11">
                                                {t('auth.emailConfirmationResult.error.signInAnyway')}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}

                            {/* Additional Actions */}
                            <div className="text-center pt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.emailConfirmationResult.common.needHelp')}{' '}
                                    <Link href="/Support" className="text-primary hover:underline font-medium">
                                        {t('auth.emailConfirmationResult.common.contact')}
                                    </Link>
                                </p>
                                
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.emailConfirmationResult.common.or')}{' '}
                                    <Link href="/" className="text-primary hover:underline font-medium">
                                        {t('auth.emailConfirmationResult.common.backToHome')}
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Information */}
                    <div className="text-center">
                        {success ? (
                            <p className="text-xs text-muted-foreground">
                                {t('auth.emailConfirmationResult.success.enjoyPlatform')}
                            </p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                {t('auth.emailConfirmationResult.error.persistentProblem')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}