import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';

interface ResetPasswordProps {
    token: string;
    email: string;
    errors?: Record<string, string[]>;
}

export default function ResetPassword({ token, email, errors }: ResetPasswordProps) {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors: formErrors } = useForm({
        email: email,
        token: token,
        password: '',
        password_confirmation: '',
    });

    const allErrors = { ...errors, ...formErrors };
    const generalErrors = (allErrors as any)[''] || [];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Auth/ResetPassword');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Head title={t('auth.resetPassword.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    {/* Language Selector & Back to Login */}
                    <div className="flex justify-between items-center">
                        <Link href="/Auth/Login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('auth.resetPassword.backToLogin')}
                        </Link>
                        <LanguageSelector />
                    </div>

                    {/* Reset Password Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                                <Lock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{t('auth.resetPassword.title')}</CardTitle>
                                <CardDescription className="text-base">
                                    {t('auth.resetPassword.description')} <strong>{email}</strong>
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Erro geral */}
                            {generalErrors.length > 0 && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-800">{generalErrors[0]}</p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                {/* Campo de email (hidden) */}
                                <input type="hidden" name="email" value={data.email} />
                                <input type="hidden" name="token" value={data.token} />

                                {/* Nova Senha */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('auth.resetPassword.password')}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={data.password}
                                            className="pl-10 pr-10"
                                            placeholder={t('auth.resetPassword.passwordPlaceholder')}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {allErrors.password && (
                                        <p className="text-sm text-destructive">{allErrors.password[0]}</p>
                                    )}
                                </div>

                                {/* Confirmar Senha */}
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">{t('auth.resetPassword.confirmPassword')}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={data.password_confirmation}
                                            className="pl-10 pr-10"
                                            placeholder={t('auth.resetPassword.confirmPasswordPlaceholder')}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {allErrors.password_confirmation && (
                                        <p className="text-sm text-destructive">{allErrors.password_confirmation[0]}</p>
                                    )}
                                </div>

                                {/* Informações sobre a senha */}
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="text-sm font-medium text-blue-900 mb-1">{t('auth.resetPassword.passwordRequirements')}</h4>
                                    <ul className="text-xs text-blue-800 space-y-1">
                                        <li>• {t('auth.resetPassword.minCharacters')}</li>
                                        <li>• {t('auth.resetPassword.upperCase')}</li>
                                        <li>• {t('auth.resetPassword.lowerCase')}</li>
                                        <li>• {t('auth.resetPassword.number')}</li>
                                    </ul>
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-11"
                                    disabled={processing}
                                >
                                    {processing ? t('auth.resetPassword.resetting') : t('auth.resetPassword.resetPassword')}
                                </Button>
                            </form>

                            <div className="text-center pt-4">
                                <p className="text-sm text-muted-foreground">
                                    {t('auth.resetPassword.rememberedPassword')}{' '}
                                    <Link href="/Auth/Login" className="text-primary hover:underline font-medium">
                                        {t('auth.resetPassword.signIn')}
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            {t('auth.resetPassword.securityNote')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}