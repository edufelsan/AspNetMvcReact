import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    TrendingUp, 
    Users, 
    DollarSign, 
    Activity,
    Calendar,
    FileText,
    BarChart3,
    Plus,
    Settings
} from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import DashboardLayout from '@/Layouts/DashboardLayout';

interface User {
    id: number;
    name: string;
    email: string;
}

interface DashboardProps {
    auth: {
        user: User;
    };
}

export default function Dashboard({ auth }: DashboardProps) {
    const { t } = useTranslation();
    const { formatBRLValue } = useCurrency();
    const user = auth.user;

    // Breadcrumbs para navegação
    const breadcrumbs = [
        { label: t('dashboard.nav.main'), href: '/dashboard' },
        { label: t('dashboard.nav.overview'), current: true }
    ];

    const stats = [
        {
            title: t('dashboard.stats.totalUsers'),
            value: "2,431",
            change: "+12%",
            trend: "up",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: t('dashboard.stats.monthlyRevenue'),
            value: formatBRLValue(45231),
            change: "+8%",
            trend: "up", 
            icon: DollarSign,
            color: "text-green-600"
        },
        {
            title: t('dashboard.stats.conversionRate'),
            value: "3.24%",
            change: "-2%",
            trend: "down",
            icon: TrendingUp,
            color: "text-orange-600"
        },
        {
            title: t('dashboard.stats.monthlyActivity'),
            value: "12,432",
            change: "+18%",
            trend: "up",
            icon: Activity,
            color: "text-purple-600"
        }
    ];

    const recentActivities = [
        {
            title: t('dashboard.recentActivity.newUser'),
            description: `João Silva ${t('dashboard.recentActivity.userRegistered')}`,
            time: `2 ${t('dashboard.recentActivity.minutesAgo')}`,
            type: "user"
        },
        {
            title: t('dashboard.recentActivity.paymentProcessed'),
            description: `${t('dashboard.recentActivity.paymentApproved')} ${formatBRLValue(299.90)}`,
            time: `5 ${t('dashboard.recentActivity.minutesAgo')}`,
            type: "payment"
        },
        {
            title: t('dashboard.recentActivity.newOrder'),
            description: t('dashboard.recentActivity.orderPlaced'),
            time: `10 ${t('dashboard.recentActivity.minutesAgo')}`,
            type: "report"
        },
        {
            title: t('dashboard.recentActivity.systemUpdate'),
            description: `${t('dashboard.recentActivity.systemUpdated')} 2.1.0`,
            time: `1 ${t('dashboard.recentActivity.hoursAgo')}`,
            type: "system"
        }
    ];

    return (
        <DashboardLayout 
            title={t('dashboard.title')} 
            user={user}
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-6">
                {/* Welcome Section */}
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        {t('dashboard.welcome')}, {user.name.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-600">
                        {t('dashboard.overview')}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:bg-card/70 transition-all duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-muted ${stat.color} flex-shrink-0`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex items-center">
                                        <Badge 
                                            variant={stat.trend === 'up' ? 'default' : 'destructive'}
                                            className="text-xs"
                                        >
                                            {stat.change}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">vs mês anterior</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {t('dashboard.recentActivity.title')}
                                    <Button variant="outline" size="sm">
                                        {t('dashboard.recentActivity.viewAll')}
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                                                <p className="text-sm text-gray-600">{activity.description}</p>
                                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle>Ações Rápidas</CardTitle>
                                <CardDescription>
                                    Acesse as funcionalidades mais utilizadas
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start" variant="ghost">
                                    <Plus className="mr-2 h-4 w-4" />
                                    {t('dashboard.newProject')}
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Gerar Relatório
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Agendar Tarefa
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Ver Análises
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Gerenciar Configurações
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}