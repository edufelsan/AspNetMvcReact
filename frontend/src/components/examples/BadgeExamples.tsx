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

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

public class BadgeController : Controller
{
    public class BadgeVariant
    {
        public string Name { get; set; } = "";
        public string Variant { get; set; } = "";
        public string Description { get; set; } = "";
    }

    [HttpGet("/api/badges/variants")]
    public IActionResult GetBadgeVariants()
    {
        var variants = new[]
        {
            new BadgeVariant 
            { 
                Name = "Default", 
                Variant = "default", 
                Description = "Primary badge style" 
            },
            new BadgeVariant 
            { 
                Name = "Secondary", 
                Variant = "secondary", 
                Description = "Subtle neutral badge" 
            },
            new BadgeVariant 
            { 
                Name = "Destructive", 
                Variant = "destructive", 
                Description = "Error or warning badge" 
            },
            new BadgeVariant 
            { 
                Name = "Outline", 
                Variant = "outline", 
                Description = "Outlined badge variant" 
            }
        };
        
        return Json(variants);
    }
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

public class OrderController : Controller
{
    public class OrderStatus
    {
        public int OrderId { get; set; }
        public string Status { get; set; } = "";
        public string StatusLabel { get; set; } = "";
        public string BadgeVariant { get; set; } = "";
        public string Icon { get; set; } = "";
    }

    [HttpGet("/api/orders/{orderId}/status")]
    public IActionResult GetOrderStatus(int orderId)
    {
        var orderStatuses = new Dictionary<string, OrderStatus>
        {
            ["active"] = new OrderStatus 
            { 
                OrderId = orderId,
                Status = "active", 
                StatusLabel = "Active",
                BadgeVariant = "default",
                Icon = "CheckCircle"
            },
            ["pending"] = new OrderStatus 
            { 
                OrderId = orderId,
                Status = "pending", 
                StatusLabel = "Pending",
                BadgeVariant = "secondary",
                Icon = "Clock"
            },
            ["warning"] = new OrderStatus 
            { 
                OrderId = orderId,
                Status = "warning", 
                StatusLabel = "Warning",
                BadgeVariant = "outline",
                Icon = "AlertCircle"
            },
            ["inactive"] = new OrderStatus 
            { 
                OrderId = orderId,
                Status = "inactive", 
                StatusLabel = "Inactive",
                BadgeVariant = "destructive",
                Icon = "XCircle"
            }
        };

        var status = orderStatuses["active"]; // Example
        return Json(status);
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

public class ProductController : Controller
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public string[] Tags { get; set; } = Array.Empty<string>();
        public double Rating { get; set; }
        public bool IsNew { get; set; }
        public int? Discount { get; set; }
    }

    [HttpGet("/api/products/{productId}")]
    public IActionResult GetProduct(int productId)
    {
        var product = new Product
        {
            Id = productId,
            Name = "Premium Wireless Headphones",
            Price = 299.99M,
            Tags = new[] { "Electronics", "Audio", "Wireless" },
            Rating = 4.8,
            IsNew = true,
            Discount = 20
        };

        var badges = new List<object>();

        if (product.IsNew)
            badges.Add(new { Type = "new", Label = "New", Variant = "default" });

        if (product.Discount.HasValue)
            badges.Add(new { Type = "discount", Label = $"-{product.Discount}%", Variant = "destructive" });

        if (product.Rating >= 4.5)
            badges.Add(new { Type = "rating", Label = product.Rating.ToString(), Variant = "secondary" });

        foreach (var tag in product.Tags)
            badges.Add(new { Type = "tag", Label = tag, Variant = "outline" });

        return Json(new { product, badges });
    }
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
