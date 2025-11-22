import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/layout';
import { ComponentsSidebar } from '@/components/ComponentsSidebar';
import { ButtonExamples } from '@/components/examples/ButtonExamples';
import { AlertExamples } from '@/components/examples/AlertExamples';
import CardExamples from '@/components/examples/CardExamples';
import AlertDialogExamples from '@/components/examples/AlertDialogExamples';
import AccordionExamples from '@/components/examples/AccordionExamples';
import AspectRatioExamples from '@/components/examples/AspectRatioExamples';
import AvatarExamples from '@/components/examples/AvatarExamples';
import BadgeExamples from '@/components/examples/BadgeExamples';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Zap } from 'lucide-react';

export default function ComponentsDemo() {
    const { t } = useTranslation();
    const [selectedComponent, setSelectedComponent] = useState<string>('overview');

    const renderContent = () => {
        switch (selectedComponent) {
            case 'accordion':
                return <AccordionExamples />;
            case 'alert':
                return <AlertExamples />;
            case 'alertDialog':
                return <AlertDialogExamples />;
            case 'aspectRatio':
                return <AspectRatioExamples />;
            case 'avatar':
                return <AvatarExamples />;
            case 'badge':
                return <BadgeExamples />;
            case 'button':
                return <ButtonExamples />;
            case 'card':
                return <CardExamples />;
            case 'overview':
            default:
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                                <Palette className="h-8 w-8 text-primary" />
                                <h1 className="text-4xl font-bold">{t('components.title', 'shadcn/ui Components')}</h1>
                            </div>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                {t('components.description', 'Explore and test all available shadcn/ui components with practical examples and ASP.NET Core 8 integration.')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Code className="h-5 w-5 text-blue-500" />
                                        <CardTitle>{t('overview.title')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {t('overview.description')}
                                    </CardDescription>
                                    <div className="mt-4">
                                        <Badge variant="secondary">40+ Components</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Zap className="h-5 w-5 text-yellow-500" />
                                        <CardTitle>{t('overview.features.title')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {t('overview.features.description')}
                                    </CardDescription>
                                    <div className="mt-4">
                                        <Badge variant="secondary">Interactive</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <Palette className="h-5 w-5 text-purple-500" />
                                        <CardTitle>{t('overview.integration.title')}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {t('overview.integration.description')}
                                    </CardDescription>
                                    <div className="mt-4">
                                        <Badge variant="secondary">Accessible</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">{t('overview.gettingStarted.title')}</h2>
                            <div className="space-y-3 text-muted-foreground">
                                <p>{t('overview.gettingStarted.step1')}</p>
                                <p>{t('overview.gettingStarted.step2')}</p>
                                <p>{t('overview.gettingStarted.step3')}</p>
                                <p>{t('overview.gettingStarted.step4')}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <AppLayout title="Components Demo - shadcn/ui" showFooter={false}>
            <div className="flex min-h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <aside className="w-64 border-r bg-muted/30">
                    <ComponentsSidebar 
                        selectedComponent={selectedComponent}
                        onSelectComponent={setSelectedComponent}
                    />
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}