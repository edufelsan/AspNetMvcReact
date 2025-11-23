import React from 'react';
import { useTranslation } from 'react-i18next';
import { CodeExample } from '@/components/CodeExample';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ChartExamples: React.FC = () => {
    const { t } = useTranslation();

    // Dados para os gráficos
    const barData = [
        { month: t('components.chart.bar.months.jan'), sales: 4000 },
        { month: t('components.chart.bar.months.feb'), sales: 3000 },
        { month: t('components.chart.bar.months.mar'), sales: 5000 },
        { month: t('components.chart.bar.months.apr'), sales: 4500 },
        { month: t('components.chart.bar.months.may'), sales: 6000 },
        { month: t('components.chart.bar.months.jun'), sales: 5500 },
    ];

    const lineData = [
        { day: t('components.chart.line.days.mon'), users: 120 },
        { day: t('components.chart.line.days.tue'), users: 150 },
        { day: t('components.chart.line.days.wed'), users: 180 },
        { day: t('components.chart.line.days.thu'), users: 160 },
        { day: t('components.chart.line.days.fri'), users: 200 },
        { day: t('components.chart.line.days.sat'), users: 170 },
        { day: t('components.chart.line.days.sun'), users: 140 },
    ];

    const pieData = [
        { name: t('components.chart.pie.categories.electronics'), value: 400 },
        { name: t('components.chart.pie.categories.clothing'), value: 300 },
        { name: t('components.chart.pie.categories.food'), value: 200 },
        { name: t('components.chart.pie.categories.books'), value: 150 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Exemplo 1: Bar Chart
    const frontendCode1 = `import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SalesBarChart() {
    const data = [
        { month: '${t('components.chart.bar.months.jan')}', sales: 4000 },
        { month: '${t('components.chart.bar.months.feb')}', sales: 3000 },
        { month: '${t('components.chart.bar.months.mar')}', sales: 5000 },
        { month: '${t('components.chart.bar.months.apr')}', sales: 4500 },
        { month: '${t('components.chart.bar.months.may')}', sales: 6000 },
        { month: '${t('components.chart.bar.months.jun')}', sales: 5500 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>${t('components.chart.bar.title')}</CardTitle>
                <CardDescription>${t('components.chart.bar.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}`;

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        // Obter dados de vendas mensais
        [HttpGet("monthly-sales")]
        public IActionResult GetMonthlySales([FromQuery] int year = 2024)
        {
            var monthlySales = new[]
            {
                new { month = "Janeiro", sales = 4000, target = 3500 },
                new { month = "Fevereiro", sales = 3000, target = 3500 },
                new { month = "Março", sales = 5000, target = 4000 },
                new { month = "Abril", sales = 4500, target = 4000 },
                new { month = "Maio", sales = 6000, target = 5000 },
                new { month = "Junho", sales = 5500, target = 5000 }
            };
            
            return Ok(new
            {
                year = year,
                data = monthlySales,
                totalSales = monthlySales.Sum(x => x.sales),
                averageSales = monthlySales.Average(x => x.sales)
            });
        }

        // Obter comparação de vendas por período
        [HttpGet("sales-comparison")]
        public IActionResult GetSalesComparison(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var comparison = new
            {
                currentPeriod = new { start = startDate, end = endDate, total = 28500 },
                previousPeriod = new { start = startDate.AddMonths(-6), end = endDate.AddMonths(-6), total = 24000 },
                growth = 18.75m
            };
            
            return Ok(comparison);
        }
    }
}`;

    // Exemplo 2: Line Chart
    const frontendCode2 = `import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function UserActivityLineChart() {
    const data = [
        { day: '${t('components.chart.line.days.mon')}', users: 120 },
        { day: '${t('components.chart.line.days.tue')}', users: 150 },
        { day: '${t('components.chart.line.days.wed')}', users: 180 },
        { day: '${t('components.chart.line.days.thu')}', users: 160 },
        { day: '${t('components.chart.line.days.fri')}', users: 200 },
        { day: '${t('components.chart.line.days.sat')}', users: 170 },
        { day: '${t('components.chart.line.days.sun')}', users: 140 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>${t('components.chart.line.title')}</CardTitle>
                <CardDescription>${t('components.chart.line.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}`;

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserActivityController : ControllerBase
    {
        // Obter atividade de usuários por dia da semana
        [HttpGet("weekly")]
        public IActionResult GetWeeklyActivity()
        {
            var weeklyActivity = new[]
            {
                new { day = "Segunda", users = 120, sessions = 350, avgDuration = 15.5 },
                new { day = "Terça", users = 150, sessions = 420, avgDuration = 18.2 },
                new { day = "Quarta", users = 180, sessions = 520, avgDuration = 20.1 },
                new { day = "Quinta", users = 160, sessions = 480, avgDuration = 17.8 },
                new { day = "Sexta", users = 200, sessions = 600, avgDuration = 22.5 },
                new { day = "Sábado", users = 170, sessions = 510, avgDuration = 19.3 },
                new { day = "Domingo", users = 140, sessions = 380, avgDuration = 16.7 }
            };
            
            return Ok(new
            {
                data = weeklyActivity,
                totalUsers = weeklyActivity.Sum(x => x.users),
                peakDay = weeklyActivity.OrderByDescending(x => x.users).First().day
            });
        }

        // Obter dados de atividade por hora
        [HttpGet("hourly")]
        public IActionResult GetHourlyActivity([FromQuery] DateTime date)
        {
            var hourlyData = Enumerable.Range(0, 24).Select(hour => new
            {
                hour = hour,
                activeUsers = new Random().Next(50, 300),
                requests = new Random().Next(100, 1000)
            }).ToArray();
            
            return Ok(new
            {
                date = date,
                data = hourlyData,
                peakHour = hourlyData.OrderByDescending(x => x.activeUsers).First().hour
            });
        }
    }
}`;

    // Exemplo 3: Pie Chart
    const frontendCode3 = `import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CategoryDistributionPieChart() {
    const data = [
        { name: '${t('components.chart.pie.categories.electronics')}', value: 400 },
        { name: '${t('components.chart.pie.categories.clothing')}', value: 300 },
        { name: '${t('components.chart.pie.categories.food')}', value: 200 },
        { name: '${t('components.chart.pie.categories.books')}', value: 150 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>${t('components.chart.pie.title')}</CardTitle>
                <CardDescription>${t('components.chart.pie.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => 
                                \`\${name}: \${(percent * 100).toFixed(0)}%\`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}`;

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        // Obter distribuição de vendas por categoria
        [HttpGet("sales-distribution")]
        public IActionResult GetSalesDistribution()
        {
            var distribution = new[]
            {
                new { 
                    category = "Eletrônicos", 
                    value = 400, 
                    percentage = 37.74m,
                    color = "#0088FE"
                },
                new { 
                    category = "Roupas", 
                    value = 300, 
                    percentage = 28.30m,
                    color = "#00C49F"
                },
                new { 
                    category = "Alimentos", 
                    value = 200, 
                    percentage = 18.87m,
                    color = "#FFBB28"
                },
                new { 
                    category = "Livros", 
                    value = 150, 
                    percentage = 14.15m,
                    color = "#FF8042"
                }
            };
            
            return Ok(new
            {
                data = distribution,
                totalValue = distribution.Sum(x => x.value),
                topCategory = distribution.OrderByDescending(x => x.value).First().category
            });
        }

        // Obter tendências de categorias
        [HttpGet("trends")]
        public IActionResult GetCategoryTrends([FromQuery] int months = 6)
        {
            var trends = new[]
            {
                new { category = "Eletrônicos", growth = 15.5m, trend = "up" },
                new { category = "Roupas", growth = -5.2m, trend = "down" },
                new { category = "Alimentos", growth = 8.3m, trend = "up" },
                new { category = "Livros", growth = 2.1m, trend = "stable" }
            };
            
            return Ok(new
            {
                period = months,
                trends = trends,
                fastestGrowing = trends.OrderByDescending(x => x.growth).First().category
            });
        }
    }
}`;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.chart.title')}</h2>
                <p className="text-muted-foreground text-lg">
                    {t('components.chart.description')}
                </p>
            </div>

            {/* Exemplo 1: Bar Chart */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.chart.bar.title')}</h3>
                    <p className="text-muted-foreground">{t('components.chart.bar.description')}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('components.chart.bar.chartTitle')}</CardTitle>
                        <CardDescription>{t('components.chart.bar.chartDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <CodeExample code={{ frontend: frontendCode1, backend: backendCode1 }} />
            </div>

            {/* Exemplo 2: Line Chart */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.chart.line.title')}</h3>
                    <p className="text-muted-foreground">{t('components.chart.line.description')}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('components.chart.line.chartTitle')}</CardTitle>
                        <CardDescription>{t('components.chart.line.chartDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <CodeExample code={{ frontend: frontendCode2, backend: backendCode2 }} />
            </div>

            {/* Exemplo 3: Pie Chart */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.chart.pie.title')}</h3>
                    <p className="text-muted-foreground">{t('components.chart.pie.description')}</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('components.chart.pie.chartTitle')}</CardTitle>
                        <CardDescription>{t('components.chart.pie.chartDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => 
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <CodeExample code={{ frontend: frontendCode3, backend: backendCode3 }} />
            </div>
        </div>
    );
};

export default ChartExamples;
