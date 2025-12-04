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

    public CarouselController(ICarouselService carouselService, IAnalyticsService analyticsService)
    {
        _carouselService = carouselService;
        _analyticsService = analyticsService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var items = _carouselService.GetCarouselItems();
        return Inertia.Render("Carousel/Index", new { items });
    }

    [HttpPost]
    public IActionResult TrackView(int id)
    {
        _analyticsService.TrackCarouselView(id);
        TempData["Info"] = $"Visualização do item {id} registrada";
        return RedirectToAction("Index");
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
}
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace AspNetMvcReact.Controllers
{
    public class GalleryController : Controller
    {
        // Exibir galeria de imagens
        public IActionResult Index(string? category = null)
        {
            var images = new[]
            {
                new { 
                    id = 1, 
                    url = "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a",
                    title = "Laptop Moderno",
                    category = "Tecnologia",
                    uploadedAt = DateTime.UtcNow.AddDays(-10)
                },
                new { 
                    id = 2, 
                    url = "https://images.unsplash.com/photo-1593642532400-2682810df593",
                    title = "Workspace Criativo",
                    category = "Design",
                    uploadedAt = DateTime.UtcNow.AddDays(-5)
                },
                new { 
                    id = 3, 
                    url = "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec",
                    title = "Setup Profissional",
                    category = "Tecnologia",
                    uploadedAt = DateTime.UtcNow.AddDays(-2)
                }
            };
            
            var filteredImages = category != null 
                ? images.Where(i => i.category == category).ToArray()
                : images;
            
            return Inertia.Render("Gallery/Index", new { images = filteredImages, category });
        }

        // Upload de nova imagem
        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file, string title, string category)
        {
            if (file == null || file.Length == 0)
            {
                TempData["Error"] = "Nenhum arquivo fornecido";
                return RedirectToAction("Index");
            }

            // Processar upload da imagem
            // Salvar no banco de dados...

            TempData["Success"] = "Imagem enviada com sucesso!";
            return RedirectToAction("Index", new { category });
        }

        public IActionResult Upload()
        {
            return Inertia.Render("Gallery/Upload");
        }
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace AspNetMvcReact.Controllers
{
    public class ProductsController : Controller
    {
        // Exibir produtos em destaque
        public IActionResult Featured(int limit = 10)
        {
            var products = new[]
            {
                new { 
                    id = 1, 
                    name = "Gaming Console",
                    description = "Console de última geração",
                    price = 2999.99m,
                    image = "🎮",
                    category = "Gaming",
                    stock = 15,
                    featured = true
                },
                new { 
                    id = 2, 
                    name = "Wireless Headphones",
                    description = "Fones com cancelamento de ruído",
                    price = 899.99m,
                    image = "🎧",
                    category = "Audio",
                    stock = 30,
                    featured = true
                },
                new { 
                    id = 3, 
                    name = "Mechanical Keyboard",
                    description = "Teclado mecânico RGB",
                    price = 549.99m,
                    image = "⌨️",
                    category = "Peripherals",
                    stock = 25,
                    featured = true
                }
            };
            
            return Inertia.Render("Products/Featured", new { products = products.Take(limit) });
        }

        // Adicionar produto ao carrinho
        [HttpPost]
        public IActionResult AddToCart(CartItemRequest request)
        {
            if (!ModelState.IsValid)
            {
                TempData["Error"] = "Dados inválidos";
                return RedirectToAction("Featured");
            }

            // Adicionar ao carrinho
            // Salvar no banco de dados...

            TempData["Success"] = "Produto adicionado ao carrinho com sucesso!";
            return RedirectToAction("Featured");
        }

        // Exibir recomendações baseadas em produto
        public IActionResult Recommendations(int id, int limit = 5)
        {
            var recommendations = new[]
            {
                new { id = 10, name = "Mouse Gamer", price = 299.99m, relevance = 0.95 },
                new { id = 11, name = "Mousepad XXL", price = 89.99m, relevance = 0.87 },
                new { id = 12, name = "Webcam HD", price = 399.99m, relevance = 0.82 }
            };
            
            return Inertia.Render("Products/Recommendations", new { 
                productId = id,
                recommendations = recommendations.Take(limit) 
            });
        }

        private decimal CalculateCartTotal(int productId, int quantity)
        {
            // Simular cálculo do total
            var basePrice = 299.99m;
            return basePrice * quantity;
        }
    }

    public class CartItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
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
