import { useTranslation } from 'react-i18next'
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { CodeExample } from '../CodeExample'

const ContextMenuExamples = () => {
    const { t } = useTranslation()

    const example1Code = {
        frontend: `import {
    User,
    Settings,
    LogOut,
} from 'lucide-react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'

<ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
        <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
        </ContextMenuItem>
        <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`,
        backend: `// Controllers/ContextMenuController.cs
public class ContextMenuController : Controller
{
    private readonly IContextMenuService _contextMenuService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ContextMenuController(IContextMenuService contextMenuService, UserManager<ApplicationUser> userManager)
    {
        _contextMenuService = contextMenuService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Items()
    {
        var user = await _userManager.GetUserAsync(User);
        var menuItems = await _contextMenuService.GetMenuItemsAsync(user.Id);
        
        return Inertia.Render("ContextMenu/Items", new { menuItems });
    }
        
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ExecuteAction([FromForm] MenuActionRequest action)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _contextMenuService.ExecuteActionAsync(user.Id, action.ActionId, action.Context);
        
        return Inertia.Back().With("success", $"Ação {action.ActionId} executada com sucesso!");
    }
}

// Models/MenuAction.cs
public class MenuAction
{
    public string ActionId { get; set; } = "";
    public Dictionary<string, string> Context { get; set; } = new();
    public string UserId { get; set; } = "";
    public DateTime ExecutedAt { get; set; }
}

// Models/MenuActionRequest.cs
public class MenuActionRequest
{
    public string ActionId { get; set; } = "";
    public Dictionary<string, string> Context { get; set; } = new();
}`,
    }

    const example2Code = {
        frontend: `import {
    Cloud,
    CreditCard,
    Github,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'

<ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
        <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
        </ContextMenuItem>
        <ContextMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
        </ContextMenuItem>
        <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite users</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Message</span>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>More...</span>
                </ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
            <ContextMenuSubTrigger>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create</span>
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
                <ContextMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>Repository</span>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                </ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
        </ContextMenuItem>
        <ContextMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`,
        backend: `// Controllers/AdvancedMenuController.cs
public class AdvancedMenuController : Controller
{
    private readonly IAdvancedMenuService _advancedMenuService;
    private readonly IInviteService _inviteService;
    private readonly UserManager<ApplicationUser> _userManager;

    public AdvancedMenuController(
        IAdvancedMenuService advancedMenuService,
        IInviteService inviteService,
        UserManager<ApplicationUser> userManager)
    {
        _advancedMenuService = advancedMenuService;
        _inviteService = inviteService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Structure()
    {
        var user = await _userManager.GetUserAsync(User);
        var menuStructure = await _advancedMenuService.GetMenuStructureAsync(user.Id);
        
        return Inertia.Render("AdvancedMenu/Structure", menuStructure);
    }
        
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Invite([FromForm] InviteRequest request)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _inviteService.SendInviteAsync(user.Id, request.Email, request.Method);
        
        return Inertia.Back().With("success", $"Convite enviado via {request.Method} para {request.Email}!");
    }
}

// Models/InviteRequest.cs
public class InviteRequest
{
    public string Method { get; set; } = "";
    public string Email { get; set; } = "";
}

// Models/MenuStructure.cs
public class MenuStructure
{
    public List<MenuItem> MainItems { get; set; } = new();
    public List<SubMenu> SubMenus { get; set; } = new();
}

// Models/MenuItem.cs
public class MenuItem
{
    public string Id { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
    public bool Disabled { get; set; }
}

// Models/SubMenu.cs
public class SubMenu
{
    public string Id { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
    public List<MenuItem> Items { get; set; } = new();
}`,
    }

    const example3Code = {
        frontend: `import {
    Keyboard,
    LogOut,
    Settings,
    User,
} from 'lucide-react'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'

<ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
        <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <ContextMenuShortcut>⌘K</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>View Mode</ContextMenuLabel>
        <ContextMenuRadioGroup value="comfortable">
            <ContextMenuRadioItem value="compact">
                Compact
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="comfortable">
                Comfortable
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="spacious">
                Spacious
            </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <ContextMenuShortcut>⇧⌘Q</ContextMenuShortcut>
        </ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`,
        backend: `// Controllers/ShortcutMenuController.cs
public class ShortcutMenuController : Controller
{
    private readonly IShortcutMenuService _shortcutMenuService;
    private readonly IUserPreferencesService _userPreferencesService;
    private readonly UserManager<ApplicationUser> _userManager;

    public ShortcutMenuController(
        IShortcutMenuService shortcutMenuService,
        IUserPreferencesService userPreferencesService,
        UserManager<ApplicationUser> userManager)
    {
        _shortcutMenuService = shortcutMenuService;
        _userPreferencesService = userPreferencesService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Shortcuts()
    {
        var user = await _userManager.GetUserAsync(User);
        var shortcuts = await _shortcutMenuService.GetUserShortcutsAsync(user.Id);
        
        return Inertia.Render("ContextMenu/Shortcuts", new { shortcuts });
    }
        
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Preferences()
    {
        var user = await _userManager.GetUserAsync(User);
        var preferences = await _userPreferencesService.GetUserPreferencesAsync(user.Id);
        
        return Inertia.Render("ContextMenu/Preferences", preferences);
    }
        
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UpdatePreference([FromForm] PreferenceUpdateRequest update)
    {
        if (!ModelState.IsValid)
        {
            return Inertia.Back().With("errors", ModelState);
        }

        var user = await _userManager.GetUserAsync(User);
        await _userPreferencesService.UpdatePreferenceAsync(user.Id, update.Key, update.Value);
        
        return Inertia.Back().With("success", "Preferência atualizada com sucesso!");
    }
}

// Models/PreferenceUpdate.cs
public class PreferenceUpdate
{
    public string Key { get; set; } = "";
    public string Value { get; set; } = "";
    public string UserId { get; set; } = "";
    public DateTime UpdatedAt { get; set; }
}

// Models/PreferenceUpdateRequest.cs
public class PreferenceUpdateRequest
{
    public string Key { get; set; } = "";
    public string Value { get; set; } = "";
}

// Models/UserShortcut.cs
public class UserShortcut
{
    public string Action { get; set; } = "";
    public string Shortcut { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Label { get; set; } = "";
}`,
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.contextMenu.basic.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.contextMenu.basic.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <ContextMenu>
                        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                            {t('components.contextMenu.basic.rightClick')}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.basic.profile')}</span>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.basic.settings')}</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.basic.logout')}</span>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>
                <CodeExample code={example1Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.contextMenu.submenu.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.contextMenu.submenu.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <ContextMenu>
                        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                            {t('components.contextMenu.submenu.rightClick')}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.profile')}</span>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.billing')}</span>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.settings')}</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    <span>{t('components.contextMenu.submenu.inviteUsers')}</span>
                                </ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                    <ContextMenuItem>
                                        <Mail className="mr-2 h-4 w-4" />
                                        <span>{t('components.contextMenu.submenu.email')}</span>
                                    </ContextMenuItem>
                                    <ContextMenuItem>
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        <span>{t('components.contextMenu.submenu.message')}</span>
                                    </ContextMenuItem>
                                    <ContextMenuSeparator />
                                    <ContextMenuItem>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        <span>{t('components.contextMenu.submenu.more')}</span>
                                    </ContextMenuItem>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>
                                    <Plus className="mr-2 h-4 w-4" />
                                    <span>{t('components.contextMenu.submenu.create')}</span>
                                </ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                    <ContextMenuItem>
                                        <Github className="mr-2 h-4 w-4" />
                                        <span>{t('components.contextMenu.submenu.repository')}</span>
                                    </ContextMenuItem>
                                    <ContextMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{t('components.contextMenu.submenu.team')}</span>
                                    </ContextMenuItem>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.support')}</span>
                            </ContextMenuItem>
                            <ContextMenuItem disabled>
                                <Cloud className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.api')}</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.submenu.logout')}</span>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>
                <CodeExample code={example2Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.contextMenu.shortcuts.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.contextMenu.shortcuts.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <ContextMenu>
                        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                            {t('components.contextMenu.shortcuts.rightClick')}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.shortcuts.profile')}</span>
                                <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.shortcuts.settings')}</span>
                                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Keyboard className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.shortcuts.keyboardShortcuts')}</span>
                                <ContextMenuShortcut>⌘K</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuCheckboxItem checked>
                                {t('components.contextMenu.shortcuts.showBookmarks')}
                                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                            </ContextMenuCheckboxItem>
                            <ContextMenuCheckboxItem>{t('components.contextMenu.shortcuts.showFullUrls')}</ContextMenuCheckboxItem>
                            <ContextMenuSeparator />
                            <ContextMenuLabel>{t('components.contextMenu.shortcuts.viewMode')}</ContextMenuLabel>
                            <ContextMenuRadioGroup value="comfortable">
                                <ContextMenuRadioItem value="compact">
                                    {t('components.contextMenu.shortcuts.compact')}
                                </ContextMenuRadioItem>
                                <ContextMenuRadioItem value="comfortable">
                                    {t('components.contextMenu.shortcuts.comfortable')}
                                </ContextMenuRadioItem>
                                <ContextMenuRadioItem value="spacious">
                                    {t('components.contextMenu.shortcuts.spacious')}
                                </ContextMenuRadioItem>
                            </ContextMenuRadioGroup>
                            <ContextMenuSeparator />
                            <ContextMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{t('components.contextMenu.shortcuts.logout')}</span>
                                <ContextMenuShortcut>⇧⌘Q</ContextMenuShortcut>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>
                <CodeExample code={example3Code} />
            </div>
        </div>
    )
}

export default ContextMenuExamples
