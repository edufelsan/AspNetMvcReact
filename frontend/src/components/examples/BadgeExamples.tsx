import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { CodeExample } from '../CodeExample';
import { CheckCircle, XCircle, AlertCircle, Clock, Star, Zap } from 'lucide-react';

const BadgeExamples: React.FC = () => {
    const { t } = useTranslation();

    const frontendCode1 = `import { Badge } from "@/components/ui/badge"

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`;

    const backendCode1 = `// Controllers/ComponentsController.cs
public class ComponentsController : Controller
{
    private readonly IComponentService _componentService;

    public ComponentsController(IComponentService componentService)
    {
        _componentService = componentService;
    }

    [HttpGet]
    public IActionResult BadgeVariants()
    {
        var variants = new[]
        {
            new { Name = "Default", Variant = "default", Description = "Primary badge style", UseCase = "Main actions or status" },
            new { Name = "Secondary", Variant = "secondary", Description = "Subtle neutral badge", UseCase = "Supporting information" },
            new { Name = "Destructive", Variant = "destructive", Description = "Error or warning badge", UseCase = "Critical alerts" },
            new { Name = "Outline", Variant = "outline", Description = "Outlined badge variant", UseCase = "Subtle categorization" }
        };
        
        return Inertia.Render("Components/BadgeVariants", new { variants });
    }
    
    [HttpGet]
    public async Task<IActionResult> BadgeExamples()
    {
        var examples = await _componentService.GetBadgeExamplesAsync();
        return Inertia.Render("Components/BadgeExamples", new { examples });
    }
}

// Models/BadgeVariant.cs
public class BadgeVariant
{
    public string Name { get; set; } = "";
    public string Variant { get; set; } = "";
    public string Description { get; set; } = "";
    public string UseCase { get; set; } = "";
}`;

    const frontendCode2 = `import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

const statuses = [
  { icon: CheckCircle, label: "Active", variant: "default", color: "text-green-600" },
  { icon: Clock, label: "Pending", variant: "secondary", color: "text-yellow-600" },
  { icon: AlertCircle, label: "Warning", variant: "outline", color: "text-orange-600" },
  { icon: XCircle, label: "Inactive", variant: "destructive", color: "text-red-600" }
]

export function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Badge key={status.label} variant={status.variant} className="gap-1">
          <status.icon className={\`h-3 w-3 \${status.color}\`} />
          {status.label}
        </Badge>
      ))}
    </div>
  )
}`;

    const backendCode2 = `// Controllers/OrderController.cs
public class OrderController : Controller
{
    private readonly IOrderService _orderService;
    private readonly IStatusService _statusService;

    public OrderController(IOrderService orderService, IStatusService statusService)
    {
        _orderService = orderService;
        _statusService = statusService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Details(int id)
    {
        var order = await _orderService.GetOrderAsync(id);
        if (order == null) return NotFound();
        
        var statusBadge = _statusService.GetStatusBadge(order.Status);
        
        return Inertia.Render("Orders/Details", new { order, statusBadge });
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> List()
    {
        var orders = await _orderService.GetUserOrdersAsync(User.Identity.Name);
        var orderStatuses = orders.Select(o => new 
        {
            o.Id,
            o.OrderNumber,
            Status = _statusService.GetStatusBadge(o.Status)
        });
        
        return Inertia.Render("Orders/List", new { orders = orderStatuses });
    }
}

// Models/OrderStatus.cs
public class OrderStatus
{
    public string Status { get; set; } = "";
    public string StatusLabel { get; set; } = "";
    public string BadgeVariant { get; set; } = "";
    public string Icon { get; set; } = "";
    public string ColorClass { get; set; } = "";
}

// Services/IStatusService.cs
public interface IStatusService
{
    OrderStatus GetStatusBadge(string status);
}`;

    const frontendCode3 = `import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
  rating: number;
  isNew: boolean;
  discount?: number;
}

export function ProductBadges({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {product.isNew && (
          <Badge variant="default" className="bg-blue-600">
            New
          </Badge>
        )}
        {product.discount && (
          <Badge variant="destructive">
            -{product.discount}%
          </Badge>
        )}
        {product.rating >= 4.5 && (
          <Badge variant="secondary" className="gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </Badge>
        )}
        {product.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}`;

    const backendCode3 = `// Controllers/ProductController.cs
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IBadgeService _badgeService;

    public ProductController(IProductService productService, IBadgeService badgeService)
    {
        _productService = productService;
        _badgeService = badgeService;
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var product = await _productService.GetProductAsync(id);
        if (product == null) return NotFound();
        
        var badges = _badgeService.GenerateProductBadges(product);
        
        return Inertia.Render("Products/Details", new { product, badges });
    }
    
    [HttpGet]
    public async Task<IActionResult> Catalog(string? category = null)
    {
        var products = await _productService.GetProductsAsync(category);
        var productsWithBadges = products.Select(p => new 
        {
            Product = p,
            Badges = _badgeService.GenerateProductBadges(p)
        });
        
        return Inertia.Render("Products/Catalog", new { products = productsWithBadges, category });
    }
}

// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
    public string[] Tags { get; set; } = Array.Empty<string>();
    public double Rating { get; set; }
    public bool IsNew { get; set; }
    public int? DiscountPercentage { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsFeatured { get; set; }
}

// Models/ProductBadge.cs
public class ProductBadge
{
    public string Type { get; set; } = "";
    public string Label { get; set; } = "";
    public string Variant { get; set; } = "";
    public string? Icon { get; set; }
    public string? ColorClass { get; set; }
}`;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.badge.title')}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.badge.description')}
                </p>
            </div>

            {/* Example 1: Badge Variants */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.badge.variants.title')}</h3>
                <p className="text-muted-foreground">{t('components.badge.variants.description')}</p>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="default">{t('components.badge.variants.default')}</Badge>
                    <Badge variant="secondary">{t('components.badge.variants.secondary')}</Badge>
                    <Badge variant="destructive">{t('components.badge.variants.destructive')}</Badge>
                    <Badge variant="outline">{t('components.badge.variants.outline')}</Badge>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode1, backend: backendCode1 }}
                />
            </div>

            {/* Example 2: Status Badges with Icons */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.badge.status.title')}</h3>
                <p className="text-muted-foreground">{t('components.badge.status.description')}</p>
                <div className="flex flex-wrap gap-3">
                    <Badge variant="default" className="gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {t('components.badge.status.active')}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3 text-yellow-600" />
                        {t('components.badge.status.pending')}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                        <AlertCircle className="h-3 w-3 text-orange-600" />
                        {t('components.badge.status.warning')}
                    </Badge>
                    <Badge variant="destructive" className="gap-1">
                        <XCircle className="h-3 w-3" />
                        {t('components.badge.status.inactive')}
                    </Badge>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode2, backend: backendCode2 }}
                />
            </div>

            {/* Example 3: Product Badges */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.badge.product.title')}</h3>
                <p className="text-muted-foreground">{t('components.badge.product.description')}</p>
                <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">{t('components.badge.product.productName')}</h4>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default" className="bg-blue-600">
                                {t('components.badge.product.new')}
                            </Badge>
                            <Badge variant="destructive">
                                -20%
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                4.8
                            </Badge>
                            <Badge variant="outline">{t('components.badge.product.tag1')}</Badge>
                            <Badge variant="outline">{t('components.badge.product.tag2')}</Badge>
                            <Badge variant="outline">{t('components.badge.product.tag3')}</Badge>
                        </div>
                    </div>

                    <div className="p-4 border rounded-lg space-y-3">
                        <h4 className="font-semibold">{t('components.badge.product.productName2')}</h4>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                4.9
                            </Badge>
                            <Badge variant="outline">{t('components.badge.product.tag4')}</Badge>
                            <Badge variant="outline">{t('components.badge.product.tag5')}</Badge>
                            <Badge variant="outline" className="gap-1">
                                <Zap className="h-3 w-3" />
                                {t('components.badge.product.fastShipping')}
                            </Badge>
                        </div>
                    </div>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode3, backend: backendCode3 }}
                />
            </div>
        </div>
    );
};

export default BadgeExamples;
