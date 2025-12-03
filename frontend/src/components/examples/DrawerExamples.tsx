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
        backend: `// CartController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AspNetMvcReact.Models;
using InertiaCore;

[Authorize]
public class CartController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ILogger<CartController> _logger;

    public CartController(
        UserManager<ApplicationUser> userManager,
        ILogger<CartController> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // Mock cart data - in real app, get from database
        var cartItems = new[]
        {
            new { Id = 1, Name = "Wireless Headphones", Price = 199.99m, Quantity = 1 },
            new { Id = 2, Name = "Smartphone Case", Price = 29.99m, Quantity = 2 }
        };

        return Inertia.Render("Cart/Index", new { items = cartItems });
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // In real app, add to database
        _logger.LogInformation($"Added item {request.ProductId} to cart for user {user.Id}");

        return RedirectToAction("Index", new { 
            success = "Item added to cart successfully" 
        });
    }

    [HttpPost]
    public async Task<IActionResult> UpdateQuantity([FromBody] UpdateQuantityRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // In real app, update in database
        _logger.LogInformation($"Updated item {request.ItemId} quantity to {request.Quantity}");

        return RedirectToAction("Index");
    }
}

public class AddToCartRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class UpdateQuantityRequest
{
    public int ItemId { get; set; }
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
        backend: `// SettingsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using AspNetMvcReact.Models;
using InertiaCore;

[Authorize]
public class SettingsController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmailService _emailService;
    private readonly ILogger<SettingsController> _logger;

    public SettingsController(
        UserManager<ApplicationUser> userManager,
        IEmailService emailService,
        ILogger<SettingsController> logger)
    {
        _userManager = userManager;
        _emailService = emailService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        var settings = new
        {
            Profile = new { user.FirstName, user.LastName, user.Email },
            Notifications = new { EmailEnabled = true, PushEnabled = false }
        };

        return Inertia.Render("Settings/Index", new { settings });
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Email = request.Email;

        var result = await _userManager.UpdateAsync(user);
        
        if (result.Succeeded)
        {
            return RedirectToAction("Index", new { 
                success = "Profile updated successfully" 
            });
        }

        return Inertia.Render("Settings/Index", new {
            errors = result.Errors
        });
    }
}

public class UpdateProfileRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class NotificationSettingsRequest
{
    public bool EmailEnabled { get; set; }
    public bool PushEnabled { get; set; }
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