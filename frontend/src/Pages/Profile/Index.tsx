import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    User, 
    Mail, 
    Shield, 
    CheckCircle2, 
    AlertCircle, 
    Settings,
    Trash2,
    Eye,
    EyeOff
} from 'lucide-react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    emailConfirmed: boolean;
    createdAt: string;
    lastLoginAt?: string;
}

interface ProfileProps {
    user: User;
    success?: string;
    errors?: Record<string, string[]>;
}

export default function ProfileIndex({ user, success, errors }: ProfileProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'security'>('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Form para atualizar perfil
    const profileForm = useForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
    });

    // Form para alterar senha
    const passwordForm = useForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Form para excluir conta
    const deleteForm = useForm({
        password: ''
    });

    const breadcrumbs = [
        { label: t('dashboard.nav.main'), href: '/dashboard' },
        { label: t('profile.title'), current: true }
    ];

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.post('/Profile/UpdateProfile', {
            preserveScroll: true,
            onSuccess: () => {
                // Form será limpo automaticamente
            }
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.post('/Profile/ChangePassword', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            }
        });
    };

    const handleDeleteAccount = () => {
        deleteForm.post('/Profile/DeleteAccount', {
            onSuccess: (response: any) => {
                if (response.props?.redirect) {
                    window.location.href = response.props.redirect;
                }
            },
            onFinish: () => {
                setShowDeleteDialog(false);
                deleteForm.reset();
            }
        });
    };

    const resendConfirmationEmail = () => {
        fetch('/Profile/ResendEmailConfirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle response - você pode adicionar um toast notification aqui
            console.log(data.message);
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <DashboardLayout 
            title={t('profile.title')} 
            user={{ id: parseInt(user.id), name: user.name, email: user.email }}
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-6">
                {/* Success Message */}
                {success && (
                    <Alert className="border-green-200 bg-green-50 text-green-800">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                            {success}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Profile Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage 
                                    src={`https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff&size=128`} 
                                    alt={user.name} 
                                />
                                <AvatarFallback className="text-lg">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    {user.emailConfirmed ? (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            {t('profile.emailVerified')}
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            {t('profile.emailNotVerified')}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-500">
                                    {t('profile.memberSince')} {formatDate(user.createdAt)}
                                </p>
                                {user.lastLoginAt && (
                                    <p className="text-sm text-gray-500">
                                        {t('profile.lastLogin')} {formatDate(user.lastLoginAt)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Email Verification Alert */}
                {!user.emailConfirmed && (
                    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">
                            {t('profile.emailNotVerifiedMessage')}
                            <Button 
                                variant="link" 
                                className="p-0 h-auto text-yellow-800 underline ml-2"
                                onClick={resendConfirmationEmail}
                            >
                                {t('profile.resendConfirmation')}
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Navigation Tabs */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-lg">{t('profile.settings')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                                className={`w-full justify-start ${activeTab === 'profile' ? '' : 'text-gray-600'}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <User className="h-4 w-4 mr-2" />
                                {t('profile.personalInfo')}
                            </Button>
                            <Button
                                variant={activeTab === 'password' ? 'default' : 'ghost'}
                                className={`w-full justify-start ${activeTab === 'password' ? '' : 'text-gray-600'}`}
                                onClick={() => setActiveTab('password')}
                            >
                                <Shield className="h-4 w-4 mr-2" />
                                {t('profile.password')}
                            </Button>
                            <Button
                                variant={activeTab === 'security' ? 'default' : 'ghost'}
                                className={`w-full justify-start ${activeTab === 'security' ? '' : 'text-gray-600'}`}
                                onClick={() => setActiveTab('security')}
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                {t('profile.security')}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Personal Information Tab */}
                        {activeTab === 'profile' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('profile.personalInfo')}</CardTitle>
                                    <CardDescription>
                                        {t('profile.personalInfoDescription')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                                                <Input
                                                    id="firstName"
                                                    type="text"
                                                    value={profileForm.data.firstName}
                                                    onChange={(e) => profileForm.setData('firstName', e.target.value)}
                                                    disabled={profileForm.processing}
                                                    className={errors?.firstName ? 'border-red-500' : ''}
                                                />
                                                {errors?.firstName && (
                                                    <p className="text-sm text-red-600">{errors.firstName[0]}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                                                <Input
                                                    id="lastName"
                                                    type="text"
                                                    value={profileForm.data.lastName}
                                                    onChange={(e) => profileForm.setData('lastName', e.target.value)}
                                                    disabled={profileForm.processing}
                                                    className={errors?.lastName ? 'border-red-500' : ''}
                                                />
                                                {errors?.lastName && (
                                                    <p className="text-sm text-red-600">{errors.lastName[0]}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t('profile.email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profileForm.data.email}
                                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                                disabled={profileForm.processing}
                                                className={errors?.email ? 'border-red-500' : ''}
                                            />
                                            {errors?.email && (
                                                <p className="text-sm text-red-600">{errors.email[0]}</p>
                                            )}
                                            <p className="text-sm text-gray-600">
                                                {t('profile.emailChangeNote')}
                                            </p>
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={profileForm.processing}
                                            className="w-full md:w-auto"
                                        >
                                            {profileForm.processing ? t('common.saving') : t('common.save')}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {/* Password Tab */}
                        {activeTab === 'password' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('profile.changePassword')}</CardTitle>
                                    <CardDescription>
                                        {t('profile.changePasswordDescription')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">{t('profile.currentPassword')}</Label>
                                            <div className="relative">
                                                <Input
                                                    id="currentPassword"
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    value={passwordForm.data.currentPassword}
                                                    onChange={(e) => passwordForm.setData('currentPassword', e.target.value)}
                                                    disabled={passwordForm.processing}
                                                    className={errors?.currentPassword ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                >
                                                    {showCurrentPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors?.currentPassword && (
                                                <p className="text-sm text-red-600">{errors.currentPassword[0]}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">{t('profile.newPassword')}</Label>
                                            <div className="relative">
                                                <Input
                                                    id="newPassword"
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={passwordForm.data.newPassword}
                                                    onChange={(e) => passwordForm.setData('newPassword', e.target.value)}
                                                    disabled={passwordForm.processing}
                                                    className={errors?.newPassword ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors?.newPassword && (
                                                <p className="text-sm text-red-600">{errors.newPassword[0]}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">{t('profile.confirmPassword')}</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={passwordForm.data.confirmPassword}
                                                    onChange={(e) => passwordForm.setData('confirmPassword', e.target.value)}
                                                    disabled={passwordForm.processing}
                                                    className={errors?.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors?.confirmPassword && (
                                                <p className="text-sm text-red-600">{errors.confirmPassword[0]}</p>
                                            )}
                                        </div>
                                        <Button 
                                            type="submit" 
                                            disabled={passwordForm.processing}
                                            className="w-full md:w-auto"
                                        >
                                            {passwordForm.processing ? t('common.saving') : t('profile.changePassword')}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                {/* Account Status */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('profile.accountStatus')}</CardTitle>
                                        <CardDescription>
                                            {t('profile.accountStatusDescription')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-5 w-5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium">{t('profile.emailVerification')}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {user.emailConfirmed ? 
                                                            t('profile.emailVerified') : 
                                                            t('profile.emailNotVerified')
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            {user.emailConfirmed ? (
                                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    {t('profile.verified')}
                                                </Badge>
                                            ) : (
                                                <div>
                                                    <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 mr-2">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        {t('profile.pending')}
                                                    </Badge>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={resendConfirmationEmail}
                                                    >
                                                        {t('profile.verify')}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Danger Zone */}
                                <Card className="border-red-200">
                                    <CardHeader>
                                        <CardTitle className="text-red-600">{t('profile.dangerZone')}</CardTitle>
                                        <CardDescription>
                                            {t('profile.dangerZoneDescription')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" className="w-full md:w-auto">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    {t('profile.deleteAccount')}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-red-600">
                                                        {t('profile.deleteAccountConfirm')}
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        {t('profile.deleteAccountWarning')}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="deletePassword">
                                                            {t('profile.confirmPassword')}
                                                        </Label>
                                                        <Input
                                                            id="deletePassword"
                                                            type="password"
                                                            value={deleteForm.data.password}
                                                            onChange={(e) => deleteForm.setData('password', e.target.value)}
                                                            placeholder={t('profile.enterPassword')}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button 
                                                        variant="outline" 
                                                        onClick={() => setShowDeleteDialog(false)}
                                                        disabled={deleteForm.processing}
                                                    >
                                                        {t('common.cancel')}
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        onClick={handleDeleteAccount}
                                                        disabled={deleteForm.processing || !deleteForm.data.password}
                                                    >
                                                        {deleteForm.processing ? 
                                                            t('common.deleting') : 
                                                            t('profile.deleteAccount')
                                                        }
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}