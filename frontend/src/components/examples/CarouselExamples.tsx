import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { CodeExample } from '@/components/CodeExample';

const CarouselExamples: React.FC = () => {
    const { t } = useTranslation();

    // Exemplo 1: Carousel Básico
    const frontendCode1 = `import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export function BasicCarousel() {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">
                                        {index + 1}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}`;

    const backendCode1 = `// Controllers/CarouselController.cs
public class CarouselController : Controller
{
    private readonly ICarouselService _carouselService;
    private readonly IAnalyticsService _analyticsService;
    private readonly UserManager<ApplicationUser> _userManager;

    public CarouselController(
        ICarouselService carouselService, 
        IAnalyticsService analyticsService,
        UserManager<ApplicationUser> userManager)
    {
        _carouselService = carouselService;
        _analyticsService = analyticsService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var items = await _carouselService.GetCarouselItemsAsync();
        var popularItems = await _carouselService.GetPopularItemsAsync(5);
        
        return Inertia.Render("Carousel/Index", new { 
            items,
            popularItems
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> TrackView([FromForm] int id)
    {
        var user = await _userManager.GetUserAsync(User);
        await _analyticsService.TrackCarouselViewAsync(id, user?.Id);
        
        return Inertia.Back().With("info", $"View for item {id} has been tracked");
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var item = await _carouselService.GetCarouselItemAsync(id);
        if (item == null) return NotFound();
        
        return Inertia.Render("Carousel/Details", new { item });
    }
}

// Models/CarouselItem.cs
public class CarouselItem
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string ImageUrl { get; set; } = "";
    public int ViewCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public int Order { get; set; }
}`;

    // Exemplo 2: Carousel de Imagens
    const frontendCode2 = `import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export function ImageCarousel() {
    const images = [
        {
            url: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a',
            alt: '${t('components.carousel.images.image')} 1'
        },
        {
            url: 'https://images.unsplash.com/photo-1593642532400-2682810df593',
            alt: '${t('components.carousel.images.image')} 2'
        },
        {
            url: 'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec',
            alt: '${t('components.carousel.images.image')} 3'
        }
    ];

    return (
        <Carousel className="w-full max-w-lg">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-video items-center justify-center p-0">
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}`;

    const backendCode2 = `// Controllers/GalleryController.cs
public class GalleryController : Controller
{
    private readonly IGalleryService _galleryService;
    private readonly IFileUploadService _fileUploadService;
    private readonly UserManager<ApplicationUser> _userManager;

    public GalleryController(
        IGalleryService galleryService,
        IFileUploadService fileUploadService,
        UserManager<ApplicationUser> userManager)
    {
        _galleryService = galleryService;
        _fileUploadService = fileUploadService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Index(string? category = null)
    {
        var images = await _galleryService.GetImagesAsync(category);
        var categories = await _galleryService.GetCategoriesAsync();
        
        return Inertia.Render("Gallery/Index", new { 
            images,
            categories,
            selectedCategory = category
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Upload([FromForm] UploadImageRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        if (request.File == null || request.File.Length == 0)
        {
            return Inertia.Back().With("error", "No file provided");
        }

        var user = await _userManager.GetUserAsync(User);
        var imageResult = await _fileUploadService.UploadImageAsync(request.File, request.Title, request.Category, user.Id);
        
        if (imageResult.Success)
        {
            return Redirect("/Gallery").With("success", "Image uploaded successfully!");
        }
        
        return Inertia.Back().With("error", imageResult.ErrorMessage);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Upload()
    {
        var categories = await _galleryService.GetCategoriesAsync();
        return Inertia.Render("Gallery/Upload", new { categories });
    }
}

// Models/UploadImageRequest.cs
public class UploadImageRequest
{
    public IFormFile File { get; set; } = null!;
    public string Title { get; set; } = "";
    public string Category { get; set; } = "";
}

// Models/GalleryImage.cs
public class GalleryImage
{
    public int Id { get; set; }
    public string Url { get; set; } = "";
    public string Title { get; set; } = "";
    public string Category { get; set; } = "";
    public DateTime UploadedAt { get; set; }
    public string UserId { get; set; } = "";
}`;

    // Exemplo 3: Carousel de Produtos com Grid
    const frontendCode3 = `import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function ProductCarousel() {
    const products = [
        { id: 1, name: '${t('components.carousel.products.product')} 1', price: 99.99, image: '🎮' },
        { id: 2, name: '${t('components.carousel.products.product')} 2', price: 149.99, image: '🎧' },
        { id: 3, name: '${t('components.carousel.products.product')} 3', price: 79.99, image: '⌨️' },
        { id: 4, name: '${t('components.carousel.products.product')} 4', price: 199.99, image: '🖱️' },
        { id: 5, name: '${t('components.carousel.products.product')} 5', price: 299.99, image: '🖥️' },
    ];

    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full max-w-3xl"
        >
            <CarouselContent>
                {products.map((product) => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardHeader>
                                    <div className="text-6xl text-center mb-4">
                                        {product.image}
                                    </div>
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardDescription>
                                        ${t('components.carousel.products.price')}: R$ {product.price.toFixed(2)}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button className="w-full">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        ${t('components.carousel.products.addToCart')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}`;

    const backendCode3 = `// Controllers/ProductsController.cs
public class ProductsController : Controller
{
    private readonly IProductService _productService;
    private readonly ICartService _cartService;
    private readonly IRecommendationService _recommendationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProductsController(
        IProductService productService,
        ICartService cartService,
        IRecommendationService recommendationService,
        UserManager<ApplicationUser> userManager)
    {
        _productService = productService;
        _cartService = cartService;
        _recommendationService = recommendationService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Featured(int limit = 10)
    {
        var products = await _productService.GetFeaturedProductsAsync(limit);
        var categories = await _productService.GetCategoriesAsync();
        
        return Inertia.Render("Products/Featured", new { 
            products,
            categories
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddToCart([FromForm] CartItemRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("error", "Invalid data provided");
        }

        var user = await _userManager.GetUserAsync(User);
        var result = await _cartService.AddToCartAsync(user.Id, request.ProductId, request.Quantity);
        
        if (result.Success)
        {
            return Inertia.Back().With("success", "Product added to cart successfully!");
        }
        
        return Inertia.Back().With("error", result.ErrorMessage);
    }

    [HttpGet]
    public async Task<IActionResult> Recommendations(int id, int limit = 5)
    {
        var product = await _productService.GetProductAsync(id);
        if (product == null) return NotFound();
        
        var recommendations = await _recommendationService.GetRecommendationsAsync(id, limit);
        
        return Inertia.Render("Products/Recommendations", new { 
            product,
            recommendations
        });
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var product = await _productService.GetProductAsync(id);
        if (product == null) return NotFound();
        
        var relatedProducts = await _productService.GetRelatedProductsAsync(id, 4);
        
        return Inertia.Render("Products/Details", new {
            product,
            relatedProducts
        });
    }
}

// Models/CartItemRequest.cs
public class CartItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
}

// Models/Product.cs
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public string Image { get; set; } = "";
    public string Category { get; set; } = "";
    public int Stock { get; set; }
    public bool Featured { get; set; }
    public DateTime CreatedAt { get; set; }
}`;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.carousel.title')}</h2>
                <p className="text-muted-foreground text-lg">
                    {t('components.carousel.description')}
                </p>
            </div>

            {/* Exemplo 1: Carousel Básico */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.carousel.basic.title')}</h3>
                    <p className="text-muted-foreground">{t('components.carousel.basic.description')}</p>
                </div>

                <div className="flex justify-center p-6 border rounded-lg bg-card">
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold">
                                                    {index + 1}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <CodeExample code={{ frontend: frontendCode1, backend: backendCode1 }} />
            </div>

            {/* Exemplo 2: Carousel de Imagens */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.carousel.images.title')}</h3>
                    <p className="text-muted-foreground">{t('components.carousel.images.description')}</p>
                </div>

                <div className="flex justify-center p-6 border rounded-lg bg-card">
                    <Carousel className="w-full max-w-lg">
                        <CarouselContent>
                            {[
                                'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a',
                                'https://images.unsplash.com/photo-1593642532400-2682810df593',
                                'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec'
                            ].map((url, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden">
                                                <img
                                                    src={url}
                                                    alt={`${t('components.carousel.images.image')} ${index + 1}`}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    loading="lazy"
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <CodeExample code={{ frontend: frontendCode2, backend: backendCode2 }} />
            </div>

            {/* Exemplo 3: Carousel de Produtos */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.carousel.products.title')}</h3>
                    <p className="text-muted-foreground">{t('components.carousel.products.description')}</p>
                </div>

                <div className="flex justify-center p-6 border rounded-lg bg-card">
                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="w-full max-w-3xl"
                    >
                        <CarouselContent>
                            {[
                                { id: 1, name: t('components.carousel.products.product') + ' 1', price: 99.99, image: '🎮' },
                                { id: 2, name: t('components.carousel.products.product') + ' 2', price: 149.99, image: '🎧' },
                                { id: 3, name: t('components.carousel.products.product') + ' 3', price: 79.99, image: '⌨️' },
                                { id: 4, name: t('components.carousel.products.product') + ' 4', price: 199.99, image: '🖱️' },
                                { id: 5, name: t('components.carousel.products.product') + ' 5', price: 299.99, image: '🖥️' },
                            ].map((product) => (
                                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col items-center justify-center p-6">
                                                <div className="text-6xl mb-4">
                                                    {product.image}
                                                </div>
                                                <h4 className="font-semibold mb-1">{product.name}</h4>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {t('components.carousel.products.price')}: R$ {product.price.toFixed(2)}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <CodeExample code={{ frontend: frontendCode3, backend: backendCode3 }} />
            </div>
        </div>
    );
};

export default CarouselExamples;
