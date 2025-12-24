import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Menu, Settings, ShoppingCart, Plus, Minus, User, Bell, Mail, Phone } from 'lucide-react';
import { CodeExample } from '../CodeExample';

export default function DrawerExamples() {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailFrequency, setEmailFrequency] = useState('daily');
    
    // Cart state
    const [cartItems] = useState([
        { id: 1, name: 'Smartphone Pro Max', price: 999.99, image: '📱' },
        { id: 2, name: 'Wireless Headphones', price: 199.99, image: '🎧' },
        { id: 3, name: 'Smart Watch', price: 299.99, image: '⌚' }
    ]);
    
    // Navigation menu state
    const menuItems = [
        { icon: User, label: t('components.drawer.navigation.profile'), badge: null },
        { icon: Bell, label: t('components.drawer.navigation.notifications'), badge: '3' },
        { icon: Settings, label: t('components.drawer.navigation.settings'), badge: null },
        { icon: Mail, label: t('components.drawer.navigation.messages'), badge: '12' },
        { icon: Phone, label: t('components.drawer.navigation.contact'), badge: null }
    ];

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    // Example codes for CodeExample components
    const basicDrawerCode = {
        frontend: `import { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function BasicDrawerExample() {
    const menuItems = [
        { icon: User, label: 'Profile', badge: null },
        { icon: Bell, label: 'Notifications', badge: '3' },
        { icon: Settings, label: 'Settings', badge: null },
        { icon: Mail, label: 'Messages', badge: '12' },
        { icon: Phone, label: 'Contact', badge: null }
    ]

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Menu className="mr-2 h-4 w-4" />
                    Open Menu
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Navigation Menu</DrawerTitle>
                    <DrawerDescription>
                        Access your account and app features
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Button
                                key={index}
                                variant="ghost"
                                className="w-full justify-between"
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <Badge variant="secondary">{item.badge}</Badge>
                                )}
                            </Button>
                        )
                    })}
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}`,
        backend: `// Controllers/NavigationController.cs
public class NavigationController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly INotificationService _notificationService;

    public NavigationController(UserManager<ApplicationUser> userManager, INotificationService notificationService)
    {
        _userManager = userManager;
        _notificationService = notificationService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var navigationData = await _notificationService.GetNavigationDataAsync(user.Id);

        return Inertia.Render("Navigation/Index", new { navigationData });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> LogNavigation([FromForm] NavigationLogRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _notificationService.LogNavigationAsync(user.Id, request.Section);
        
        return Inertia.Back().With("success", "Navegação registrada com sucesso!");
    }
}

// Models/NavigationLogRequest.cs
public class NavigationLogRequest
{
    public string Section { get; set; } = "";
    public DateTime AccessedAt { get; set; } = DateTime.UtcNow;
}`
    };

    const cartDrawerCode = {
        frontend: `import { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus } from 'lucide-react'

export function CartDrawerExample() {
    const [quantity, setQuantity] = useState(1)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Smartphone Pro Max', price: 999.99, image: '📱' },
        { id: 2, name: 'Wireless Headphones', price: 199.99, image: '🎧' },
        { id: 3, name: 'Smart Watch', price: 299.99, image: '⌚' }
    ])

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta))
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartItems.length})
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Shopping Cart</DrawerTitle>
                    <DrawerDescription>
                        Review your items before checkout
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{item.image}</span>
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        $\{item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleQuantityChange(-1)}>
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => handleQuantityChange(1)}>
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold">${getTotalPrice()}</span>
                    </div>
                </div>
                <DrawerFooter>
                    <Button>Proceed to Checkout</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Continue Shopping</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}`,
        backend: `// Controllers/CartController.cs
public class CartController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ICartService _cartService;

    public CartController(UserManager<ApplicationUser> userManager, ICartService cartService)
    {
        _userManager = userManager;
        _cartService = cartService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var cartItems = await _cartService.GetCartItemsAsync(user.Id);

        return Inertia.Render("Cart/Index", new { items = cartItems });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddToCart([FromForm] AddToCartRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _cartService.AddToCartAsync(user.Id, request.ProductId, request.Quantity);

        return Inertia.Back().With("success", "Item adicionado ao carrinho com sucesso!");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdateQuantity([FromForm] UpdateQuantityRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _cartService.UpdateQuantityAsync(user.Id, request.ItemId, request.Quantity);

        return Inertia.Back().With("success", "Quantidade atualizada com sucesso!");
    }
}

// Models/AddToCartRequest.cs
public class AddToCartRequest
{
    [Required]
    public int ProductId { get; set; }
    
    [Range(1, 100)]
    public int Quantity { get; set; } = 1;
}

// Models/UpdateQuantityRequest.cs
public class UpdateQuantityRequest
{
    [Required]
    public int ItemId { get; set; }
    
    [Range(1, 100)]
    public int Quantity { get; set; }
}`
    };

    const settingsDrawerCode = {
        frontend: `import { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings } from 'lucide-react'
import { router } from '@inertiajs/react'

export function SettingsDrawerExample() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true)
    const [emailFrequency, setEmailFrequency] = useState('daily')
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Software developer passionate about React and TypeScript.'
    })

    const handleSaveSettings = () => {
        // Using Inertia.js router to submit settings
        router.post('/settings/update', {
            notifications: notificationsEnabled,
            emailFrequency,
            profile
        }, {
            onSuccess: () => {
                // Success handled by controller redirect
            }
        })
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Account Settings</DrawerTitle>
                    <DrawerDescription>
                        Manage your account preferences and notifications
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                    {/* Profile Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Profile Information</h3>
                        <div className="space-y-3">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    rows={3}
                                    value={profile.bio}
                                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Preferences</h3>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notifications">Push Notifications</Label>
                            <Switch
                                id="notifications"
                                checked={notificationsEnabled}
                                onCheckedChange={setNotificationsEnabled}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Frequency</Label>
                            <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="never">Never</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <Button onClick={handleSaveSettings}>Save Changes</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}`,
        backend: `// Controllers/SettingsController.cs
public class SettingsController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ISettingsService _settingsService;

    public SettingsController(UserManager<ApplicationUser> userManager, ISettingsService settingsService)
    {
        _userManager = userManager;
        _settingsService = settingsService;
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
        await _settingsService.UpdateSettingsAsync(user.Id, request);

        return Inertia.Back().With("success", "Configurações atualizadas com sucesso!");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _settingsService.UpdateProfileAsync(user.Id, request);

        return Inertia.Back().With("success", "Perfil atualizado com sucesso!");
    }
}

// Models/UpdateSettingsRequest.cs
public class UpdateSettingsRequest
{
    public bool NotificationsEnabled { get; set; }
    public string EmailFrequency { get; set; } = "daily";
    public bool PushEnabled { get; set; }
}

// Models/UpdateProfileRequest.cs
public class UpdateProfileRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = "";
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
    
    [StringLength(500)]
    public string Bio { get; set; } = "";
}`
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Menu className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">{t('components.drawer.title')}</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                    {t('components.drawer.description')}
                </p>
            </div>

            {/* Navigation Drawer */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Menu className="h-5 w-5" />
                        <span>{t('components.drawer.navigation.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.drawer.navigation.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline">
                                    <Menu className="mr-2 h-4 w-4" />
                                    {t('components.drawer.navigation.openMenu')}
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>{t('components.drawer.navigation.drawerTitle')}</DrawerTitle>
                                    <DrawerDescription>
                                        {t('components.drawer.navigation.drawerDescription')}
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 space-y-2">
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <Button
                                                key={index}
                                                variant="ghost"
                                                className="w-full justify-between"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Icon className="h-5 w-5" />
                                                    <span>{item.label}</span>
                                                </div>
                                                {item.badge && (
                                                    <Badge variant="secondary">{item.badge}</Badge>
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="outline">{t('components.drawer.navigation.close')}</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </CardContent>
                <CodeExample code={basicDrawerCode} />
            </Card>

            {/* Shopping Cart Drawer */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span>{t('components.drawer.cart.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.drawer.cart.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {t('components.drawer.cart.openCart')} ({cartItems.length})
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>{t('components.drawer.cart.drawerTitle')}</DrawerTitle>
                                    <DrawerDescription>
                                        {t('components.drawer.cart.drawerDescription')}
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">{item.image}</span>
                                                <div>
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        $\{item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleQuantityChange(-1)}
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center">{quantity}</span>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleQuantityChange(1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-lg font-semibold">{t('components.drawer.cart.total')}:</span>
                                        <span className="text-lg font-bold">${getTotalPrice()}</span>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button>{t('components.drawer.cart.checkout')}</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">{t('components.drawer.cart.continueShopping')}</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </CardContent>
                <CodeExample code={cartDrawerCode} />
            </Card>

            {/* Settings Drawer */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>{t('components.drawer.settings.title')}</span>
                    </CardTitle>
                    <CardDescription>
                        {t('components.drawer.settings.description')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline">
                                    <Settings className="mr-2 h-4 w-4" />
                                    {t('components.drawer.settings.openSettings')}
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>{t('components.drawer.settings.drawerTitle')}</DrawerTitle>
                                    <DrawerDescription>
                                        {t('components.drawer.settings.drawerDescription')}
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                                    {/* Profile Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">{t('components.drawer.settings.profileInfo')}</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="drawer-name">{t('components.drawer.settings.name')}</Label>
                                                <Input id="drawer-name" defaultValue="João Silva" />
                                            </div>
                                            <div>
                                                <Label htmlFor="drawer-email">{t('components.drawer.settings.email')}</Label>
                                                <Input id="drawer-email" type="email" defaultValue="joao.silva@email.com" />
                                            </div>
                                            <div>
                                                <Label htmlFor="drawer-bio">{t('components.drawer.settings.bio')}</Label>
                                                <Textarea 
                                                    id="drawer-bio" 
                                                    rows={3} 
                                                    defaultValue="Desenvolvedor apaixonado por React e TypeScript."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Notifications Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">{t('components.drawer.settings.notifications')}</h3>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="drawer-notifications">{t('components.drawer.settings.pushNotifications')}</Label>
                                            <Button
                                                variant={notificationsEnabled ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                            >
                                                {notificationsEnabled ? t('components.drawer.settings.enabled') : t('components.drawer.settings.disabled')}
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>{t('components.drawer.settings.emailFrequency')}</Label>
                                            <div className="flex gap-2">
                                                {['never', 'daily', 'weekly', 'monthly'].map((freq) => (
                                                    <Button
                                                        key={freq}
                                                        variant={emailFrequency === freq ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setEmailFrequency(freq)}
                                                    >
                                                        {t(`components.drawer.settings.${freq}`)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button>{t('components.drawer.settings.save')}</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">{t('components.drawer.settings.cancel')}</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </CardContent>
                <CodeExample code={settingsDrawerCode} />
            </Card>
        </div>
    );
}