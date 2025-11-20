import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

interface ForgotPasswordProps {
    status?: string;
    error?: string;
}

export default function ForgotPassword({ status, error }: ForgotPasswordProps) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Auth/ForgotPassword', {
            forceFormData: true,
            onFinish: () => reset('email'),
        });
    };

    return (
        <>
            <Head title={t('auth.forgotPassword.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    {/* Language Selector & Back to Login */}
                    <div className="flex justify-between items-center">
                        <Link href="/Auth/Login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('auth.forgotPassword.backToLogin')}
                        </Link>
                        <LanguageSelector />
                    </div>

                    {/* Forgot Password Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{t('auth.forgotPassword.title')}</CardTitle>
                                <CardDescription className="text-base">
                                    {t('auth.forgotPassword.description')}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {status && (
                                <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <p className="text-sm text-green-800">{status}</p>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('auth.forgotPassword.email')}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="pl-10"
                                            placeholder={t('auth.forgotPassword.emailPlaceholder')}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-11"
                                    disabled={processing}
                                >
                                    {processing ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.sendInstructions')}
                                </Button>
                            </form>

                            <div className="text-center pt-4">
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.forgotPassword.rememberedPassword')}{' '}
                                    <Link href="/Auth/Login" className="text-primary hover:underline font-medium">
                                        {t('auth.forgotPassword.signIn')}
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t('auth.forgotPassword.emailNotReceived')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}