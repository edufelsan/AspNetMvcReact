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
                        backend: `[HttpPost("save-item")]
public async Task<IActionResult> SaveItem([FromForm] SaveItemRequest request)
{
    var item = new Item { Name = request.Name, Description = request.Description };
    await _context.Items.AddAsync(item);
    await _context.SaveChangesAsync();
    
    return Inertia.Back(new { success = "Item saved successfully!" });
}

[HttpDelete("delete-item/{id}")]
public async Task<IActionResult> DeleteItem(int id)
{
    var item = await _context.Items.FindAsync(id);
    if (item == null) return Inertia.Back(new { error = "Item not found" });
    
    _context.Items.Remove(item);
    await _context.SaveChangesAsync();
    
    return Inertia.Back(new { success = "Item deleted successfully!" });
}

[HttpGet("edit-item/{id}")]
public async Task<IActionResult> EditItem(int id)
{
    var item = await _context.Items.FindAsync(id);
    if (item == null) return NotFound();
    
    return Inertia.Render("EditItem", new { item });
}

public class SaveItemRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
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
                        backend: `[HttpGet("dashboard")]
public async Task<IActionResult> Dashboard()
{
    var userAgent = Request.Headers["User-Agent"].ToString();
    var isMobile = IsMobileDevice(userAgent);
    
    var uiConfig = new UIConfig
    {
        ButtonSize = isMobile ? "sm" : "default",
        IconSize = isMobile ? "h-3 w-3" : "h-4 w-4",
        IsMobile = isMobile
    };
    
    var dashboardData = await _dashboardService.GetDataAsync();
    
    return Inertia.Render("Dashboard", new { 
        data = dashboardData,
        uiConfig = uiConfig
    });
}

public class UIConfig
{
    public string ButtonSize { get; set; }
    public string IconSize { get; set; }
    public bool IsMobile { get; set; }
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
                        backend: `[HttpPost("send-email")]
public async Task<IActionResult> SendEmail([FromForm] EmailRequest request)
{
    try
    {
        await _emailService.SendAsync(request.To, request.Subject, request.Body);
        return Inertia.Back(new { success = "Email sent successfully!" });
    }
    catch (Exception ex)
    {
        return Inertia.Back(new { error = $"Failed to send email: {ex.Message}" });
    }
}

[HttpPost("download-file/{id}")]
public async Task<IActionResult> DownloadFile(int id)
{
    var file = await _context.Files.FindAsync(id);
    if (file == null) return Inertia.Back(new { error = "File not found" });
    
    var fileBytes = await _fileService.GetFileAsync(file.Path);
    return File(fileBytes, file.ContentType, file.Name);
}

[HttpPost("share-item/{id}")]
public async Task<IActionResult> ShareItem(int id)
{
    var item = await _context.Items.FindAsync(id);
    if (item == null) return Inertia.Back(new { error = "Item not found" });
    
    var shareLink = await _shareService.CreateShareLinkAsync(item);
    return Inertia.Back(new { success = "Share link created!", shareLink });
}

public class EmailRequest
{
    public string To { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
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
        try {
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            // Handle response
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button disabled={isLoading} onClick={handleAsyncAction}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Processing...' : 'Start Process'}
        </Button>
    );
}`,
                        backend: `[HttpPost("process-data")]
public async Task<IActionResult> ProcessData([FromForm] ProcessDataRequest request)
{
    try
    {
        // Start background job for long-running operation
        var jobId = await _backgroundJobService.EnqueueAsync(async () => 
        {
            await _dataService.ProcessAsync(request.Data);
        });
        
        return Inertia.Back(new { 
            success = "Processing started! You'll be notified when complete.",
            jobId = jobId
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error starting data processing");
        return Inertia.Back(new { 
            error = "Failed to start processing. Please try again." 
        });
    }
}

[HttpGet("process-status/{jobId}")]
public async Task<IActionResult> GetProcessStatus(string jobId)
{
    var status = await _backgroundJobService.GetStatusAsync(jobId);
    
    return Inertia.Render("ProcessStatus", new { 
        jobId = jobId,
        status = status,
        isComplete = status == "Completed"
    });
}

public class ProcessDataRequest
{
    public string Data { get; set; }
    public string ProcessType { get; set; }
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
                        backend: `[HttpPost("toggle-favorite/{itemId}")]
public async Task<IActionResult> ToggleFavorite(int itemId)
{
    var userId = GetCurrentUserId();
    var favorite = await _context.Favorites
        .FirstOrDefaultAsync(f => f.UserId == userId && f.ItemId == itemId);
    
    if (favorite == null)
    {
        _context.Favorites.Add(new Favorite { UserId = userId, ItemId = itemId });
        await _context.SaveChangesAsync();
        return Inertia.Back(new { success = "Added to favorites!" });
    }
    else
    {
        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
        return Inertia.Back(new { success = "Removed from favorites!" });
    }
}

[HttpGet("settings")]
public async Task<IActionResult> Settings()
{
    var user = await GetCurrentUserAsync();
    var userSettings = await _context.UserSettings
        .FirstOrDefaultAsync(us => us.UserId == user.Id);
    
    return Inertia.Render("Settings", new { 
        user = user,
        settings = userSettings ?? new UserSettings()
    });
}

[HttpPost("add-item")]
public async Task<IActionResult> AddItem([FromForm] AddItemRequest request)
{
    var item = new Item 
    { 
        Name = request.Name,
        UserId = GetCurrentUserId(),
        CreatedAt = DateTime.UtcNow
    };
    
    await _context.Items.AddAsync(item);
    await _context.SaveChangesAsync();
    
    return Inertia.Back(new { success = "Item added successfully!" });
}

public class AddItemRequest
{
    public string Name { get; set; }
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
                        backend: `[HttpGet("item-list")]
public async Task<IActionResult> ItemList()
{
    var user = await GetCurrentUserAsync();
    var items = await _context.Items.ToListAsync();
    
    var permissions = new PermissionsModel
    {
        CanDelete = await _permissionService.HasPermissionAsync(user.Id, "DELETE_ITEMS"),
        CanEdit = await _permissionService.HasPermissionAsync(user.Id, "EDIT_ITEMS"),
        CanCreate = await _permissionService.HasPermissionAsync(user.Id, "CREATE_ITEMS")
    };
    
    return Inertia.Render("ItemList", new { 
        items = items,
        permissions = permissions,
        user = user
    });
}

[HttpPost("check-permissions")]
public async Task<IActionResult> CheckPermissions([FromForm] string action)
{
    var user = await GetCurrentUserAsync();
    var hasPermission = await _permissionService.HasPermissionAsync(user.Id, action);
    
    if (!hasPermission)
    {
        return Inertia.Back(new { error = "You don't have permission to perform this action." });
    }
    
    return Inertia.Back(new { success = "Permission granted!" });
}

public class PermissionsModel
{
    public bool CanDelete { get; set; }
    public bool CanEdit { get; set; }
    public bool CanCreate { get; set; }
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
                        backend: `[HttpGet("analytics")]
public async Task<IActionResult> Analytics([FromQuery] string period = "months")
{
    var data = period switch
    {
        "years" => await _analyticsService.GetYearlyDataAsync(),
        "months" => await _analyticsService.GetMonthlyDataAsync(),
        "days" => await _analyticsService.GetDailyDataAsync(),
        _ => await _analyticsService.GetMonthlyDataAsync()
    };
    
    return Inertia.Render("Analytics", new { 
        data = data,
        selectedPeriod = period,
        periods = new[] { "years", "months", "days" }
    });
}

[HttpPost("save-user-preference")]
public async Task<IActionResult> SaveUserPreference([FromForm] UserPreferenceRequest request)
{
    var userId = GetCurrentUserId();
    var preference = await _context.UserPreferences
        .FirstOrDefaultAsync(up => up.UserId == userId && up.Key == request.Key);
    
    if (preference == null)
    {
        preference = new UserPreference 
        { 
            UserId = userId, 
            Key = request.Key, 
            Value = request.Value 
        };
        await _context.UserPreferences.AddAsync(preference);
    }
    else
    {
        preference.Value = request.Value;
        preference.UpdatedAt = DateTime.UtcNow;
    }
    
    await _context.SaveChangesAsync();
    
    return Inertia.Back(new { success = "Preference saved successfully!" });
}

public class UserPreferenceRequest
{
    public string Key { get; set; } // "analytics_period"
    public string Value { get; set; } // "years", "months", "days"
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
                        backend: `[HttpGet("terms-of-service")]
public async Task<IActionResult> TermsOfService()
{
    var terms = await _contentService.GetTermsAsync();
    var lastUpdated = await _contentService.GetLastUpdatedAsync("terms");
    
    return Inertia.Render("TermsOfService", new { 
        terms = terms,
        lastUpdated = lastUpdated
    });
}

[HttpGet("learn-more")]
public async Task<IActionResult> LearnMore()
{
    var content = await _contentService.GetPageContentAsync("learn-more");
    var relatedArticles = await _contentService.GetRelatedArticlesAsync("learn-more");
    
    return Inertia.Render("LearnMore", new { 
        content = content,
        relatedArticles = relatedArticles
    });
}

[HttpPost("track-link-click")]
public async Task<IActionResult> TrackLinkClick([FromForm] LinkClickRequest request)
{
    await _analyticsService.TrackEventAsync(new AnalyticsEvent
    {
        EventType = "link_click",
        Url = request.Url,
        Page = request.SourcePage,
        UserId = GetCurrentUserId(),
        Timestamp = DateTime.UtcNow
    });
    
    return Inertia.Back();
}

public class LinkClickRequest
{
    public string Url { get; set; }
    public string SourcePage { get; set; }
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