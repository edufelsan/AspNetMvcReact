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
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContextMenuController : ControllerBase
    {
        [HttpGet("items")]
        public IActionResult GetMenuItems()
        {
            var menuItems = new[]
            {
                new { id = "profile", icon = "User", label = "Profile" },
                new { id = "settings", icon = "Settings", label = "Settings" },
                new { id = "logout", icon = "LogOut", label = "Log out", separator = true }
            };
            
            return Ok(menuItems);
        }
        
        [HttpPost("action")]
        public IActionResult ExecuteAction([FromBody] MenuAction action)
        {
            // Execute the menu action
            return Ok(new { message = $"Executed action: {action.ActionId}" });
        }
    }
    
    public class MenuAction
    {
        public string ActionId { get; set; }
        public Dictionary<string, object> Context { get; set; }
    }
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
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdvancedMenuController : ControllerBase
    {
        [HttpGet("structure")]
        public IActionResult GetMenuStructure()
        {
            var menuStructure = new
            {
                mainItems = new[]
                {
                    new { id = "profile", icon = "User", label = "Profile" },
                    new { id = "billing", icon = "CreditCard", label = "Billing" },
                    new { id = "settings", icon = "Settings", label = "Settings" }
                },
                subMenus = new[]
                {
                    new 
                    { 
                        id = "invite",
                        icon = "UserPlus",
                        label = "Invite users",
                        items = new[]
                        {
                            new { id = "email", icon = "Mail", label = "Email" },
                            new { id = "message", icon = "MessageSquare", label = "Message" },
                            new { id = "more", icon = "PlusCircle", label = "More..." }
                        }
                    },
                    new 
                    { 
                        id = "create",
                        icon = "Plus",
                        label = "Create",
                        items = new[]
                        {
                            new { id = "repository", icon = "Github", label = "Repository" },
                            new { id = "team", icon = "Users", label = "Team" }
                        }
                    }
                }
            };
            
            return Ok(menuStructure);
        }
        
        [HttpPost("invite")]
        public IActionResult InviteUser([FromBody] InviteRequest request)
        {
            // Process user invitation
            return Ok(new 
            { 
                message = $"Invitation sent via {request.Method}",
                recipient = request.Email
            });
        }
    }
    
    public class InviteRequest
    {
        public string Method { get; set; }
        public string Email { get; set; }
    }
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
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShortcutMenuController : ControllerBase
    {
        [HttpGet("shortcuts")]
        public IActionResult GetShortcuts()
        {
            var shortcuts = new[]
            {
                new { action = "profile", shortcut = "⌘P", icon = "User", label = "Profile" },
                new { action = "settings", shortcut = "⌘S", icon = "Settings", label = "Settings" },
                new { action = "keyboard", shortcut = "⌘K", icon = "Keyboard", label = "Keyboard shortcuts" },
                new { action = "logout", shortcut = "⇧⌘Q", icon = "LogOut", label = "Log out" }
            };
            
            return Ok(shortcuts);
        }
        
        [HttpGet("preferences")]
        public IActionResult GetPreferences()
        {
            var preferences = new
            {
                checkboxes = new[]
                {
                    new { id = "bookmarks", label = "Show Bookmarks Bar", checked = true },
                    new { id = "fullurls", label = "Show Full URLs", checked = false }
                },
                viewMode = new
                {
                    label = "View Mode",
                    options = new[] { "compact", "comfortable", "spacious" },
                    selected = "comfortable"
                }
            };
            
            return Ok(preferences);
        }
        
        [HttpPost("update-preference")]
        public IActionResult UpdatePreference([FromBody] PreferenceUpdate update)
        {
            // Update user preference
            return Ok(new 
            { 
                message = "Preference updated",
                preference = update.Key,
                value = update.Value
            });
        }
    }
    
    public class PreferenceUpdate
    {
        public string Key { get; set; }
        public object Value { get; set; }
    }
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
