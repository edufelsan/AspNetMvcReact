import { Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { AuthLayout } from '@/components/layout';

export default function Register() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/Auth/Register', {
            forceFormData: true,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title={t('auth.register.title')}>
            {/* Register Card */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-4 text-center pb-8">
                            <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center shadow-lg">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{t('auth.register.welcome')}</CardTitle>
                                <CardDescription className="text-base">
                                    {t('auth.register.description')}
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('auth.register.fullName')}</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            className="pl-10"
                                            placeholder={t('auth.register.fullNamePlaceholder')}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('auth.register.email')}</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="pl-10"
                                            placeholder={t('auth.register.emailPlaceholder')}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">{t('auth.register.password')}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={data.password}
                                            className="pl-10 pr-10"
                                            placeholder={t('auth.register.passwordPlaceholder')}
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

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">{t('auth.register.confirmPassword')}</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? "text" : "password"}
                                            value={data.password_confirmation}
                                            className="pl-10 pr-10"
                                            placeholder={t('auth.register.confirmPasswordPlaceholder')}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        >
                                            {showPasswordConfirmation ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-destructive">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={data.terms}
                                        onCheckedChange={(checked) => setData('terms', checked === true)}
                                        className="mt-1"
                                    />
                                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                                        {t('auth.register.terms')}{' '}
                                        <Link href="/terms" className="text-primary hover:underline">
                                            {t('auth.register.termsLink')}
                                        </Link>{' '}
                                        {t('auth.register.and')}{' '}
                                        <Link href="/privacy" className="text-primary hover:underline">
                                            {t('auth.register.privacyLink')}
                                        </Link>
                                    </Label>
                                </div>
                                {errors.terms && (
                                    <p className="text-sm text-destructive">{errors.terms}</p>
                                )}

                                <Button 
                                    type="submit" 
                                    className="w-full h-11"
                                    disabled={processing || !data.terms}
                                >
                                    {processing ? t('common.loading') : t('auth.register.createAccount')}
                                </Button>
                            </form>

                            <div className="text-center text-sm pt-4">
                                <span className="text-muted-foreground">{t('auth.register.alreadyHaveAccount')} </span>
                                <Link href="/Auth/Login" className="text-primary hover:underline font-medium">
                                    {t('auth.register.login')}
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center text-xs text-muted-foreground">
                        © 2025 ASP.NET Stack Template. Todos os direitos reservados.
                    </div>
        </AuthLayout>
    );
}