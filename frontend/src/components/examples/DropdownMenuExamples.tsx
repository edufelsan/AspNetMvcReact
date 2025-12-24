import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { ChevronDown, MoreHorizontal, User, Settings, LogOut, Bell, Plus, Edit, Trash2, Share, Download, Eye, Archive } from 'lucide-react';
import { CodeExample } from '../CodeExample';

export default function DropdownMenuExamples() {
    const { t } = useTranslation();

    // Mock user data
    const userData = {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        avatar: '',
        role: 'Developer'
    };

    // Mock document data
    const documentData = {
        id: 1,
        title: 'Project Documentation',
        status: 'Published',
        lastModified: '2 hours ago'
    };

    // Example codes for CodeExample components
    const basicDropdownCode = {
        frontend: `import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'

export function BasicDropdownExample() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Options
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}`,
        backend: `// Controllers/MenuController.cs
public class MenuController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMenuService _menuService;

    public MenuController(UserManager<ApplicationUser> userManager, IMenuService menuService)
    {
        _userManager = userManager;
        _menuService = menuService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var menuOptions = await _menuService.GetUserMenuOptionsAsync(user.Id);

        return Inertia.Render("Menu/Index", new { menuOptions });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SelectOption([FromForm] MenuActionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        
        return request.Action switch
        {
            "profile" => RedirectToAction("Index", "Profile"),
            "settings" => RedirectToAction("Index", "Settings"),
            "logout" => RedirectToAction("Logout", "Auth"),
            _ => Inertia.Back().With("error", "Ação inválida")
        };
    }
}

// Models/MenuActionRequest.cs
public class MenuActionRequest
{
    [Required]
    public string Action { get; set; } = "";
    public string MenuType { get; set; } = "";
}`
    };

    const userProfileDropdownCode = {
        frontend: `import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Settings, Bell, LogOut, CreditCard } from 'lucide-react'

export function UserProfileDropdownExample() {
    const user = {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        avatar: '',
        role: 'Developer'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <Badge variant="secondary" className="w-fit mt-1">{user.role}</Badge>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}`,
        backend: `// Controllers/UserProfileController.cs
public class UserProfileController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IProfileService _profileService;
    private readonly IBillingService _billingService;

    public UserProfileController(
        UserManager<ApplicationUser> userManager, 
        IProfileService profileService,
        IBillingService billingService)
    {
        _userManager = userManager;
        _profileService = profileService;
        _billingService = billingService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var profileData = await _profileService.GetProfileDataAsync(user.Id);

        return Inertia.Render("UserProfile/Index", new { profileData });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> HandleAction([FromForm] ProfileActionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        
        return request.Action switch
        {
            "profile" => RedirectToAction("Edit", "Profile"),
            "billing" => RedirectToAction("Index", "Billing"),
            "settings" => RedirectToAction("Account", "Settings"),
            "notifications" => RedirectToAction("Notifications", "Settings"),
            "logout" => await LogoutAsync(),
            _ => Inertia.Back().With("error", "Ação não encontrada")
        };
    }

    private async Task<IActionResult> LogoutAsync()
    {
        await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
        return RedirectToAction("Index", "Home");
    }
}

// Models/ProfileActionRequest.cs
public class ProfileActionRequest
{
    [Required]
    public string Action { get; set; } = "";
    public string RedirectUrl { get; set; } = "";
}`
    };

    const actionsDropdownCode = {
        frontend: `import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Trash2, Share, Download, Eye, Archive, Plus } from 'lucide-react'

export function ActionsDropdownExample() {
    const document = {
        id: 1,
        title: 'Project Documentation',
        status: 'Published'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                    <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Invite collaborator
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Copy link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Export as PDF
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                    <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}`,
        backend: `// Controllers/DocumentActionsController.cs
public class DocumentActionsController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IDocumentService _documentService;
    private readonly IShareService _shareService;

    public DocumentActionsController(
        UserManager<ApplicationUser> userManager, 
        IDocumentService documentService,
        IShareService shareService)
    {
        _userManager = userManager;
        _documentService = documentService;
        _shareService = shareService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> View(int documentId)
    {
        var user = await _userManager.GetUserAsync(User);
        var document = await _documentService.GetDocumentAsync(documentId, user.Id);
        
        if (document == null)
        {
            return Inertia.Back().With("error", "Documento não encontrado");
        }

        return Inertia.Render("Documents/View", new { document });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ExecuteAction([FromForm] DocumentActionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        
        return request.Action switch
        {
            "view" => RedirectToAction("View", new { documentId = request.DocumentId }),
            "edit" => RedirectToAction("Edit", new { documentId = request.DocumentId }),
            "share" => await ShareDocumentAsync(request.DocumentId, user.Id),
            "download" => await DownloadDocumentAsync(request.DocumentId, user.Id),
            "archive" => await ArchiveDocumentAsync(request.DocumentId, user.Id),
            "delete" => await DeleteDocumentAsync(request.DocumentId, user.Id),
            _ => Inertia.Back().With("error", "Ação inválida")
        };
    }

    private async Task<IActionResult> ShareDocumentAsync(int documentId, string userId)
    {
        await _shareService.CreateShareLinkAsync(documentId, userId);
        return Inertia.Back().With("success", "Link de compartilhamento criado!");
    }

    private async Task<IActionResult> DownloadDocumentAsync(int documentId, string userId)
    {
        var fileData = await _documentService.GenerateDownloadAsync(documentId, userId);
        return File(fileData.Content, fileData.ContentType, fileData.FileName);
    }

    private async Task<IActionResult> ArchiveDocumentAsync(int documentId, string userId)
    {
        await _documentService.ArchiveAsync(documentId, userId);
        return Inertia.Back().With("success", "Documento arquivado com sucesso!");
    }

    private async Task<IActionResult> DeleteDocumentAsync(int documentId, string userId)
    {
        await _documentService.DeleteAsync(documentId, userId);
        return Inertia.Back().With("success", "Documento excluído com sucesso!");
    }
}

// Models/DocumentActionRequest.cs
public class DocumentActionRequest
{
    [Required]
    public int DocumentId { get; set; }
    
    [Required]
    public string Action { get; set; } = "";
    
    public string ShareEmail { get; set; } = "";
    public string ShareMessage { get; set; } = "";
}`
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <ChevronDown className="h-6 w-6 text-primary" />
                    <h1 className="text-3xl font-bold">{t('components.dropdownMenu.title')}</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                    {t('components.dropdownMenu.description')}
                </p>
            </div>

            {/* Basic Dropdown Menu */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{t('components.dropdownMenu.basic.title')}</h2>
                        <p className="text-muted-foreground mb-4">{t('components.dropdownMenu.basic.description')}</p>
                    </div>
                    
                    <div className="border rounded-lg p-6 bg-card">
                        <div className="flex gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        {t('components.dropdownMenu.basic.options')}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{t('components.dropdownMenu.basic.myAccount')}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.basic.profile')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.basic.settings')}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.basic.logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <CodeExample code={basicDropdownCode} />
            </Card>

            {/* User Profile Dropdown */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{t('components.dropdownMenu.userProfile.title')}</h2>
                        <p className="text-muted-foreground mb-4">{t('components.dropdownMenu.userProfile.description')}</p>
                    </div>
                    
                    <div className="border rounded-lg p-6 bg-card">
                        <div className="flex gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={userData.avatar} alt={userData.name} />
                                            <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{userData.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                                            <Badge variant="secondary" className="w-fit mt-1">{userData.role}</Badge>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.userProfile.profile')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.userProfile.settings')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.userProfile.notifications')}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.userProfile.logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex items-center text-sm text-muted-foreground">
                                {t('components.dropdownMenu.userProfile.clickAvatar')}
                            </div>
                        </div>
                    </div>
                </div>
                <CodeExample code={userProfileDropdownCode} />
            </Card>

            {/* Actions Dropdown Menu */}
            <Card className="p-6">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{t('components.dropdownMenu.actions.title')}</h2>
                        <p className="text-muted-foreground mb-4">{t('components.dropdownMenu.actions.description')}</p>
                    </div>
                    
                    <div className="border rounded-lg p-6 bg-card">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                            <div>
                                <h4 className="font-medium">{documentData.title}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline">{documentData.status}</Badge>
                                    <span className="text-sm text-muted-foreground">{documentData.lastModified}</span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{t('components.dropdownMenu.actions.documentActions')}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.actions.view')}
                                        <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.actions.edit')}
                                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <Share className="mr-2 h-4 w-4" />
                                            {t('components.dropdownMenu.actions.share')}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <Plus className="mr-2 h-4 w-4" />
                                                {t('components.dropdownMenu.actions.inviteCollaborator')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                {t('components.dropdownMenu.actions.copyLink')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                {t('components.dropdownMenu.actions.exportPdf')}
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        <Download className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.actions.download')}
                                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Archive className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.actions.archive')}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        {t('components.dropdownMenu.actions.delete')}
                                        <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <CodeExample code={actionsDropdownCode} />
            </Card>
        </div>
    );
}