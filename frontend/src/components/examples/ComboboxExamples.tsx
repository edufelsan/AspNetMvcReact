import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { CodeExample } from '../CodeExample'

const ComboboxExamples = () => {
    const { t } = useTranslation()

    // Example 1: Basic Combobox
    const frameworks = [
        { value: 'next.js', label: 'Next.js' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'nuxt.js', label: 'Nuxt.js' },
        { value: 'remix', label: 'Remix' },
        { value: 'astro', label: 'Astro' },
    ]
    const [open1, setOpen1] = useState(false)
    const [value1, setValue1] = useState('')

    // Example 2: Searchable Countries
    const countries = [
        { value: 'us', label: t('components.combobox.countries.us') },
        { value: 'ca', label: t('components.combobox.countries.ca') },
        { value: 'mx', label: t('components.combobox.countries.mx') },
        { value: 'br', label: t('components.combobox.countries.br') },
        { value: 'ar', label: t('components.combobox.countries.ar') },
        { value: 'uk', label: t('components.combobox.countries.uk') },
        { value: 'de', label: t('components.combobox.countries.de') },
        { value: 'fr', label: t('components.combobox.countries.fr') },
    ]
    const [open2, setOpen2] = useState(false)
    const [value2, setValue2] = useState('')

    // Example 3: Multiple Selection
    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'go', label: 'Go' },
    ]
    const [open3, setOpen3] = useState(false)
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

    const toggleLanguage = (language: string) => {
        setSelectedLanguages((prev) =>
            prev.includes(language)
                ? prev.filter((l) => l !== language)
                : [...prev, language]
        )
    }

    const example1Code = {
        frontend: `import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const frameworks = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
]

const [open, setOpen] = useState(false)
const [value, setValue] = useState('')

<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
        >
            {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
        <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                    {frameworks.map((framework) => (
                        <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {framework.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    </PopoverContent>
</Popover>`,
        backend: `// Controllers/FrameworksController.cs
public class FrameworksController : Controller
{
    private readonly IFrameworkService _frameworkService;

    public FrameworksController(IFrameworkService frameworkService)
    {
        _frameworkService = frameworkService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        var frameworks = _frameworkService.GetAllFrameworks();
        return Inertia.Render("Frameworks/Index", new { frameworks });
    }
        
    [HttpPost]
    public IActionResult SelectFramework(FrameworkSelection selection)
    {
        if (!ModelState.IsValid)
        {
            return RedirectToAction("Index");
        }

        _frameworkService.SaveUserPreference(selection);
        TempData["Success"] = $"Selected framework: {selection.Value}";
        return RedirectToAction("Index");
    }
}
    
// Models/Framework.cs
public class Framework
{
    public string Value { get; set; } = "";
    public string Label { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsPopular { get; set; }
}

// Models/FrameworkSelection.cs
public class FrameworkSelection
{
    public string Value { get; set; } = "";
    public string UserId { get; set; } = "";
}
}`,
    }

    const example2Code = {
        frontend: `import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'br', label: 'Brazil' },
    { value: 'ar', label: 'Argentina' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
]

const [open, setOpen] = useState(false)
const [value, setValue] = useState('')

<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
        >
            {value
                ? countries.find((country) => country.value === value)?.label
                : "Select country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[250px] p-0">
        <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                    {countries.map((country) => (
                        <CommandItem
                            key={country.value}
                            value={country.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === country.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {country.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    </PopoverContent>
</Popover>`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountriesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCountries([FromQuery] string? search = null)
        {
            var countries = new[]
            {
                new { value = "us", label = "United States" },
                new { value = "ca", label = "Canada" },
                new { value = "mx", label = "Mexico" },
                new { value = "br", label = "Brazil" },
                new { value = "ar", label = "Argentina" },
                new { value = "uk", label = "United Kingdom" },
                new { value = "de", label = "Germany" },
                new { value = "fr", label = "France" }
            };
            
            if (!string.IsNullOrEmpty(search))
            {
                countries = countries
                    .Where(c => c.label.Contains(search, StringComparison.OrdinalIgnoreCase))
                    .ToArray();
            }
            
            return Inertia.Render("Countries/Index", new { countries });
        }
        
        [HttpPost]
        public IActionResult SelectCountry(CountrySelection selection)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }

            // Process the selected country
            TempData["Success"] = $"Selected country: {selection.Value}";
            return RedirectToAction("Index");
        }
    }
    
    public class CountrySelection
    {
        public string Value { get; set; }
    }
}`,
    }

    const example3Code = {
        frontend: `import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
]

const [open, setOpen] = useState(false)
const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
        prev.includes(language)
            ? prev.filter((l) => l !== language)
            : [...prev, language]
    )
}

<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
        >
            {selectedLanguages.length > 0
                ? \`\${selectedLanguages.length} language(s) selected\`
                : "Select languages..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[300px] p-0">
        <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                    {languages.map((language) => (
                        <CommandItem
                            key={language.value}
                            value={language.value}
                            onSelect={() => toggleLanguage(language.value)}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedLanguages.includes(language.value)
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                            />
                            {language.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    </PopoverContent>
</Popover>

{selectedLanguages.length > 0 && (
    <div className="mt-2">
        <p className="text-sm text-muted-foreground">
            Selected: {selectedLanguages.join(', ')}
        </p>
    </div>
)}`,
        backend: `using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LanguagesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetLanguages()
        {
            var languages = new[]
            {
                new { value = "javascript", label = "JavaScript" },
                new { value = "typescript", label = "TypeScript" },
                new { value = "python", label = "Python" },
                new { value = "java", label = "Java" },
                new { value = "csharp", label = "C#" },
                new { value = "go", label = "Go" }
            };
            
            return Ok(languages);
        }
        
        [HttpPost("select-multiple")]
        public IActionResult SelectLanguages([FromBody] MultipleLanguageSelection selection)
        {
            // Process the selected languages
            return Ok(new 
            { 
                message = $"Selected {selection.Languages.Count} language(s)",
                languages = selection.Languages
            });
        }
    }
    
    public class MultipleLanguageSelection
    {
        public List<string> Languages { get; set; }
    }
}`,
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.combobox.basic.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.combobox.basic.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <Popover open={open1} onOpenChange={setOpen1}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open1}
                                className="w-[200px] justify-between"
                            >
                                {value1
                                    ? frameworks.find((framework) => framework.value === value1)?.label
                                    : t('components.combobox.basic.selectFramework')}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder={t('components.combobox.basic.searchPlaceholder')} />
                                <CommandList>
                                    <CommandEmpty>{t('components.combobox.basic.noFramework')}</CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    setValue1(currentValue === value1 ? '' : currentValue)
                                                    setOpen1(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        value1 === framework.value ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                                {framework.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <CodeExample code={example1Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.combobox.searchable.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.combobox.searchable.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open2}
                                className="w-[250px] justify-between"
                            >
                                {value2
                                    ? countries.find((country) => country.value === value2)?.label
                                    : t('components.combobox.searchable.selectCountry')}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-0">
                            <Command>
                                <CommandInput placeholder={t('components.combobox.searchable.searchPlaceholder')} />
                                <CommandList>
                                    <CommandEmpty>{t('components.combobox.searchable.noCountry')}</CommandEmpty>
                                    <CommandGroup>
                                        {countries.map((country) => (
                                            <CommandItem
                                                key={country.value}
                                                value={country.value}
                                                onSelect={(currentValue) => {
                                                    setValue2(currentValue === value2 ? '' : currentValue)
                                                    setOpen2(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        value2 === country.value ? 'opacity-100' : 'opacity-0'
                                                    )}
                                                />
                                                {country.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <CodeExample code={example2Code} />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-2">{t('components.combobox.multiple.title')}</h2>
                <p className="text-muted-foreground mb-4">{t('components.combobox.multiple.description')}</p>
                <div className="border rounded-lg p-6 bg-card">
                    <Popover open={open3} onOpenChange={setOpen3}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open3}
                                className="w-[300px] justify-between"
                            >
                                {selectedLanguages.length > 0
                                    ? t('components.combobox.multiple.selectedCount', { count: selectedLanguages.length })
                                    : t('components.combobox.multiple.selectLanguages')}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput placeholder={t('components.combobox.multiple.searchPlaceholder')} />
                                <CommandList>
                                    <CommandEmpty>{t('components.combobox.multiple.noLanguage')}</CommandEmpty>
                                    <CommandGroup>
                                        {languages.map((language) => (
                                            <CommandItem
                                                key={language.value}
                                                value={language.value}
                                                onSelect={() => toggleLanguage(language.value)}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        selectedLanguages.includes(language.value)
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {language.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {selectedLanguages.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                                {t('components.combobox.multiple.selectedLabel')}: {selectedLanguages.join(', ')}
                            </p>
                        </div>
                    )}
                </div>
                <CodeExample code={example3Code} />
            </div>
        </div>
    )
}

export default ComboboxExamples
