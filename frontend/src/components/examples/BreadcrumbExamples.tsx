import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CodeExample } from '../CodeExample';
import { Home, Slash } from 'lucide-react';

const BreadcrumbExamples: React.FC = () => {
    const { t } = useTranslation();

    const frontendCode1 = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BasicBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Electronics</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`;

    const backendCode1 = `// Controllers/NavigationController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class NavigationController : Controller
{
    private readonly INavigationService _navigationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public NavigationController(INavigationService navigationService, UserManager<ApplicationUser> userManager)
    {
        _navigationService = navigationService;
        _userManager = userManager;
    }

    public async Task<IActionResult> Breadcrumb(string path)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Redirect("/Account/Login");

        var breadcrumbs = await _navigationService.GenerateBreadcrumbsAsync(path);
        var viewModel = new BreadcrumbViewModel { Breadcrumbs = breadcrumbs, Path = path };
        
        return Inertia.Render("Navigation/Breadcrumb", viewModel);
    }
}

// Models/BreadcrumbItem.cs
public class BreadcrumbItem
{
    public string Label { get; set; } = "";
    public string? Href { get; set; }
    public bool IsCurrentPage { get; set; }
    public string Icon { get; set; } = "";
}

// Models/BreadcrumbViewModel.cs
public class BreadcrumbViewModel
{
    public IEnumerable<BreadcrumbItem> Breadcrumbs { get; set; } = Enumerable.Empty<BreadcrumbItem>();
    public string Path { get; set; } = string.Empty;
}`;

    const frontendCode2 = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export function BreadcrumbWithIcons() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Profile</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`;

    const backendCode2 = `// Controllers/BreadcrumbController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class BreadcrumbController : Controller
{
    private readonly IBreadcrumbService _breadcrumbService;
    private readonly UserManager<ApplicationUser> _userManager;

    public BreadcrumbController(IBreadcrumbService breadcrumbService, UserManager<ApplicationUser> userManager)
    {
        _breadcrumbService = breadcrumbService;
        _userManager = userManager;
    }

    public async Task<IActionResult> NavigationBreadcrumb()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Redirect("/Account/Login");

        var navigation = new[]
        {
            new NavItem 
            { 
                Label = "Home", 
                Url = "/", 
                Icon = "Home",
                IsCurrent = false 
            },
            new NavItem 
            { 
                Label = "Dashboard", 
                Url = "/dashboard",
                Icon = null,
                IsCurrent = false 
            },
            new NavItem 
            { 
                Label = "Settings", 
                Url = "/dashboard/settings",
                Icon = null,
                IsCurrent = false 
            },
            new NavItem 
            { 
                Label = "Profile", 
                Url = null,
                Icon = null,
                IsCurrent = true 
            }
        };
        
        var viewModel = new NavigationBreadcrumbViewModel { Navigation = navigation };
        return Inertia.Render("Breadcrumb/Navigation", viewModel);
    }
}

// Models/NavItem.cs
public class NavItem
{
    public string Label { get; set; } = "";
    public string? Url { get; set; }
    public string? Icon { get; set; }
    public bool IsCurrent { get; set; }
}

// Models/NavigationBreadcrumbViewModel.cs
public class NavigationBreadcrumbViewModel
{
    public NavItem[] Navigation { get; set; } = Array.Empty<NavItem>();
}`;

    const frontendCode3 = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"

export function CustomSeparatorBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`;

    const backendCode3 = `// Controllers/DocumentationController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class DocumentationController : Controller
{
    private readonly IDocumentationService _documentationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public DocumentationController(IDocumentationService documentationService, UserManager<ApplicationUser> userManager)
    {
        _documentationService = documentationService;
        _userManager = userManager;
    }

    public async Task<IActionResult> DocsBreadcrumb(string currentPath)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Redirect("/Account/Login");

        // Parse path and build breadcrumb dynamically
        var pathSegments = currentPath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        var breadcrumbs = new List<DocBreadcrumb>
        {
            new DocBreadcrumb 
            { 
                Level = 0, 
                Title = "Home", 
                Path = "/", 
                IsActive = false 
            }
        };

        var cumulativePath = "";
        for (int i = 0; i < pathSegments.Length; i++)
        {
            cumulativePath += "/" + pathSegments[i];
            var isLast = i == pathSegments.Length - 1;
            
            breadcrumbs.Add(new DocBreadcrumb
            {
                Level = i + 1,
                Title = FormatTitle(pathSegments[i]),
                Path = isLast ? null : cumulativePath,
                IsActive = isLast
            });
        }
        
        var viewModel = new DocsBreadcrumbViewModel { Breadcrumbs = breadcrumbs, CurrentPath = currentPath };
        return Inertia.Render("Documentation/Breadcrumb", viewModel);
    }

    private string FormatTitle(string segment)
    {
        return segment.Replace("-", " ")
            .Split(' ')
            .Select(word => char.ToUpper(word[0]) + word.Substring(1))
            .Aggregate((a, b) => a + " " + b);
    }
}

// Models/DocBreadcrumb.cs
public class DocBreadcrumb
{
    public int Level { get; set; }
    public string Title { get; set; } = "";
    public string? Path { get; set; }
    public bool IsActive { get; set; }
}

// Models/DocsBreadcrumbViewModel.cs
public class DocsBreadcrumbViewModel
{
    public List<DocBreadcrumb> Breadcrumbs { get; set; } = new();
    public string CurrentPath { get; set; } = string.Empty;
}`;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.breadcrumb.title')}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.breadcrumb.description')}
                </p>
            </div>

            {/* Example 1: Basic Breadcrumb */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.breadcrumb.basic.title')}</h3>
                <p className="text-muted-foreground">{t('components.breadcrumb.basic.description')}</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">{t('components.breadcrumb.basic.home')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/products">{t('components.breadcrumb.basic.products')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{t('components.breadcrumb.basic.electronics')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CodeExample
                    code={{ frontend: frontendCode1, backend: backendCode1 }}
                />
            </div>

            {/* Example 2: Breadcrumb with Icons */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.breadcrumb.withIcons.title')}</h3>
                <p className="text-muted-foreground">{t('components.breadcrumb.withIcons.description')}</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                {t('components.breadcrumb.withIcons.home')}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">{t('components.breadcrumb.withIcons.dashboard')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard/settings">{t('components.breadcrumb.withIcons.settings')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{t('components.breadcrumb.withIcons.profile')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CodeExample
                    code={{ frontend: frontendCode2, backend: backendCode2 }}
                />
            </div>

            {/* Example 3: Custom Separator Breadcrumb */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.breadcrumb.customSeparator.title')}</h3>
                <p className="text-muted-foreground">{t('components.breadcrumb.customSeparator.description')}</p>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">{t('components.breadcrumb.customSeparator.home')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/docs">{t('components.breadcrumb.customSeparator.documentation')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/docs/components">{t('components.breadcrumb.customSeparator.components')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{t('components.breadcrumb.customSeparator.breadcrumb')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CodeExample
                    code={{ frontend: frontendCode3, backend: backendCode3 }}
                />
            </div>
        </div>
    );
};

export default BreadcrumbExamples;
