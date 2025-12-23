import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Download, 
    Mail, 
    Heart, 
    Share2, 
    Settings, 
    Trash2, 
    Plus,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CodeExample } from '@/components/CodeExample';

interface ExampleSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
    code?: {
        frontend?: string;
        backend?: string;
    };
}

function ExampleSection({ title, description, children, code }: ExampleSectionProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
                    {children}
                </div>
                {code && <CodeExample code={code} />}
            </CardContent>
        </Card>
    );
}

export function ButtonExamples() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAsyncAction = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        toast({
            title: "Action completed!",
            description: "The async operation has finished successfully.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">{t('components.button.title')}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.button.description')}
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary">8 Examples</Badge>
                    <Badge variant="outline">Interactive</Badge>
                </div>
            </div>

            <div className="grid gap-8">
                {/* Variants */}
                <ExampleSection
                    title={t('components.button.variants.title')}
                    description="Different visual styles for various use cases"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";

export function ButtonVariants() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
    );
}`,
                        backend: `// Controllers/ItemsController.cs
public class ItemsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IItemService _itemService;

    public ItemsController(ApplicationDbContext context, IItemService itemService)
    {
        _context = context;
        _itemService = itemService;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Save([FromForm] SaveItemRequest request)
    {
        var item = new Item 
        { 
            Name = request.Name, 
            Description = request.Description,
            UserId = User.Identity.Name,
            CreatedAt = DateTime.UtcNow
        };
        
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
        
        return Inertia.Back().With("success", "Item saved successfully!");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return Inertia.Back().With("error", "Item not found");
        
        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        
        return Inertia.Back().With("success", "Item deleted successfully!");
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();
        
        return Inertia.Render("Items/Edit", new { item });
    }
}

// Models/SaveItemRequest.cs
public class SaveItemRequest
{
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button variant="default">{t('components.button.variants.default')}</Button>
                        <Button variant="secondary">{t('components.button.variants.secondary')}</Button>
                        <Button variant="destructive">{t('components.button.variants.destructive')}</Button>
                        <Button variant="outline">{t('components.button.variants.outline')}</Button>
                        <Button variant="ghost">{t('components.button.variants.ghost')}</Button>
                        <Button variant="link">{t('components.button.variants.link')}</Button>
                    </div>
                </ExampleSection>

                {/* Sizes */}
                <ExampleSection
                    title={t('components.button.sizes.title')}
                    description="Different sizes for various UI contexts"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function ButtonSizes() {
    return (
        <div className="flex items-center flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
                <Settings className="h-4 w-4" />
            </Button>
        </div>
    );
}`,
                        backend: `// Controllers/DashboardController.cs
public class DashboardController : Controller
{
    private readonly IDashboardService _dashboardService;
    private readonly IDeviceDetectionService _deviceService;

    public DashboardController(IDashboardService dashboardService, IDeviceDetectionService deviceService)
    {
        _dashboardService = dashboardService;
        _deviceService = deviceService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var userAgent = Request.Headers["User-Agent"].ToString();
        var deviceInfo = _deviceService.GetDeviceInfo(userAgent);
        
        var uiConfig = new UIConfigModel
        {
            ButtonSize = deviceInfo.IsMobile ? "sm" : "default",
            IconSize = deviceInfo.IsMobile ? "h-3 w-3" : "h-4 w-4",
            IsMobile = deviceInfo.IsMobile,
            IsTablet = deviceInfo.IsTablet
        };
        
        var dashboardData = await _dashboardService.GetUserDashboardAsync(User.Identity.Name);
        
        return Inertia.Render("Dashboard/Index", new { 
            data = dashboardData,
            uiConfig
        });
    }
}

// Models/UIConfigModel.cs
public class UIConfigModel
{
    public string ButtonSize { get; set; } = "default";
    public string IconSize { get; set; } = "h-4 w-4";
    public bool IsMobile { get; set; }
    public bool IsTablet { get; set; }
}`
                    }}
                >
                    <div className="flex items-center flex-wrap gap-3">
                        <Button size="sm">{t('components.button.sizes.small')}</Button>
                        <Button size="default">{t('components.button.sizes.default')}</Button>
                        <Button size="lg">{t('components.button.sizes.large')}</Button>
                        <Button size="icon" title={t('components.button.sizes.icon')}>
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </ExampleSection>

                {/* With Icons */}
                <ExampleSection
                    title={t('components.button.withIcon.title')}
                    description="Enhance buttons with Lucide React icons"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";
import { Mail, Download, Share2, Trash2 } from "lucide-react";

export function IconButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
            </Button>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
            </Button>
            <Button variant="secondary">
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
            <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>
        </div>
    );
}`,
                        backend: `// Controllers/CommunicationController.cs
public class CommunicationController : Controller
{
    private readonly IEmailService _emailService;
    private readonly IFileService _fileService;
    private readonly IShareService _shareService;
    private readonly ApplicationDbContext _context;

    public CommunicationController(
        IEmailService emailService,
        IFileService fileService, 
        IShareService shareService,
        ApplicationDbContext context)
    {
        _emailService = emailService;
        _fileService = fileService;
        _shareService = shareService;
        _context = context;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SendEmail([FromForm] EmailRequest request)
    {
        try
        {
            await _emailService.SendAsync(request.To, request.Subject, request.Body);
            return Inertia.Back().With("success", "Email sent successfully!");
        }
        catch (Exception ex)
        {
            return Inertia.Back().With("error", $"Failed to send email: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<IActionResult> DownloadFile(int id)
    {
        var file = await _context.Files.FindAsync(id);
        if (file == null) return NotFound();
        
        var fileBytes = await _fileService.GetFileAsync(file.Path);
        return File(fileBytes, file.ContentType, file.Name);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ShareItem(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return Inertia.Back().With("error", "Item not found");
        
        var shareLink = await _shareService.CreateShareLinkAsync(item);
        return Inertia.Back().With("success", "Share link created!").With("shareLink", shareLink);
    }
}

// Models/EmailRequest.cs
public class EmailRequest
{
    public string To { get; set; } = "";
    public string Subject { get; set; } = "";
    public string Body { get; set; } = "";
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        <Button variant="secondary">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </ExampleSection>

                {/* Loading State */}
                <ExampleSection
                    title="Loading States"
                    description="Show loading indicators for async operations"
                    code={{
                        frontend: `import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function LoadingButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleAsyncAction = async () => {
        setIsLoading(true);
        
        // In real app: router.post('/process', {}, { onFinish: () => setIsLoading(false) });
        setTimeout(() => setIsLoading(false), 2000); // Simulate async operation
    };

    return (
        <Button disabled={isLoading} onClick={handleAsyncAction}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Processing...' : 'Start Process'}
        </Button>
    );
}`,
                        backend: `// Controllers/ProcessingController.cs
public class ProcessingController : Controller
{
    private readonly IBackgroundJobService _backgroundJobService;
    private readonly IDataService _dataService;
    private readonly ILogger<ProcessingController> _logger;

    public ProcessingController(
        IBackgroundJobService backgroundJobService,
        IDataService dataService,
        ILogger<ProcessingController> logger)
    {
        _backgroundJobService = backgroundJobService;
        _dataService = dataService;
        _logger = logger;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> StartProcess([FromForm] ProcessDataRequest request)
    {
        try
        {
            var jobId = await _backgroundJobService.EnqueueAsync(async () => 
            {
                await _dataService.ProcessAsync(request.Data, request.ProcessType);
            });
            
            return Inertia.Back().With("success", "Processing started! You'll be notified when complete.")
                                .With("jobId", jobId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error starting data processing");
            return Inertia.Back().With("error", "Failed to start processing. Please try again.");
        }
    }

    [HttpGet]
    public async Task<IActionResult> Status(string jobId)
    {
        var status = await _backgroundJobService.GetStatusAsync(jobId);
        var progress = await _backgroundJobService.GetProgressAsync(jobId);
        
        return Inertia.Render("Processing/Status", new { 
            jobId,
            status,
            progress,
            isComplete = status == "Completed"
        });
    }
}

// Models/ProcessDataRequest.cs
public class ProcessDataRequest
{
    public string Data { get; set; } = "";
    public string ProcessType { get; set; } = "default";
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button disabled={isLoading} onClick={handleAsyncAction}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Loading...' : 'Start Process'}
                        </Button>
                        <Button variant="outline" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing
                        </Button>
                    </div>
                </ExampleSection>

                {/* Icon Only */}
                <ExampleSection
                    title="Icon-Only Buttons"
                    description="Compact buttons with just icons"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";
import { Heart, Settings, Plus } from "lucide-react";

export function IconOnlyButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button size="icon" variant="outline">
                <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
                <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}`,
                        backend: `// Controllers/UserActionsController.cs
public class UserActionsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserActionsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ToggleFavorite(int itemId)
    {
        var user = await _userManager.GetUserAsync(User);
        var favorite = await _context.Favorites
            .FirstOrDefaultAsync(f => f.UserId == user.Id && f.ItemId == itemId);
        
        if (favorite == null)
        {
            _context.Favorites.Add(new Favorite { UserId = user.Id, ItemId = itemId });
            await _context.SaveChangesAsync();
            return Inertia.Back().With("success", "Added to favorites!");
        }
        else
        {
            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();
            return Inertia.Back().With("success", "Removed from favorites!");
        }
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Settings()
    {
        var user = await _userManager.GetUserAsync(User);
        var userSettings = await _context.UserSettings
            .FirstOrDefaultAsync(us => us.UserId == user.Id);
        
        return Inertia.Render("User/Settings", new { 
            user,
            settings = userSettings ?? new UserSettings()
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddItem([FromForm] AddItemRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        var item = new Item 
        { 
            Name = request.Name,
            UserId = user.Id,
            CreatedAt = DateTime.UtcNow
        };
        
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
        
        return Inertia.Back().With("success", "Item added successfully!");
    }
}

// Models/AddItemRequest.cs
public class AddItemRequest
{
    public string Name { get; set; } = "";
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button size="icon" variant="outline">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary">
                            <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </ExampleSection>

                {/* Disabled State */}
                <ExampleSection
                    title="Disabled Buttons"
                    description="Non-interactive button states"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";

export function DisabledButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled Default</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
    );
}`,
                        backend: `// Controllers/PermissionsController.cs
public class PermissionsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IPermissionService _permissionService;
    private readonly UserManager<ApplicationUser> _userManager;

    public PermissionsController(
        ApplicationDbContext context, 
        IPermissionService permissionService,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _permissionService = permissionService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> ItemList()
    {
        var user = await _userManager.GetUserAsync(User);
        var items = await _context.Items.ToListAsync();
        
        var permissions = new PermissionsModel
        {
            CanDelete = await _permissionService.HasPermissionAsync(user.Id, "DELETE_ITEMS"),
            CanEdit = await _permissionService.HasPermissionAsync(user.Id, "EDIT_ITEMS"),
            CanCreate = await _permissionService.HasPermissionAsync(user.Id, "CREATE_ITEMS"),
            CanView = await _permissionService.HasPermissionAsync(user.Id, "VIEW_ITEMS")
        };
        
        return Inertia.Render("Items/List", new { 
            items,
            permissions,
            user
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CheckPermission([FromForm] string action)
    {
        var user = await _userManager.GetUserAsync(User);
        var hasPermission = await _permissionService.HasPermissionAsync(user.Id, action);
        
        if (!hasPermission)
        {
            return Inertia.Back().With("error", "You don't have permission to perform this action.");
        }
        
        return Inertia.Back().With("success", "Permission granted!");
    }
}

// Models/PermissionsModel.cs
public class PermissionsModel
{
    public bool CanDelete { get; set; }
    public bool CanEdit { get; set; }
    public bool CanCreate { get; set; }
    public bool CanView { get; set; }
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button disabled>Disabled Default</Button>
                        <Button variant="secondary" disabled>Disabled Secondary</Button>
                        <Button variant="outline" disabled>Disabled Outline</Button>
                        <Button variant="destructive" disabled>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Disabled Destructive
                        </Button>
                    </div>
                </ExampleSection>

                {/* Button Groups */}
                <ExampleSection
                    title="Button Groups"
                    description="Related buttons grouped together"
                    code={{
                        frontend: `import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ButtonGroups() {
    const [selected, setSelected] = useState('second');
    
    return (
        <div className="space-y-4">
            <div className="flex rounded-md shadow-sm">
                <Button 
                    variant={selected === 'first' ? 'default' : 'outline'}
                    className="rounded-r-none"
                    onClick={() => setSelected('first')}
                >
                    First
                </Button>
                <Button 
                    variant={selected === 'second' ? 'default' : 'outline'}
                    className="rounded-none border-l-0"
                    onClick={() => setSelected('second')}
                >
                    Second
                </Button>
                <Button 
                    variant={selected === 'third' ? 'default' : 'outline'}
                    className="rounded-l-none border-l-0"
                    onClick={() => setSelected('third')}
                >
                    Third
                </Button>
            </div>
        </div>
    );
}`,
                        backend: `// Controllers/AnalyticsController.cs
public class AnalyticsController : Controller
{
    private readonly IAnalyticsService _analyticsService;
    private readonly IUserPreferenceService _preferenceService;
    private readonly UserManager<ApplicationUser> _userManager;

    public AnalyticsController(
        IAnalyticsService analyticsService, 
        IUserPreferenceService preferenceService,
        UserManager<ApplicationUser> userManager)
    {
        _analyticsService = analyticsService;
        _preferenceService = preferenceService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index([FromQuery] string period = "months")
    {
        var data = period switch
        {
            "years" => await _analyticsService.GetYearlyDataAsync(),
            "months" => await _analyticsService.GetMonthlyDataAsync(),
            "days" => await _analyticsService.GetDailyDataAsync(),
            _ => await _analyticsService.GetMonthlyDataAsync()
        };
        
        var availablePeriods = new[] { "years", "months", "days" };
        
        return Inertia.Render("Analytics/Index", new { 
            data,
            selectedPeriod = period,
            periods = availablePeriods
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SavePreference([FromForm] UserPreferenceRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        await _preferenceService.SavePreferenceAsync(user.Id, request.Key, request.Value);
        
        return Inertia.Back().With("success", "Preference saved successfully!");
    }
}

// Models/UserPreferenceRequest.cs
public class UserPreferenceRequest
{
    public string Key { get; set; } = ""; // "analytics_period"
    public string Value { get; set; } = ""; // "years", "months", "days"
}`
                    }}
                >
                    <div className="space-y-4">
                        <div className="flex rounded-md shadow-sm">
                            <Button variant="outline" className="rounded-r-none">
                                First
                            </Button>
                            <Button variant="outline" className="rounded-none border-l-0">
                                Second
                            </Button>
                            <Button variant="outline" className="rounded-l-none border-l-0">
                                Third
                            </Button>
                        </div>
                        
                        <div className="flex space-x-2">
                            <Button variant="outline">
                                <Heart className="mr-2 h-4 w-4" />
                                Like
                            </Button>
                            <Button variant="outline">
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                            <Button variant="outline">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit
                            </Button>
                        </div>
                    </div>
                </ExampleSection>

                {/* As Link */}
                <ExampleSection
                    title="Button as Link"
                    description="Buttons that function as navigation links"
                    code={{
                        frontend: `import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function LinkButtons() {
    return (
        <div className="flex flex-wrap gap-3">
            <Button variant="link" className="p-0">
                Learn More
            </Button>
            <Button variant="ghost">
                <ExternalLink className="mr-2 h-4 w-4" />
                External Link
            </Button>
        </div>
    );
}`,
                        backend: `// Controllers/ContentController.cs
public class ContentController : Controller
{
    private readonly IContentService _contentService;
    private readonly IAnalyticsService _analyticsService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ContentController(
        IContentService contentService, 
        IAnalyticsService analyticsService,
        UserManager<ApplicationUser> userManager)
    {
        _contentService = contentService;
        _analyticsService = analyticsService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> TermsOfService()
    {
        var terms = await _contentService.GetTermsAsync();
        var lastUpdated = await _contentService.GetLastUpdatedAsync("terms");
        
        return Inertia.Render("Legal/TermsOfService", new { 
            terms,
            lastUpdated
        });
    }

    [HttpGet]
    public async Task<IActionResult> LearnMore()
    {
        var content = await _contentService.GetPageContentAsync("learn-more");
        var relatedArticles = await _contentService.GetRelatedArticlesAsync("learn-more");
        
        return Inertia.Render("Content/LearnMore", new { 
            content,
            relatedArticles
        });
    }

    [HttpPost]
    public async Task<IActionResult> TrackLinkClick([FromForm] LinkClickRequest request)
    {
        var userId = User.Identity.IsAuthenticated 
            ? (await _userManager.GetUserAsync(User))?.Id 
            : null;
            
        await _analyticsService.TrackEventAsync(new AnalyticsEvent
        {
            EventType = "link_click",
            Url = request.Url,
            Page = request.SourcePage,
            UserId = userId,
            Timestamp = DateTime.UtcNow
        });
        
        return Inertia.Back();
    }
}

// Models/LinkClickRequest.cs
public class LinkClickRequest
{
    public string Url { get; set; } = "";
    public string SourcePage { get; set; } = "";
}`
                    }}
                >
                    <div className="flex flex-wrap gap-3">
                        <Button variant="link" className="p-0">
                            Learn More
                        </Button>
                        <Button variant="ghost">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            External Link
                        </Button>
                        <Button variant="outline">
                            Go to Dashboard
                        </Button>
                    </div>
                </ExampleSection>
            </div>
        </div>
    );
}