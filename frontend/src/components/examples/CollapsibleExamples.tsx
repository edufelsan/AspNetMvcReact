import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { CodeExample } from '@/components/CodeExample';
import { ChevronsUpDown, ChevronDown, ChevronRight } from 'lucide-react';

const CollapsibleExamples: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [openFaqs, setOpenFaqs] = useState<string[]>([]);
    const [openSections, setOpenSections] = useState<string[]>(['section1']);

    const toggleFaq = (id: string) => {
        setOpenFaqs(prev =>
            prev.includes(id)
                ? prev.filter(faqId => faqId !== id)
                : [...prev, id]
        );
    };

    const toggleSection = (id: string) => {
        setOpenSections(prev =>
            prev.includes(id)
                ? prev.filter(sectionId => sectionId !== id)
                : [...prev, id]
        );
    };

    // Exemplo 1: Collapsible Básico
    const frontendCode1 = `import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

export function BasicCollapsible() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
        >
            <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                    ${t('components.collapsible.basic.title')}
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">${t('components.collapsible.basic.toggle')}</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 text-sm">
                ${t('components.collapsible.basic.visibleContent')}
            </div>
            <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 text-sm">
                    ${t('components.collapsible.basic.hiddenContent1')}
                </div>
                <div className="rounded-md border px-4 py-3 text-sm">
                    ${t('components.collapsible.basic.hiddenContent2')}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}`;

    const backendCode1 = `// Controllers/ContentController.cs
public class ContentController : Controller
{
    private readonly IContentService _contentService;
    private readonly IInteractionService _interactionService;

    public ContentController(IContentService contentService, IInteractionService interactionService)
    {
        _contentService = contentService;
        _interactionService = interactionService;
    }

    [HttpGet]
    public IActionResult Collapsible(string id)
    {
        var content = _contentService.GetContentById(id);
        return Inertia.Render("Content/Collapsible", new { content });
    }

    [HttpPost]
    public IActionResult TrackInteraction(InteractionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return RedirectToAction("Collapsible", new { id = request.ContentId });
        }

        _interactionService.TrackInteraction(request);
        TempData["Info"] = $"Interação registrada: {(request.IsOpen ? "expanded" : "collapsed")}";
        return RedirectToAction("Collapsible", new { id = request.ContentId });
    }
}

// Models/CollapsibleContent.cs
public class CollapsibleContent
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Summary { get; set; } = "";
    public List<string> Details { get; set; } = new();
    public bool IsExpanded { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Models/InteractionRequest.cs
public class InteractionRequest
{
    public string ContentId { get; set; } = "";
    public bool IsOpen { get; set; }
    public string UserId { get; set; } = "";
}
}`;

    // Exemplo 2: FAQ Collapsible
    const frontendCode2 = `import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export function FaqCollapsible() {
    const [openFaqs, setOpenFaqs] = useState<string[]>([]);

    const faqs = [
        {
            id: 'faq1',
            question: '${t('components.collapsible.faq.question1')}',
            answer: '${t('components.collapsible.faq.answer1')}'
        },
        {
            id: 'faq2',
            question: '${t('components.collapsible.faq.question2')}',
            answer: '${t('components.collapsible.faq.answer2')}'
        },
        {
            id: 'faq3',
            question: '${t('components.collapsible.faq.question3')}',
            answer: '${t('components.collapsible.faq.answer3')}'
        }
    ];

    const toggleFaq = (id: string) => {
        setOpenFaqs(prev =>
            prev.includes(id)
                ? prev.filter(faqId => faqId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-2">
            {faqs.map((faq) => (
                <Collapsible
                    key={faq.id}
                    open={openFaqs.includes(faq.id)}
                    onOpenChange={() => toggleFaq(faq.id)}
                >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-accent">
                        <h4 className="text-sm font-semibold text-left">{faq.question}</h4>
                        <ChevronDown 
                            className={\`h-4 w-4 transition-transform duration-200 \${
                                openFaqs.includes(faq.id) ? 'rotate-180' : ''
                            }\`}
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground">
                        {faq.answer}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    );
}`;

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;
using InertiaNetCore;

namespace AspNetMvcReact.Controllers
{
    public class FaqController : Controller
    {
        // Exibir perguntas frequentes
        public IActionResult Index(string? category = null)
        {
            var faqs = new[]
            {
                new { 
                    id = "faq1", 
                    category = "Geral",
                    question = "Como começar a usar a plataforma?",
                    answer = "Para começar, crie uma conta gratuita e siga o tutorial de boas-vindas.",
                    viewCount = 1250
                },
                new { 
                    id = "faq2", 
                    category = "Geral",
                    question = "Quais são os planos disponíveis?",
                    answer = "Oferecemos planos Free, Pro e Enterprise com diferentes recursos.",
                    viewCount = 980
                },
                new { 
                    id = "faq3", 
                    category = "Técnico",
                    question = "Como integrar com APIs externas?",
                    answer = "Você pode usar nossa documentação de API para integrar com serviços externos.",
                    viewCount = 540
                }
            };
            
            var filtered = category != null 
                ? faqs.Where(f => f.category == category).ToArray()
                : faqs;
            
            return Inertia.Render("Faq/Index", new
            {
                total = filtered.Length,
                data = filtered,
                category = category
            });
        }

        // Registrar visualização de FAQ
        [HttpPost("{id}/view")]
        public IActionResult TrackFaqView(string id)
        {
            var view = new
            {
                faqId = id,
                viewedAt = DateTime.UtcNow,
                helpful = false
            };
            
            return Ok(view);
        }

        // Marcar FAQ como útil
        [HttpPost("{id}/helpful")]
        public IActionResult MarkHelpful(string id, [FromBody] FeedbackRequest request)
        {
            return Ok(new
            {
                faqId = id,
                helpful = request.Helpful,
                feedback = request.Comment,
                submittedAt = DateTime.UtcNow
            });
        }
    }

    public class FeedbackRequest
    {
        public bool Helpful { get; set; }
        public string? Comment { get; set; }
    }
}`;

    // Exemplo 3: Collapsible com Seções Múltiplas
    const frontendCode3 = `import { useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

export function MultipleSectionsCollapsible() {
    const [openSections, setOpenSections] = useState<string[]>(['section1']);

    const sections = [
        {
            id: 'section1',
            title: '${t('components.collapsible.sections.section1Title')}',
            items: ['${t('components.collapsible.sections.section1Item1')}', '${t('components.collapsible.sections.section1Item2')}']
        },
        {
            id: 'section2',
            title: '${t('components.collapsible.sections.section2Title')}',
            items: ['${t('components.collapsible.sections.section2Item1')}', '${t('components.collapsible.sections.section2Item2')}']
        },
        {
            id: 'section3',
            title: '${t('components.collapsible.sections.section3Title')}',
            items: ['${t('components.collapsible.sections.section3Item1')}', '${t('components.collapsible.sections.section3Item2')}']
        }
    ];

    const toggleSection = (id: string) => {
        setOpenSections(prev =>
            prev.includes(id)
                ? prev.filter(sectionId => sectionId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="space-y-2">
            {sections.map((section) => (
                <Collapsible
                    key={section.id}
                    open={openSections.includes(section.id)}
                    onOpenChange={() => toggleSection(section.id)}
                >
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border p-3 hover:bg-accent">
                        <ChevronRight 
                            className={\`h-4 w-4 transition-transform duration-200 \${
                                openSections.includes(section.id) ? 'rotate-90' : ''
                            }\`}
                        />
                        <span className="font-medium text-sm">{section.title}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 py-2 space-y-2">
                        {section.items.map((item, index) => (
                            <div key={index} className="text-sm text-muted-foreground py-1">
                                • {item}
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            ))}
        </div>
    );
}`;

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NavigationController : ControllerBase
    {
        // Obter estrutura de navegação colapsável
        [HttpGet("menu")]
        public IActionResult GetNavigationMenu()
        {
            var menu = new[]
            {
                new { 
                    id = "section1",
                    title = "Configurações Gerais",
                    icon = "Settings",
                    items = new[]
                    {
                        new { label = "Perfil", url = "/settings/profile" },
                        new { label = "Conta", url = "/settings/account" }
                    },
                    defaultOpen = true
                },
                new { 
                    id = "section2",
                    title = "Preferências",
                    icon = "Sliders",
                    items = new[]
                    {
                        new { label = "Notificações", url = "/preferences/notifications" },
                        new { label = "Privacidade", url = "/preferences/privacy" }
                    },
                    defaultOpen = false
                },
                new { 
                    id = "section3",
                    title = "Ajuda",
                    icon = "HelpCircle",
                    items = new[]
                    {
                        new { label = "FAQ", url = "/help/faq" },
                        new { label = "Suporte", url = "/help/support" }
                    },
                    defaultOpen = false
                }
            };
            
            return Ok(menu);
        }

        // Salvar estado de seções abertas
        [HttpPost("save-state")]
        public IActionResult SaveNavigationState([FromBody] NavigationStateRequest request)
        {
            var state = new
            {
                userId = request.UserId,
                openSections = request.OpenSections,
                savedAt = DateTime.UtcNow
            };
            
            return Ok(new
            {
                success = true,
                message = "Estado de navegação salvo",
                state = state
            });
        }

        // Restaurar estado de navegação
        [HttpGet("state/{userId}")]
        public IActionResult GetNavigationState(string userId)
        {
            var state = new
            {
                userId = userId,
                openSections = new[] { "section1" },
                lastUpdated = DateTime.UtcNow.AddHours(-2)
            };
            
            return Ok(state);
        }
    }

    public class NavigationStateRequest
    {
        public string UserId { get; set; } = string.Empty;
        public List<string> OpenSections { get; set; } = new();
    }
}`;

    const faqs = [
        {
            id: 'faq1',
            question: t('components.collapsible.faq.question1'),
            answer: t('components.collapsible.faq.answer1')
        },
        {
            id: 'faq2',
            question: t('components.collapsible.faq.question2'),
            answer: t('components.collapsible.faq.answer2')
        },
        {
            id: 'faq3',
            question: t('components.collapsible.faq.question3'),
            answer: t('components.collapsible.faq.answer3')
        }
    ];

    const sections = [
        {
            id: 'section1',
            title: t('components.collapsible.sections.section1Title'),
            items: [t('components.collapsible.sections.section1Item1'), t('components.collapsible.sections.section1Item2')]
        },
        {
            id: 'section2',
            title: t('components.collapsible.sections.section2Title'),
            items: [t('components.collapsible.sections.section2Item1'), t('components.collapsible.sections.section2Item2')]
        },
        {
            id: 'section3',
            title: t('components.collapsible.sections.section3Title'),
            items: [t('components.collapsible.sections.section3Item1'), t('components.collapsible.sections.section3Item2')]
        }
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.collapsible.title')}</h2>
                <p className="text-muted-foreground text-lg">
                    {t('components.collapsible.description')}
                </p>
            </div>

            {/* Exemplo 1: Collapsible Básico */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.collapsible.basic.title')}</h3>
                    <p className="text-muted-foreground">{t('components.collapsible.basic.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card">
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="w-full space-y-2"
                    >
                        <div className="flex items-center justify-between space-x-4 px-4">
                            <h4 className="text-sm font-semibold">
                                {t('components.collapsible.basic.heading')}
                            </h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">{t('components.collapsible.basic.toggle')}</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <div className="rounded-md border px-4 py-3 text-sm">
                            {t('components.collapsible.basic.visibleContent')}
                        </div>
                        <CollapsibleContent className="space-y-2">
                            <div className="rounded-md border px-4 py-3 text-sm">
                                {t('components.collapsible.basic.hiddenContent1')}
                            </div>
                            <div className="rounded-md border px-4 py-3 text-sm">
                                {t('components.collapsible.basic.hiddenContent2')}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

                <CodeExample code={{ frontend: frontendCode1, backend: backendCode1 }} />
            </div>

            {/* Exemplo 2: FAQ Collapsible */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.collapsible.faq.title')}</h3>
                    <p className="text-muted-foreground">{t('components.collapsible.faq.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card space-y-2">
                    {faqs.map((faq) => (
                        <Collapsible
                            key={faq.id}
                            open={openFaqs.includes(faq.id)}
                            onOpenChange={() => toggleFaq(faq.id)}
                        >
                            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-accent">
                                <h4 className="text-sm font-semibold text-left">{faq.question}</h4>
                                <ChevronDown 
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        openFaqs.includes(faq.id) ? 'rotate-180' : ''
                                    }`}
                                />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground">
                                {faq.answer}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>

                <CodeExample code={{ frontend: frontendCode2, backend: backendCode2 }} />
            </div>

            {/* Exemplo 3: Collapsible com Seções Múltiplas */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{t('components.collapsible.sections.title')}</h3>
                    <p className="text-muted-foreground">{t('components.collapsible.sections.description')}</p>
                </div>

                <div className="p-6 border rounded-lg bg-card space-y-2">
                    {sections.map((section) => (
                        <Collapsible
                            key={section.id}
                            open={openSections.includes(section.id)}
                            onOpenChange={() => toggleSection(section.id)}
                        >
                            <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg border p-3 hover:bg-accent">
                                <ChevronRight 
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        openSections.includes(section.id) ? 'rotate-90' : ''
                                    }`}
                                />
                                <span className="font-medium text-sm">{section.title}</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-6 py-2 space-y-2">
                                {section.items.map((item, index) => (
                                    <div key={index} className="text-sm text-muted-foreground py-1">
                                        • {item}
                                    </div>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>

                <CodeExample code={{ frontend: frontendCode3, backend: backendCode3 }} />
            </div>
        </div>
    );
};

export default CollapsibleExamples;
