import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    FileText,
    Mail,
    Search,
} from 'lucide-react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { CodeExample } from '../CodeExample'

const CommandExamples = () => {
    const { t } = useTranslation()

    // Example 2: Command with Groups
    const [open2, setOpen2] = useState(false)

    // Example 3: Command with Shortcuts
    const [open3, setOpen3] = useState(false)

    const example1Code = {
        frontend: `import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'

<Command className="rounded-lg border shadow-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
            <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
            </CommandItem>
            <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
            </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
            <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </CommandItem>
            <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
            </CommandItem>
            <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</Command>`,
        backend: `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace YourApp.Controllers
{
    public class CommandsController : Controller
    {
        public IActionResult Suggestions()
        {
            var suggestions = new[]
            {
                new { id = "calendar", icon = "Calendar", label = "Calendar" },
                new { id = "emoji", icon = "Smile", label = "Search Emoji" },
                new { id = "calculator", icon = "Calculator", label = "Calculator" }
            };
            
            return Inertia.Render("Commands/Suggestions", new { suggestions });
        }
        
        public IActionResult Settings()
        {
            var settings = new[]
            {
                new { id = "profile", icon = "User", label = "Profile" },
                new { id = "billing", icon = "CreditCard", label = "Billing" },
                new { id = "settings", icon = "Settings", label = "Settings" }
            };
            
            return Inertia.Render("Commands/Settings", new { settings });
        }
        
        [HttpPost]
        public IActionResult Execute(CommandExecution command)
        {
            // Execute the command
            return RedirectToAction("Index", new { message = $"Executed command: {command.CommandId}" });
        }
    }
    
    public class CommandExecution
    {
        public string CommandId { get; set; }
    }
}`,
    }

    const example2Code = {
        frontend: `import { useState } from 'react'
import {
    FileText,
    Mail,
    Search,
    Settings,
    User,
} from 'lucide-react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

const [open, setOpen] = useState(false)

<>
    <Button
        variant="outline"
        onClick={() => setOpen(true)}
    >
        Open Command Menu
    </Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
                <CommandItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search</span>
                </CommandItem>
                <CommandItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>New Document</span>
                </CommandItem>
                <CommandItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send Email</span>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="User">
                <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                </CommandItem>
                <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Preferences</span>
                </CommandItem>
            </CommandGroup>
        </CommandList>
    </CommandDialog>
</>`,
        backend: `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace YourApp.Controllers
{
    public class CommandMenuController : Controller
    {
        public IActionResult Actions()
        {
            var actions = new[]
            {
                new { id = "search", icon = "Search", label = "Search" },
                new { id = "new-doc", icon = "FileText", label = "New Document" },
                new { id = "send-email", icon = "Mail", label = "Send Email" }
            };
            
            return Inertia.Render("CommandMenu/Actions", new { actions });
        }
        
        public IActionResult User()
        {
            var userCommands = new[]
            {
                new { id = "profile", icon = "User", label = "Profile Settings" },
                new { id = "preferences", icon = "Settings", label = "Preferences" }
            };
            
            return Inertia.Render("CommandMenu/User", new { userCommands });
        }
        
        [HttpPost]
        public IActionResult Execute(CommandRequest request)
        {
            // Execute the command based on action
            return RedirectToAction("Index", new { success = true, action = request.Action });
        }
    }
    
    public class CommandRequest
    {
        public string Action { get; set; }
        public Dictionary<string, object> Parameters { get; set; }
    }
}`,
    }

    const example3Code = {
        frontend: `import { useState, useEffect } from 'react'
import {
    Calculator,
    Calendar,
    Settings,
    User,
} from 'lucide-react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/ui/command'

const [open, setOpen] = useState(false)

useEffect(() => {
    const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
        }
    }
    
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
            <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
                <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
                <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</CommandDialog>

<p className="text-sm text-muted-foreground">
    Press{" "}
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
    </kbd>
    {" "}to open
</p>`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    public class ShortcutsController : Controller
    {
        public IActionResult Index()
        {
            var shortcuts = new[]
            {
                new { id = "calendar", icon = "Calendar", label = "Calendar", shortcut = "⌘C" },
                new { id = "profile", icon = "User", label = "Profile", shortcut = "⌘P" },
                new { id = "calculator", icon = "Calculator", label = "Calculator", shortcut = "⌘A" },
                new { id = "settings", icon = "Settings", label = "Settings", shortcut = "⌘S" }
            };
            
            return Inertia.Render("Shortcuts/Index", new { shortcuts });
        }
        
        [HttpPost]
        public IActionResult Register(ShortcutRegistration registration)
        {
            // Register custom keyboard shortcut
            return RedirectToAction("Index", new 
            { 
                message = $"Registered shortcut {registration.Shortcut} for {registration.Action}" 
            });
        }
        
        [HttpPost]
        public IActionResult Execute(ShortcutExecution execution)
        {
            // Execute command triggered by shortcut
            return RedirectToAction("Index", new 
            { 
                success = true, 
                command = execution.CommandId,
                triggeredBy = execution.Shortcut
            });
        }
    }
    
    public class ShortcutRegistration
    {
        public string Action { get; set; }
        public string Shortcut { get; set; }
    }
    
    public class ShortcutExecution
    {
        public string CommandId { get; set; }
        public string Shortcut { get; set; }
    }
}`,
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.command.basic.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.command.basic.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder={t('components.command.basic.placeholder')} />
                        <CommandList>
                            <CommandEmpty>{t('components.command.basic.noResults')}</CommandEmpty>
                            <CommandGroup heading={t('components.command.basic.suggestions')}>
                                <CommandItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.calendar')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <Smile className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.emoji')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.calculator')}</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandGroup heading={t('components.command.basic.settings')}>
                                <CommandItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.profile')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.billing')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.basic.settingsItem')}</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
                <CodeExample code={example1Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.command.groups.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.command.groups.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <Button variant="outline" onClick={() => setOpen2(true)}>
                        {t('components.command.groups.openButton')}
                    </Button>
                    <CommandDialog open={open2} onOpenChange={setOpen2}>
                        <CommandInput placeholder={t('components.command.groups.placeholder')} />
                        <CommandList>
                            <CommandEmpty>{t('components.command.groups.noResults')}</CommandEmpty>
                            <CommandGroup heading={t('components.command.groups.actions')}>
                                <CommandItem>
                                    <Search className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.groups.search')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.groups.newDocument')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.groups.sendEmail')}</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading={t('components.command.groups.user')}>
                                <CommandItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.groups.profileSettings')}</span>
                                </CommandItem>
                                <CommandItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.groups.preferences')}</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </div>
                <CodeExample code={example2Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.command.shortcuts.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.command.shortcuts.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <p className="text-sm text-muted-foreground mb-4">
                        {t('components.command.shortcuts.pressKey')}{' '}
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                        {' '}{t('components.command.shortcuts.toOpen')}
                    </p>
                    <Button variant="outline" onClick={() => setOpen3(true)}>
                        {t('components.command.shortcuts.openButton')}
                    </Button>
                    <CommandDialog open={open3} onOpenChange={setOpen3}>
                        <CommandInput placeholder={t('components.command.shortcuts.placeholder')} />
                        <CommandList>
                            <CommandEmpty>{t('components.command.shortcuts.noResults')}</CommandEmpty>
                            <CommandGroup heading={t('components.command.shortcuts.commands')}>
                                <CommandItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.shortcuts.calendar')}</span>
                                    <CommandShortcut>⌘C</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.shortcuts.profile')}</span>
                                    <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.shortcuts.calculator')}</span>
                                    <CommandShortcut>⌘A</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>{t('components.command.shortcuts.settings')}</span>
                                    <CommandShortcut>⌘S</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </div>
                <CodeExample code={example3Code} />
            </div>
        </div>
    )
}

export default CommandExamples
