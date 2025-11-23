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

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

public class NavigationController : Controller
{
    public class BreadcrumbItem
    {
        public string Label { get; set; } = "";
        public string? Href { get; set; }
        public bool IsCurrentPage { get; set; }
    }

    [HttpGet("/api/breadcrumb")]
    public IActionResult GetBreadcrumb(string path)
    {
        var breadcrumbs = new List<BreadcrumbItem>
        {
            new BreadcrumbItem 
            { 
                Label = "Home", 
                Href = "/", 
                IsCurrentPage = false 
            },
            new BreadcrumbItem 
            { 
                Label = "Products", 
                Href = "/products", 
                IsCurrentPage = false 
            },
            new BreadcrumbItem 
            { 
                Label = "Electronics", 
                Href = null, 
                IsCurrentPage = true 
            }
        };
        
        return Json(breadcrumbs);
    }
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

public class BreadcrumbController : Controller
{
    public class NavItem
    {
        public string Label { get; set; } = "";
        public string? Url { get; set; }
        public string? Icon { get; set; }
        public bool IsCurrent { get; set; }
    }

    [HttpGet("/api/navigation/breadcrumb")]
    public IActionResult GetNavigationBreadcrumb()
    {
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
        
        return Json(navigation);
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

public class DocumentationController : Controller
{
    public class DocBreadcrumb
    {
        public int Level { get; set; }
        public string Title { get; set; } = "";
        public string? Path { get; set; }
        public bool IsActive { get; set; }
    }

    [HttpGet("/api/docs/breadcrumb")]
    public IActionResult GetDocsBreadcrumb(string currentPath)
    {
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
        
        return Json(breadcrumbs);
    }

    private string FormatTitle(string segment)
    {
        return segment.Replace("-", " ")
            .Split(' ')
            .Select(word => char.ToUpper(word[0]) + word.Substring(1))
            .Aggregate((a, b) => a + " " + b);
    }
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
