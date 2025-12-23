import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CalendarDays, ShoppingCart, Star, Bell, Check, Settings as SettingsIcon } from 'lucide-react';
import { CodeExample } from '../CodeExample';

const CardExamples: React.FC = () => {
  const { t } = useTranslation();
  
  const frontendCode1 = `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BasicCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You can create a new project by clicking the button below.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}`;

  const backendCode1 = `// Controllers/ProjectsController.cs
public class ProjectsController : Controller
{
    private readonly IProjectService _projectService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProjectsController(IProjectService projectService, UserManager<ApplicationUser> userManager)
    {
        _projectService = projectService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Create()
    {
        return Inertia.Render("Projects/Create");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Deploy([FromForm] CreateProjectRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var project = await _projectService.CreateProjectAsync(request.ProjectName, user.Id);
        
        return Redirect("/Projects/Dashboard").With("success", "Project deployed successfully!")
                                             .With("project", project);
    }
}

// Models/CreateProjectRequest.cs
public class CreateProjectRequest
{
    public string ProjectName { get; set; } = "";
}`;

  const frontendCode2 = `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  initials: string;
  joinDate: string;
}

export function UserProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>@{user.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{user.bio}</p>
        <div className="flex items-center pt-2 space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-1 h-3 w-3" />
            Joined {user.joinDate}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Follow</Button>
      </CardFooter>
    </Card>
  );
}`;

  const backendCode2 = `// Models/User.cs
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Username { get; set; } = "";
    public string Bio { get; set; } = "";
    public string Avatar { get; set; } = "";
    public string Initials { get; set; } = "";
    public DateTime JoinDate { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}

// Controllers/UsersController.cs
public class UsersController : Controller
{
    private readonly IUserService _userService;
    private readonly IFollowService _followService;
    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(
        IUserService userService, 
        IFollowService followService,
        UserManager<ApplicationUser> userManager)
    {
        _userService = userService;
        _followService = followService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Profile(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null) return NotFound();
        
        var isFollowing = User.Identity.IsAuthenticated ? 
            await _followService.IsFollowingAsync(User.Identity.Name, id) : false;
        
        return Inertia.Render("Users/Profile", new { user, isFollowing });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Follow([FromForm] int userId)
    {
        var currentUser = await _userManager.GetUserAsync(User);
        var result = await _followService.FollowUserAsync(currentUser.Id, userId);
        
        if (result.Success)
        {
            return Inertia.Back().With("success", "User followed successfully!");
        }
        
        return Inertia.Back().With("error", result.ErrorMessage);
    }
}`;

  const frontendCode3 = `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stats {
  revenue: string;
  revenueChange: string;
  activeUsers: string;
  usersChange: string;
}

export function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <svg className="h-4 w-4 text-muted-foreground">
            <path d="M12 2v20m6-6H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.revenue}</div>
          <p className="text-xs text-muted-foreground">{stats.revenueChange}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <svg className="h-4 w-4 text-muted-foreground">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">{stats.usersChange}</p>
        </CardContent>
      </Card>
    </div>
  );
}`;

  const backendCode3 = `// Models/DashboardStats.cs
public class DashboardStats
{
    public string Revenue { get; set; } = "";
    public string RevenueChange { get; set; } = "";
    public string ActiveUsers { get; set; } = "";
    public string UsersChange { get; set; } = "";
    public DateTime LastUpdated { get; set; }
    public string Period { get; set; } = "monthly";
}

// Controllers/DashboardController.cs
public class DashboardController : Controller
{
    private readonly IAnalyticsService _analyticsService;
    private readonly IDashboardService _dashboardService;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardController(
        IAnalyticsService analyticsService,
        IDashboardService dashboardService,
        UserManager<ApplicationUser> userManager)
    {
        _analyticsService = analyticsService;
        _dashboardService = dashboardService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index(string period = "monthly")
    {
        var user = await _userManager.GetUserAsync(User);
        var stats = await _analyticsService.GetDashboardStatsAsync(user.Id, period);
        var recentActivity = await _dashboardService.GetRecentActivityAsync(user.Id);
        
        return Inertia.Render("Dashboard/Index", new { 
            stats,
            recentActivity,
            period
        });
    }
}`;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{t('components.card.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('components.card.description')}
        </p>
      </div>

      {/* Basic Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.basicCard.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{t('components.card.basicCard.projectTitle')}</CardTitle>
              <CardDescription>{t('components.card.basicCard.projectDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('components.card.basicCard.projectContent')}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">{t('components.card.basicCard.cancel')}</Button>
              <Button>{t('components.card.basicCard.deploy')}</Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode1,
            backend: backendCode1
          }}
        />
      </div>

      {/* User Profile Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.userProfile.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[350px]">
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{t('components.card.userProfile.name')}</CardTitle>
                <CardDescription>@{t('components.card.userProfile.username')}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('components.card.userProfile.bio')}
              </p>
              <div className="flex items-center pt-2 space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {t('components.card.userProfile.joinDate')}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('components.card.userProfile.follow')}</Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode2,
            backend: backendCode2
          }}
        />
      </div>

      {/* Statistics Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.statistics.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('components.card.statistics.totalRevenue')}</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20m6-6H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t('components.card.statistics.revenueValue')}</div>
              <p className="text-xs text-muted-foreground">
                {t('components.card.statistics.revenueChange')}
              </p>
            </CardContent>
          </Card>

          <Card className="w-[250px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('components.card.statistics.activeUsers')}</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{t('components.card.statistics.usersValue')}</div>
              <p className="text-xs text-muted-foreground">
                {t('components.card.statistics.usersChange')}
              </p>
            </CardContent>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode3,
            backend: backendCode3
          }}
        />
      </div>

      {/* Product Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.product.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[300px]">
            <CardHeader className="p-0">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg">{t('components.card.product.productName')}</CardTitle>
                <Badge>{t('components.card.product.badge')}</Badge>
              </div>
              <CardDescription className="mb-3">
                {t('components.card.product.description')}
              </CardDescription>
              <div className="flex items-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
              </div>
              <div className="text-2xl font-bold">{t('components.card.product.price')}</div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t('components.card.product.addToCart')}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  badge: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-0">
        <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-t-lg flex items-center justify-center">
          <ShoppingCart className="h-16 w-16 text-white" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge>{product.badge}</Badge>
        </div>
        <CardDescription className="mb-3">{product.description}</CardDescription>
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
        </div>
        <div className="text-2xl font-bold">{product.price}</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}`,
            backend: `// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public double Rating { get; set; }
    public string Badge { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public bool InStock { get; set; } = true;
    public int Stock { get; set; }
}

// Controllers/ProductsController.cs
public class ProductsController : Controller
{
    private readonly IProductService _productService;
    private readonly ICartService _cartService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProductsController(
        IProductService productService,
        ICartService cartService,
        UserManager<ApplicationUser> userManager)
    {
        _productService = productService;
        _cartService = cartService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var products = await _productService.GetFeaturedProductsAsync();
        return Inertia.Render("Products/Index", new { products });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddToCart([FromForm] int productId)
    {
        var user = await _userManager.GetUserAsync(User);
        var result = await _cartService.AddToCartAsync(user.Id, productId);
        
        if (result.Success)
        {
            return Inertia.Back().With("success", "Product added to cart!");
        }
        
        return Inertia.Back().With("error", result.ErrorMessage);
    }
}`
          }}
        />
      </div>

      {/* Notification Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.notification.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[380px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle className="text-base">{t('components.card.notification.cardTitle')}</CardTitle>
                </div>
                <Badge variant="secondary">{t('components.card.notification.count')}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4 rounded-lg border p-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t('components.card.notification.message1.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('components.card.notification.message1.content')}</p>
                  <p className="text-xs text-muted-foreground">{t('components.card.notification.message1.time')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rounded-lg border p-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t('components.card.notification.message2.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('components.card.notification.message2.content')}</p>
                  <p className="text-xs text-muted-foreground">{t('components.card.notification.message2.time')}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">{t('components.card.notification.markAllRead')}</Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: `import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  user: string;
  initials: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export function NotificationCard({ notifications }: { notifications: Notification[] }) {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
          <Badge variant="secondary">{notifications.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 rounded-lg border p-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{notification.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.content}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  );
}`,
            backend: `// Models/Notification.cs
public class Notification
{
    public int Id { get; set; }
    public string User { get; set; } = "";
    public string Initials { get; set; } = "";
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public bool Read { get; set; }
    public string Type { get; set; } = "info";
}

// Controllers/NotificationsController.cs
public class NotificationsController : Controller
{
    private readonly INotificationService _notificationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public NotificationsController(
        INotificationService notificationService,
        UserManager<ApplicationUser> userManager)
    {
        _notificationService = notificationService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var notifications = await _notificationService.GetUserNotificationsAsync(user.Id);
        var unreadCount = await _notificationService.GetUnreadCountAsync(user.Id);
        
        return Inertia.Render("Notifications/Index", new { 
            notifications,
            unreadCount
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var user = await _userManager.GetUserAsync(User);
        await _notificationService.MarkAllAsReadAsync(user.Id);
        
        return Inertia.Back().With("success", "All notifications marked as read!");
    }
}`
          }}
        />
      </div>

      {/* Pricing Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.pricing.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[300px]">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">{t('components.card.pricing.planName')}</CardTitle>
              <CardDescription>{t('components.card.pricing.planDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold">{t('components.card.pricing.price')}<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{t('components.card.pricing.feature1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{t('components.card.pricing.feature2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{t('components.card.pricing.feature3')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{t('components.card.pricing.feature4')}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('components.card.pricing.subscribe')}</Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <div className="text-4xl font-bold">
            {plan.price}
            <span className="text-lg font-normal text-muted-foreground">/mo</span>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  );
}`,
            backend: `// Models/PricingPlan.cs
public class PricingPlan
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public List<string> Features { get; set; } = new();
    public string BillingCycle { get; set; } = "monthly";
    public bool Popular { get; set; }
    public string Currency { get; set; } = "USD";
}

// Controllers/SubscriptionController.cs
public class SubscriptionController : Controller
{
    private readonly ISubscriptionService _subscriptionService;
    private readonly IPaymentService _paymentService;
    private readonly UserManager<ApplicationUser> _userManager;

    public SubscriptionController(
        ISubscriptionService subscriptionService,
        IPaymentService paymentService,
        UserManager<ApplicationUser> userManager)
    {
        _subscriptionService = subscriptionService;
        _paymentService = paymentService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Pricing()
    {
        var plans = await _subscriptionService.GetAvailablePlansAsync();
        var currentPlan = User.Identity.IsAuthenticated ? 
            await _subscriptionService.GetUserCurrentPlanAsync(User.Identity.Name) : null;
        
        return Inertia.Render("Subscription/Pricing", new { 
            plans,
            currentPlan
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Subscribe([FromForm] int planId)
    {
        var user = await _userManager.GetUserAsync(User);
        var result = await _subscriptionService.CreateSubscriptionAsync(user.Id, planId);
        
        if (result.Success)
        {
            return Redirect("/Subscription/Success").With("success", "Subscription created successfully!");
        }
        
        return Inertia.Back().With("error", result.ErrorMessage);
    }
}`
          }}
        />
      </div>

      {/* Settings Card */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.card.settings.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Card className="w-[380px]">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <CardTitle>{t('components.card.settings.cardTitle')}</CardTitle>
              </div>
              <CardDescription>{t('components.card.settings.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t('components.card.settings.notifications.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('components.card.settings.notifications.description')}</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t('components.card.settings.marketing.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('components.card.settings.marketing.description')}</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{t('components.card.settings.security.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('components.card.settings.security.description')}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('components.card.settings.save')}</Button>
            </CardFooter>
          </Card>
        </div>
        <CodeExample
          code={{
            frontend: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon } from 'lucide-react';

interface Setting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function SettingsCard({ settings }: { settings: Setting[] }) {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-5 w-5" />
          <CardTitle>Preferences</CardTitle>
        </div>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between space-x-2">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{setting.title}</p>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <Switch defaultChecked={setting.enabled} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}`,
            backend: `// Models/UserSettings.cs
public class UserSettings
{
    public string UserId { get; set; } = "";
    public bool EmailNotifications { get; set; } = true;
    public bool MarketingEmails { get; set; } = false;
    public bool TwoFactorEnabled { get; set; } = true;
    public string Theme { get; set; } = "system";
    public string Language { get; set; } = "en";
    public DateTime LastUpdated { get; set; }
}

// Controllers/SettingsController.cs
public class SettingsController : Controller
{
    private readonly IUserSettingsService _settingsService;
    private readonly UserManager<ApplicationUser> _userManager;

    public SettingsController(
        IUserSettingsService settingsService,
        UserManager<ApplicationUser> userManager)
    {
        _settingsService = settingsService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var settings = await _settingsService.GetUserSettingsAsync(user.Id);
        
        return Inertia.Render("Settings/Index", new { settings });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Update([FromForm] UpdateSettingsRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _settingsService.UpdateUserSettingsAsync(user.Id, request);
        
        return Inertia.Back().With("success", "Settings updated successfully!");
    }
}

// Models/UpdateSettingsRequest.cs
public class UpdateSettingsRequest
{
    public bool EmailNotifications { get; set; }
    public bool MarketingEmails { get; set; }
    public bool TwoFactorEnabled { get; set; }
}`
          }}
        />
      </div>
    </div>
  );
};

export default CardExamples;