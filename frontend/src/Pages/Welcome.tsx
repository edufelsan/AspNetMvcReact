import { Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Code, Database, Zap, Shield, Palette, Rocket, Star, Table, BarChart3, Github, Users, Heart, GitFork } from 'lucide-react';
import { AppLayout } from '@/components/layout';
import { useTranslation } from 'react-i18next';

interface AuthData {
    isAuthenticated: boolean;
    user: {
        Id: string;
        Name: string;
        Email: string;
        FirstName?: string;
        LastName?: string;
    } | null;
}

export default function Welcome() {
    const { t } = useTranslation();
    const page = usePage();
    const auth = (page.props as any).auth as AuthData;
    

    const features = [
        {
            icon: Code,
            title: t('welcome.features.aspnet.title'),
            description: t('welcome.features.aspnet.description'),
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Zap,
            title: t('welcome.features.inertia.title'),
            description: t('welcome.features.inertia.description'),
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: Palette,
            title: t('welcome.features.shadcn.title'),
            description: t('welcome.features.shadcn.description'),
            color: "from-emerald-500 to-emerald-600"
        },
        {
            icon: Shield,
            title: t('welcome.features.auth.title'),
            description: t('welcome.features.auth.description'),
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: Database,
            title: t('welcome.features.ef.title'),
            description: t('welcome.features.ef.description'),
            color: "from-cyan-500 to-cyan-600"
        },
        {
            icon: Rocket,
            title: t('welcome.features.production.title'),
            description: t('welcome.features.production.description'),
            color: "from-pink-500 to-pink-600"
        },
        {
            icon: Table,
            title: t('welcome.features.tanstack.title'),
            description: t('welcome.features.tanstack.description'),
            color: "from-indigo-500 to-indigo-600"
        }
    ];

    return (
        <AppLayout title={t('welcome.title')}>


            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-violet-50 dark:from-gray-900 dark:via-background dark:to-gray-900">
                <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,hsl(var(--background)),rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,hsl(var(--background)),rgba(0,0,0,0.6))] opacity-50"></div>
                <div className="container mx-auto px-4 py-24 lg:py-32 relative">
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="px-4 py-2 text-sm">
                                <Star className="w-4 h-4 mr-2" />
                                {t('welcome.hero.badge')}
                            </Badge>
                            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                                ASP.NET Core 8 +{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                    React + shadcn/ui
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {t('welcome.hero.description')}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/Auth/Register">
                                <Button size="lg" className="h-12 px-8 text-base">
                                    {t('welcome.hero.startNow')} <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href={auth?.isAuthenticated ? "/Dashboard" : "/Auth/Login"}>
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    {t('welcome.hero.viewDashboard')}
                                </Button>
                            </Link>
                            <Link href="/components/demo">
                                <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                    <Palette className="mr-2 h-5 w-5" />
                                    {t('welcome.hero.viewComponents')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            {t('welcome.features.title')}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t('welcome.features.subtitle')}
                        </p>
                        <Separator className="w-20 mx-auto" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {features.slice(0, 6).map((feature, index) => (
                            <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <CardHeader className="space-y-4 text-center">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                        <feature.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                    {/* TanStack Table Card - Centered */}
                    {features.length > 6 && (
                        <div className="flex justify-center">
                            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group max-w-md">
                                <CardHeader className="space-y-4 text-center">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${features[6].color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                                        <Table className="h-7 w-7 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{features[6].title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardDescription className="text-base leading-relaxed">
                                        {features[6].description}
                                    </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-2">19+</div>
                            <div className="text-sm text-muted-foreground">{t('welcome.stats.components')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                            <div className="text-sm text-muted-foreground">{t('welcome.stats.typescript')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-2">0</div>
                            <div className="text-sm text-muted-foreground">{t('welcome.stats.noApis')}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground mb-2">5min</div>
                            <div className="text-sm text-muted-foreground">{t('welcome.stats.setup')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GitHub Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
                                    <Github className="h-8 w-8 text-white dark:text-gray-900" />
                                </div>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                {t('welcome.github.title')}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {t('welcome.github.subtitle')}
                            </p>
                            <Separator className="w-20 mx-auto" />
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {t('welcome.github.description')}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                                        <Code className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{t('welcome.github.features.openSource')}</h3>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                                        <Heart className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{t('welcome.github.features.free')}</h3>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{t('welcome.github.features.community')}</h3>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                                        <GitFork className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-2">{t('welcome.github.features.contributions')}</h3>
                                </CardContent>
                            </Card>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <a 
                                href="https://github.com/edufelsan/AspNetMvcReact" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex"
                            >
                                <Button size="lg" className="h-12 px-8 text-base">
                                    <Github className="mr-2 h-5 w-5" />
                                    {t('welcome.github.viewOnGithub')}
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-violet-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]"></div>
                <div className="container mx-auto px-4 text-center text-white space-y-8 relative">
                    <h2 className="text-3xl lg:text-4xl font-bold">
                        {t('welcome.cta.title')}
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        {t('welcome.cta.description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/Auth/Register">
                            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                {t('welcome.cta.startNow')} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href={auth?.isAuthenticated ? "/Dashboard" : "/Auth/Login"}>
                            <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                <BarChart3 className="mr-2 h-5 w-5" />
                                {t('welcome.cta.viewDashboard')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </AppLayout>
    );
}