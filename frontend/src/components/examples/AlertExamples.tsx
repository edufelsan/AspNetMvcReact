import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    AlertTriangle, 
    CheckCircle2, 
    Info, 
    XCircle,
    AlertCircle,
    Lightbulb,
    X
} from 'lucide-react';

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

interface DismissibleAlertProps {
    children: React.ReactNode;
    className?: string;
}

function DismissibleAlert({ children, className }: DismissibleAlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className={`relative ${className}`}>
            {children}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setIsVisible(false)}
            >
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
}

export function AlertExamples() {
    const { t } = useTranslation();
    const [showTemporary, setShowTemporary] = useState(false);

    const showTemporaryAlert = () => {
        setShowTemporary(true);
        setTimeout(() => setShowTemporary(false), 3000);
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold">{t('components.alert.title')}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.alert.description')}
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <Badge variant="secondary">6 Examples</Badge>
                    <Badge variant="outline">Interactive</Badge>
                </div>
            </div>

            <div className="grid gap-8">
                {/* Basic Alerts */}
                <ExampleSection
                    title={t('components.alert.basicTypes.title')}
                    description={t('components.alert.basicTypes.description')}
                    code={{
                        frontend: `<Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Default Alert</AlertTitle>
    <AlertDescription>
        This is a default alert message.
    </AlertDescription>
</Alert>`
                    }}
                >
                    <div className="space-y-4">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{t('components.alert.basicTypes.defaultTitle')}</AlertTitle>
                            <AlertDescription>
                                {t('components.alert.basicTypes.defaultMessage')}
                            </AlertDescription>
                        </Alert>
                    </div>
                </ExampleSection>

                {/* Success Alerts */}
                <ExampleSection
                    title={t('components.alert.success.title')}
                    description={t('components.alert.success.description')}
                    code={{
                        frontend: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { usePage } from "@inertiajs/react";

export function SuccessAlert() {
    const { success } = usePage().props as any;
    
    if (!success) return null;
    
    return (
        <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
                {success}
            </AlertDescription>
        </Alert>
    );
}`,
                        backend: `// Controllers/ProfileController.cs
public class ProfileController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IFileService _fileService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ProfileController(
        ApplicationDbContext context, 
        IFileService fileService,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _fileService = fileService;
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Update([FromForm] ProfileRequest request)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            
            await _context.SaveChangesAsync();
            
            return Inertia.Back().With("success", "Profile updated successfully! Your changes are now live.");
        }
        catch (Exception ex)
        {
            return Inertia.Back().With("error", "Failed to update profile. Please try again.");
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return Inertia.Back().With("error", "Please select a file to upload.");
        
        var fileName = await _fileService.SaveFileAsync(file, User.Identity.Name);
        
        return Inertia.Back().With("success", $"File '{fileName}' uploaded successfully!");
    }
}

// Models/ProfileRequest.cs
public class ProfileRequest
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Email { get; set; } = "";
}`
                    }}
                >
                    <div className="space-y-4">
                        <Alert className="border-green-200 bg-green-50 text-green-800">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Success!</AlertTitle>
                            <AlertDescription className="text-green-700">
                                Your changes have been saved successfully.
                            </AlertDescription>
                        </Alert>
                        
                        <Alert className="border-green-200 bg-green-50 text-green-800">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700">
                                {t('components.alert.success.profileUpdated')}
                            </AlertDescription>
                        </Alert>
                    </div>
                </ExampleSection>

                {/* Warning Alerts */}
                <ExampleSection
                    title={t('components.alert.warning.title')}
                    description={t('components.alert.warning.description')}
                    code={{
                        frontend: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { usePage } from "@inertiajs/react";

export function WarningAlert() {
    const { warning } = usePage().props as any;
    
    if (!warning) return null;
    
    return (
        <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Warning</AlertTitle>
            <AlertDescription className="text-yellow-700">
                {warning}
            </AlertDescription>
        </Alert>
    );
}`,
                        backend: `// Controllers/ItemsController.cs
public class ItemsController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IValidationService _validationService;

    public ItemsController(ApplicationDbContext context, IValidationService validationService)
    {
        _context = context;
        _validationService = validationService;
    }

    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();
        
        return Inertia.Render("Items/Delete", new { 
            item,
            warning = "This action cannot be undone. Please proceed with caution."
        });
    }

    [HttpGet]
    [Authorize]
    public IActionResult CheckSession()
    {
        var sessionExpiry = HttpContext.Session.GetString("ExpiryTime");
        if (DateTime.TryParse(sessionExpiry, out var expiry))
        {
            var timeLeft = expiry - DateTime.UtcNow;
            if (timeLeft.TotalMinutes <= 5 && timeLeft.TotalMinutes > 0)
            {
                return Inertia.Back().With("warning", 
                    $"Your session will expire in {timeLeft.Minutes} minutes. Save your work to avoid losing changes.");
            }
        }
        
        return Inertia.Back();
    }

    [HttpPost]
    public async Task<IActionResult> ValidateData([FromForm] DataRequest request)
    {
        var validationResult = await _validationService.ValidateAsync(request);
        
        if (validationResult.HasWarnings)
        {
            return Inertia.Back().With("warning", "Data validation completed with warnings. Please review and confirm.")
                                .With("warnings", validationResult.Warnings);
        }
        
        return Inertia.Back().With("success", "Data validation passed successfully.");
    }
}`
                    }}
                >
                    <div className="space-y-4">
                        <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertTitle className="text-yellow-800">{t('components.alert.basicTypes.warningTitle')}</AlertTitle>
                            <AlertDescription className="text-yellow-700">
                                {t('components.alert.basicTypes.warningMessage')}
                            </AlertDescription>
                        </Alert>
                        
                        <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-700">
                                {t('components.alert.warning.unsavedChanges')}
                            </AlertDescription>
                        </Alert>
                    </div>
                </ExampleSection>

                {/* Error Alerts */}
                <ExampleSection
                    title={t('components.alert.error.title')}
                    description={t('components.alert.error.description')}
                    code={{
                        frontend: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import { usePage } from "@inertiajs/react";

export function ErrorAlert() {
    const { error, errors } = usePage().props as any;
    
    if (!error && !errors) return null;
    
    return (
        <Alert className="border-red-200 bg-red-50 text-red-800">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
                {error || "Please check the form errors below and try again."}
            </AlertDescription>
        </Alert>
    );
}`,
                        backend: `// Controllers/AuthController.cs  
public class AuthController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IDataService _dataService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        SignInManager<ApplicationUser> signInManager,
        IDataService dataService,
        ILogger<AuthController> logger)
    {
        _signInManager = signInManager;
        _dataService = dataService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromForm] LoginRequest request)
    {
        try
        {
            var result = await _signInManager.PasswordSignInAsync(
                request.Email, request.Password, request.RememberMe, false);
            
            if (result.Succeeded)
            {
                return Redirect("/Dashboard");
            }
            
            return Inertia.Back().With("error", "Authentication failed. Invalid username or password.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login error for user {Email}", request.Email);
            return Inertia.Back().With("error", "An unexpected error occurred. Please try again later.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> SaveData([FromForm] SaveDataRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            
            return Inertia.Back().With("error", "Please correct the errors below and try again.")
                                .With("errors", errors);
        }
        
        try
        {
            await _dataService.SaveAsync(request);
            return Inertia.Back().With("success", "Data saved successfully!");
        }
        catch (Exception ex)
        {
            return Inertia.Back().With("error", "Failed to save changes. Please check your connection and try again.");
        }
    }
}`
                    }}
                >
                    <div className="space-y-4">
                        <Alert className="border-red-200 bg-red-50 text-red-800">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-800">Error</AlertTitle>
                            <AlertDescription className="text-red-700">
                                {t('components.alert.error.saveError')}
                            </AlertDescription>
                        </Alert>
                        
                        <Alert className="border-red-200 bg-red-50 text-red-800">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">
                                {t('components.alert.error.authError')}
                            </AlertDescription>
                        </Alert>
                    </div>
                </ExampleSection>

                {/* Info Alerts */}
                <ExampleSection
                    title={t('components.alert.info.title')}
                    description={t('components.alert.info.description')}
                    code={{
                        frontend: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lightbulb } from "lucide-react";
import { usePage } from "@inertiajs/react";

export function InfoAlert() {
    const { info, tips } = usePage().props as any;
    
    return (
        <div className="space-y-4">
            {info && (
                <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Information</AlertTitle>
                    <AlertDescription className="text-blue-700">
                        {info}
                    </AlertDescription>
                </Alert>
            )}
            
            {tips && (
                <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Tip</AlertTitle>
                    <AlertDescription className="text-blue-700">
                        {tips}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}`,
                        backend: `// Controllers/DashboardController.cs
public class DashboardController : Controller
{
    private readonly IFeatureService _featureService;
    private readonly IDashboardService _dashboardService;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardController(
        IFeatureService featureService,
        IDashboardService dashboardService,
        UserManager<ApplicationUser> userManager)
    {
        _featureService = featureService;
        _dashboardService = dashboardService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var hasNewFeatures = await _featureService.HasNewFeaturesAsync(user.LastLoginAt);
        
        var dashboardData = await _dashboardService.GetDataAsync(user.Id);
        
        var model = new DashboardModel
        {
            Data = dashboardData,
            User = user
        };
        
        if (hasNewFeatures)
        {
            TempData["info"] = "New features are available in this update. Check out the changelog for details.";
        }
        
        if (user.IsFirstLogin)
        {
            TempData["tips"] = "Use keyboard shortcuts to navigate faster: Ctrl+K to open search, Ctrl+N for new item.";
        }
        
        return Inertia.Render("Dashboard/Index", model);
    }
}

// Controllers/SystemController.cs
public class SystemController : Controller
{
    private readonly ISystemService _systemService;
    private readonly IMaintenanceService _maintenanceService;

    public SystemController(ISystemService systemService, IMaintenanceService maintenanceService)
    {
        _systemService = systemService;
        _maintenanceService = maintenanceService;
    }

    [HttpGet]
    public async Task<IActionResult> Status()
    {
        var systemInfo = await _systemService.GetStatusAsync();
        var maintenanceScheduled = await _maintenanceService.GetUpcomingMaintenanceAsync();
        
        var model = new SystemStatusModel
        {
            SystemInfo = systemInfo
        };
        
        if (maintenanceScheduled != null)
        {
            TempData["info"] = $"Scheduled maintenance on {maintenanceScheduled.Date:MMM dd} from {maintenanceScheduled.StartTime} to {maintenanceScheduled.EndTime}. Services may be temporarily unavailable.";
        }
        
        return Inertia.Render("System/Status", model);
    }
}`
                    }}
                >
                    <div className="space-y-4">
                        <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                            <Info className="h-4 w-4 text-blue-600" />
                            <AlertTitle className="text-blue-800">{t('components.alert.info.information')}</AlertTitle>
                            <AlertDescription className="text-blue-700">
                                {t('components.alert.info.newFeatures')}
                            </AlertDescription>
                        </Alert>
                        
                        <Alert className="border-blue-200 bg-blue-50 text-blue-800">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <AlertTitle className="text-blue-800">{t('components.alert.info.tip')}</AlertTitle>
                            <AlertDescription className="text-blue-700">
                                {t('components.alert.info.keyboardTip')}
                            </AlertDescription>
                        </Alert>
                    </div>
                </ExampleSection>

                {/* Dismissible Alerts */}
                <ExampleSection
                    title={t('components.alert.dismissible.title')}
                    description={t('components.alert.dismissible.description')}
                    code={{
                        frontend: `function DismissibleAlert({ children }) {
    const [isVisible, setIsVisible] = useState(true);
    
    if (!isVisible) return null;
    
    return (
        <div className="relative">
            {children}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setIsVisible(false)}
            >
                <X className="h-3 w-3" />
            </Button>
        </div>
    );
}`
                    }}
                >
                    <div className="space-y-4">
                        <DismissibleAlert>
                            <Alert className="border-green-200 bg-green-50 text-green-800 pr-12">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-700">
                                    {t('components.alert.dismissible.welcomeMessage')}
                                </AlertDescription>
                            </Alert>
                        </DismissibleAlert>
                        
                        <DismissibleAlert>
                            <Alert className="border-blue-200 bg-blue-50 text-blue-800 pr-12">
                                <Info className="h-4 w-4 text-blue-600" />
                                <AlertDescription className="text-blue-700">
                                    {t('components.alert.dismissible.emailVerification')}
                                </AlertDescription>
                            </Alert>
                        </DismissibleAlert>
                        
                        <div className="flex space-x-2">
                            <Button onClick={showTemporaryAlert} variant="outline">
                                {t('components.alert.dismissible.showTemporary')}
                            </Button>
                        </div>
                        
                        {showTemporary && (
                            <Alert className="border-purple-200 bg-purple-50 text-purple-800">
                                <Info className="h-4 w-4 text-purple-600" />
                                <AlertDescription className="text-purple-700">
                                    {t('components.alert.dismissible.temporaryAlert')}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </ExampleSection>
            </div>
        </div>
    );
}