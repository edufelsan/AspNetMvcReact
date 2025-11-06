import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Auth/Login', {
            forceFormData: true,
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title={t('auth.login.title')} />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    {/* Language Selector & Back to Home */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('auth.login.backToHome')}
                        </Link>
                        <LanguageSelector />
                    </div>

                    {/* Login Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                                <Lock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{t('auth.login.welcome')}</CardTitle>
                                <CardDescription className="text-base">
                                    {t('auth.login.description')}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {status && (
                                <Alert>
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('auth.login.email')}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="pl-10"
                                            placeholder={t('auth.login.emailPlaceholder')}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('auth.login.password')}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={data.password}
                                            className="pl-10 pr-10"
                                            placeholder={t('auth.login.passwordPlaceholder')}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', !!checked)}
                                        />
                                        <Label htmlFor="remember" className="text-sm font-normal">
                                            {t('auth.login.rememberMe')}
                                        </Label>
                                    </div>
                                    
                                    {canResetPassword && (
                                        <Link
                                            href="/Auth/ForgotPassword"
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {t('auth.login.forgotPassword')}
                                        </Link>
                                    )}
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-11"
                                    disabled={processing}
                                >
                                    {processing ? t('common.loading') : t('auth.login.signIn')}
                                </Button>
                            </form>

                            <div className="text-center text-sm pt-4">
                                <span className="text-muted-foreground">{t('auth.login.noAccount')} </span>
                                <Link href="/Auth/Register" className="text-primary hover:underline font-medium">
                                    {t('auth.login.register')}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center text-xs text-muted-foreground">
                        © 2025 ASP.NET Stack Template. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </>
    );
}