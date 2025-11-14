import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';
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

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public IActionResult Create()
    {
        return Inertia.Render("Projects/Create");
    }

    [HttpPost]
    public IActionResult Deploy([FromForm] string projectName)
    {
        var project = _projectService.CreateProject(projectName, User.Identity.Name);
        return Inertia.Render("Projects/Dashboard", new { project })
                     .With("success", "Project deployed successfully!");
    }
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
}

// Controllers/UsersController.cs
public class UsersController : Controller
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Profile(int id)
    {
        var user = _userService.GetUserById(id);
        return Inertia.Render("Users/Profile", new { user });
    }

    [HttpPost]
    public IActionResult Follow(int userId)
    {
        _userService.FollowUser(User.Identity.Name, userId);
        return Inertia.Back().With("success", "User followed successfully!");
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
}

// Controllers/DashboardController.cs
public class DashboardController : Controller
{
    private readonly IAnalyticsService _analyticsService;

    public DashboardController(IAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var stats = new DashboardStats
        {
            Revenue = "$45,231.89",
            RevenueChange = "+20.1% from last month",
            ActiveUsers = "+2,350",
            UsersChange = "+180.1% from last month"
        };
        
        return Inertia.Render("Dashboard/Index", new { stats });
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
    </div>
  );
};

export default CardExamples;