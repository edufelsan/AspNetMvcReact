import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { CodeExample } from '@/components/CodeExample';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const CheckboxExamples: React.FC = () => {
    const { t } = useTranslation();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [notifications, setNotifications] = useState({
        email: false,
        push: false,
        sms: false,
    });
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
        { id: 'item1', label: t('components.checkbox.multiple.item1') },
        { id: 'item2', label: t('components.checkbox.multiple.item2') },
        { id: 'item3', label: t('components.checkbox.multiple.item3') },
        { id: 'item4', label: t('components.checkbox.multiple.item4') },
    ];

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    // Exemplo 1: Checkbox Básico
    const frontendCode1 = `import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function BasicCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <Checkbox 
                id="terms" 
                checked={checked}
                onCheckedChange={setChecked}
            />
            <Label 
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                ${t('components.checkbox.basic.label')}
            </Label>
        </div>
    );
}`;

    const backendCode1 = `// Controllers/UserPreferencesController.cs
public class UserPreferencesController : Controller
{
    private readonly IUserPreferencesService _preferencesService;
    private readonly ITermsService _termsService;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserPreferencesController(
        IUserPreferencesService preferencesService, 
        ITermsService termsService,
        UserManager<ApplicationUser> userManager)
    {
        _preferencesService = preferencesService;
        _termsService = termsService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Terms()
    {
        var user = await _userManager.GetUserAsync(User);
        var termsInfo = await _termsService.GetCurrentTermsAsync();
        
        return Inertia.Render("UserPreferences/Terms", new { termsInfo });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AcceptTerms([FromForm] TermsAcceptanceRequest request)
    {
        if (!ModelState.IsValid || !request.Accepted)
        {
            return Inertia.Back().With("error", "Você deve aceitar os termos para continuar");
        }

        var user = await _userManager.GetUserAsync(User);
        await _termsService.RecordAcceptanceAsync(user.Id, request);
        
        return Redirect("/Dashboard").With("success", "Termos aceitos com sucesso!");
    }
}

// Models/TermsAcceptance.cs
public class TermsAcceptance
{
    public int Id { get; set; }
    public string UserId { get; set; } = "";
    public bool Accepted { get; set; }
    public DateTime AcceptedAt { get; set; }
    public string IpAddress { get; set; } = "";
    public string TermsVersion { get; set; } = "";
}

// Models/TermsAcceptanceRequest.cs
public class TermsAcceptanceRequest
{
    public bool Accepted { get; set; }
}`;

    // Exemplo 2: Checkbox com Notificações
    const frontendCode2 = `import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function NotificationCheckboxes() {
    const [notifications, setNotifications] = useState({
        email: false,
        push: false,
        sms: false,
    });

    return (
        <div className="space-y-4">
            <h4 className="font-medium">${t('components.checkbox.notifications.title')}</h4>
            
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="email" 
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, email: checked as boolean })
                    }
                />
                <Label htmlFor="email">${t('components.checkbox.notifications.email')}</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="push" 
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, push: checked as boolean })
                    }
                />
                <Label htmlFor="push">${t('components.checkbox.notifications.push')}</Label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="sms" 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, sms: checked as boolean })
                    }
                />
                <Label htmlFor="sms">${t('components.checkbox.notifications.sms')}</Label>
            </div>
        </div>
    );
}`;

    const backendCode2 = `// Controllers/NotificationsController.cs
public class NotificationsController : Controller
{
    private readonly INotificationService _notificationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public NotificationsController(INotificationService notificationService, UserManager<ApplicationUser> userManager)
    {
        _notificationService = notificationService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Preferences()
    {
        var user = await _userManager.GetUserAsync(User);
        var preferences = await _notificationService.GetUserPreferencesAsync(user.Id);
        
        return Inertia.Render("Notifications/Preferences", preferences);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdatePreferences([FromForm] NotificationPreferencesRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _notificationService.UpdatePreferencesAsync(user.Id, request);
        
        return Inertia.Back().With("success", "Preferências atualizadas com sucesso!");
    }
}

// Models/NotificationPreferencesRequest.cs
public class NotificationPreferencesRequest
{
    public bool Email { get; set; }
    public bool Push { get; set; }
    public bool Sms { get; set; }
}

// Models/NotificationPreferencesViewModel.cs
public class NotificationPreferencesViewModel
{
    public string UserId { get; set; } = "";
    public bool Email { get; set; }
    public bool Push { get; set; }
    public bool Sms { get; set; }
    public DateTime LastUpdated { get; set; }
}`;

    // Exemplo 3: Checkbox com Seleção Múltipla
    const frontendCode3 = `import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function MultipleSelectionCheckbox() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = [
        { id: 'item1', label: '${t('components.checkbox.multiple.item1')}' },
        { id: 'item2', label: '${t('components.checkbox.multiple.item2')}' },
        { id: 'item3', label: '${t('components.checkbox.multiple.item3')}' },
        { id: 'item4', label: '${t('components.checkbox.multiple.item4')}' },
    ];

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    const toggleItem = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-medium">${t('components.checkbox.multiple.title')}</h4>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    {selectedItems.length === items.length 
                        ? '${t('components.checkbox.multiple.deselectAll')}' 
                        : '${t('components.checkbox.multiple.selectAll')}'}
                </Button>
            </div>

            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                        id={item.id}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                    />
                    <Label htmlFor={item.id}>{item.label}</Label>
                </div>
            ))}

            <p className="text-sm text-muted-foreground">
                ${t('components.checkbox.multiple.selected')}: {selectedItems.length}
            </p>
        </div>
    );
}`;

    const backendCode3 = `// Controllers/SelectionController.cs
public class SelectionController : Controller
{
    private readonly ISelectionService _selectionService;
    private readonly UserManager<ApplicationUser> _userManager;

    public SelectionController(ISelectionService selectionService, UserManager<ApplicationUser> userManager)
    {
        _selectionService = selectionService;
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ProcessSelection([FromForm] MultipleSelectionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _selectionService.ProcessItemsAsync(request.SelectedIds, user.Id);
        
        return Inertia.Back().With("success", $"{request.SelectedIds.Count} itens processados com sucesso!");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Export([FromForm] ExportRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        var exportResult = await _selectionService.ExportItemsAsync(request.SelectedIds, request.Format, user.Id);
        
        return Inertia.Back().With("success", $"{request.SelectedIds.Count} itens exportados com sucesso!")
                             .With("downloadUrl", exportResult.DownloadUrl);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> BatchDelete([FromForm] BatchDeleteRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _selectionService.DeleteItemsAsync(request.SelectedIds, user.Id);
        
        return Inertia.Back().With("success", $"{request.SelectedIds.Count} itens deletados com sucesso!");
    }
}

// Models/MultipleSelectionRequest.cs
public class MultipleSelectionRequest
{
    public List<string> SelectedIds { get; set; } = new();
}

// Models/ExportRequest.cs
public class ExportRequest
{
    public List<string> SelectedIds { get; set; } = new();
    public string Format { get; set; } = "csv";
}

// Models/BatchDeleteRequest.cs
public class BatchDeleteRequest
{
    public List<string> SelectedIds { get; set; } = new();
}`;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.checkbox.title')}</h2>
                <p className="text-muted-foreground text-lg">
                    {t('components.checkbox.description')}
                </p>
            </div>

            {/* Exemplo 1: Checkbox Básico */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.checkbox.basic.title')}</h3>
                    <p className="text-muted-foreground">{t('components.checkbox.basic.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card">
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="terms" 
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        />
                        <Label 
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {t('components.checkbox.basic.label')}
                        </Label>
                    </div>
                </div>

                <CodeExample code={{ frontend: frontendCode1, backend: backendCode1 }} />
            </div>

            {/* Exemplo 2: Checkbox com Notificações */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.checkbox.notifications.title')}</h3>
                    <p className="text-muted-foreground">{t('components.checkbox.notifications.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card space-y-4">
                    <h4 className="font-medium">{t('components.checkbox.notifications.subtitle')}</h4>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="email" 
                            checked={notifications.email}
                            onCheckedChange={(checked) => 
                                setNotifications({ ...notifications, email: checked as boolean })
                            }
                        />
                        <Label htmlFor="email">{t('components.checkbox.notifications.email')}</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="push" 
                            checked={notifications.push}
                            onCheckedChange={(checked) => 
                                setNotifications({ ...notifications, push: checked as boolean })
                            }
                        />
                        <Label htmlFor="push">{t('components.checkbox.notifications.push')}</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="sms" 
                            checked={notifications.sms}
                            onCheckedChange={(checked) => 
                                setNotifications({ ...notifications, sms: checked as boolean })
                            }
                        />
                        <Label htmlFor="sms">{t('components.checkbox.notifications.sms')}</Label>
                    </div>
                </div>

                <CodeExample code={{ frontend: frontendCode2, backend: backendCode2 }} />
            </div>

            {/* Exemplo 3: Checkbox com Seleção Múltipla */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.checkbox.multiple.title')}</h3>
                    <p className="text-muted-foreground">{t('components.checkbox.multiple.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">{t('components.checkbox.multiple.subtitle')}</h4>
                        <Button variant="outline" size="sm" onClick={handleSelectAll}>
                            {selectedItems.length === items.length 
                                ? t('components.checkbox.multiple.deselectAll')
                                : t('components.checkbox.multiple.selectAll')}
                        </Button>
                    </div>

                    {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={item.id}
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => {
                                    setSelectedItems(prev =>
                                        prev.includes(item.id)
                                            ? prev.filter(id => id !== item.id)
                                            : [...prev, item.id]
                                    );
                                }}
                            />
                            <Label htmlFor={item.id}>{item.label}</Label>
                        </div>
                    ))}

                    <p className="text-sm text-muted-foreground pt-2">
                        {t('components.checkbox.multiple.selected')}: {selectedItems.length}
                    </p>
                </div>

                <CodeExample code={{ frontend: frontendCode3, backend: backendCode3 }} />
            </div>
        </div>
    );
};

export default CheckboxExamples;
