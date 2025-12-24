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

    const backendCode1 = `// Controllers/AnalyticsController.cs
public class AnalyticsController : Controller
{
    private readonly IAnalyticsService _analyticsService;
    private readonly UserManager<ApplicationUser> _userManager;

    public AnalyticsController(IAnalyticsService analyticsService, UserManager<ApplicationUser> userManager)
    {
        _analyticsService = analyticsService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> MonthlySales(int year = 2024)
    {
        var user = await _userManager.GetUserAsync(User);
        var monthlySales = await _analyticsService.GetMonthlySalesAsync(user.Id, year);
        
        var viewModel = new MonthlySalesViewModel
        {
            Year = year,
            Data = monthlySales,
            TotalSales = monthlySales.Sum(x => x.Sales),
            AverageSales = monthlySales.Average(x => x.Sales)
        };

        return Inertia.Render("Analytics/MonthlySales", viewModel);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SalesComparison([FromForm] SalesComparisonRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var comparison = await _analyticsService.GetSalesComparisonAsync(user.Id, request.StartDate, request.EndDate);
        
        return Inertia.Render("Analytics/Comparison", comparison);
    }
}

// Models/MonthlySalesViewModel.cs
public class MonthlySalesViewModel
{
    public int Year { get; set; }
    public List<MonthlySalesData> Data { get; set; } = new();
    public decimal TotalSales { get; set; }
    public decimal AverageSales { get; set; }
}

// Models/MonthlySalesData.cs
public class MonthlySalesData
{
    public string Month { get; set; } = "";
    public decimal Sales { get; set; }
    public decimal Target { get; set; }
}

// Models/SalesComparisonRequest.cs
public class SalesComparisonRequest
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
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

    const backendCode2 = `// Controllers/UserActivityController.cs
public class UserActivityController : Controller
{
    private readonly IUserActivityService _activityService;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserActivityController(IUserActivityService activityService, UserManager<ApplicationUser> userManager)
    {
        _activityService = activityService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Weekly()
    {
        var user = await _userManager.GetUserAsync(User);
        var weeklyActivity = await _activityService.GetWeeklyActivityAsync(user.Id);
        
        var viewModel = new WeeklyActivityViewModel
        {
            Data = weeklyActivity,
            TotalUsers = weeklyActivity.Sum(x => x.Users),
            PeakDay = weeklyActivity.OrderByDescending(x => x.Users).First().Day
        };

        return Inertia.Render("UserActivity/Weekly", viewModel);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Hourly([FromForm] HourlyActivityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var hourlyData = await _activityService.GetHourlyActivityAsync(user.Id, request.Date);
        
        var viewModel = new HourlyActivityViewModel
        {
            Date = request.Date,
            Data = hourlyData,
            PeakHour = hourlyData.OrderByDescending(x => x.ActiveUsers).First().Hour
        };

        return Inertia.Render("UserActivity/Hourly", viewModel);
    }
}

// Models/WeeklyActivityViewModel.cs
public class WeeklyActivityViewModel
{
    public List<WeeklyActivityData> Data { get; set; } = new();
    public int TotalUsers { get; set; }
    public string PeakDay { get; set; } = "";
}

// Models/WeeklyActivityData.cs
public class WeeklyActivityData
{
    public string Day { get; set; } = "";
    public int Users { get; set; }
    public int Sessions { get; set; }
    public decimal AvgDuration { get; set; }
}

// Models/HourlyActivityViewModel.cs
public class HourlyActivityViewModel
{
    public DateTime Date { get; set; }
    public List<HourlyActivityData> Data { get; set; } = new();
    public int PeakHour { get; set; }
}

// Models/HourlyActivityData.cs
public class HourlyActivityData
{
    public int Hour { get; set; }
    public int ActiveUsers { get; set; }
    public int Requests { get; set; }
}

// Models/HourlyActivityRequest.cs
public class HourlyActivityRequest
{
    public DateTime Date { get; set; }
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

    const backendCode3 = `// Controllers/CategoriesController.cs
public class CategoriesController : Controller
{
    private readonly ICategoriesService _categoriesService;
    private readonly UserManager<ApplicationUser> _userManager;

    public CategoriesController(ICategoriesService categoriesService, UserManager<ApplicationUser> userManager)
    {
        _categoriesService = categoriesService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> SalesDistribution()
    {
        var user = await _userManager.GetUserAsync(User);
        var distribution = await _categoriesService.GetSalesDistributionAsync(user.Id);
        
        var viewModel = new SalesDistributionViewModel
        {
            Data = distribution,
            TotalValue = distribution.Sum(x => x.Value),
            TopCategory = distribution.OrderByDescending(x => x.Value).First().Category
        };

        return Inertia.Render("Categories/SalesDistribution", viewModel);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Trends([FromForm] CategoryTrendsRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var trends = await _categoriesService.GetCategoryTrendsAsync(user.Id, request.Months);
        
        var viewModel = new CategoryTrendsViewModel
        {
            Period = request.Months,
            Trends = trends,
            FastestGrowing = trends.OrderByDescending(x => x.Growth).First().Category
        };

        return Inertia.Render("Categories/Trends", viewModel);
    }
}

// Models/SalesDistributionViewModel.cs
public class SalesDistributionViewModel
{
    public List<CategoryDistributionData> Data { get; set; } = new();
    public decimal TotalValue { get; set; }
    public string TopCategory { get; set; } = "";
}

// Models/CategoryDistributionData.cs
public class CategoryDistributionData
{
    public string Category { get; set; } = "";
    public decimal Value { get; set; }
    public decimal Percentage { get; set; }
    public string Color { get; set; } = "";
}

// Models/CategoryTrendsViewModel.cs
public class CategoryTrendsViewModel
{
    public int Period { get; set; }
    public List<CategoryTrendData> Trends { get; set; } = new();
    public string FastestGrowing { get; set; } = "";
}

// Models/CategoryTrendData.cs
public class CategoryTrendData
{
    public string Category { get; set; } = "";
    public decimal Growth { get; set; }
    public string Trend { get; set; } = "";
}

// Models/CategoryTrendsRequest.cs
public class CategoryTrendsRequest
{
    public int Months { get; set; } = 6;
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
