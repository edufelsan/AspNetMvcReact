import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CodeExample } from '../CodeExample';

const AccordionExamples: React.FC = () => {
  const { t } = useTranslation();

  const frontendCode1 = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function BasicAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

  const backendCode1 = `// Controllers/HelpController.cs
public class HelpController : Controller
{
    private readonly IFaqService _faqService;

    public HelpController(IFaqService faqService)
    {
        _faqService = faqService;
    }

    [HttpGet]
    public IActionResult FAQ()
    {
        var faqs = _faqService.GetAllFaqs();
        return Inertia.Render("Help/FAQ", new { faqs });
    }
}

// Models/FAQ.cs
public class FAQ
{
    public int Id { get; set; }
    public string Question { get; set; } = "";
    public string Answer { get; set; } = "";
    public string Category { get; set; } = "";
}`;

  const frontendCode2 = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Feature {
  id: string;
  title: string;
  description: string;
}

export function FeaturesAccordion({ features }: { features: Feature[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {features.map((feature) => (
        <AccordionItem key={feature.id} value={feature.id}>
          <AccordionTrigger className="text-left">
            {feature.title}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}`;

  const backendCode2 = `// Controllers/ProductsController.cs
public class ProductsController : Controller
{
    [HttpGet]
    public IActionResult Features()
    {
        var features = new[]
        {
            new
            {
                Id = "performance",
                Title = "High Performance",
                Description = "Built with performance in mind, delivering fast load times and smooth interactions."
            },
            new
            {
                Id = "security",
                Title = "Enterprise Security",
                Description = "Bank-level encryption and security measures to protect your data."
            },
            new
            {
                Id = "scalability",
                Title = "Scalable Architecture",
                Description = "Grows with your business, from startup to enterprise scale."
            }
        };
        
        return Inertia.Render("Products/Features", new { features });
    }
}`;

  const frontendCode3 = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Setting {
  id: string;
  title: string;
  description: string;
  options: React.ReactNode;
}

export function SettingsAccordion({ settings }: { settings: Setting[] }) {
  return (
    <Accordion type="multiple" className="w-full">
      {settings.map((setting) => (
        <AccordionItem key={setting.id} value={setting.id}>
          <AccordionTrigger className="text-left">
            <div>
              <div className="font-semibold">{setting.title}</div>
              <div className="text-sm text-muted-foreground font-normal">
                {setting.description}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">{setting.options}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}`;

  const backendCode3 = `// Controllers/SettingsController.cs
public class SettingsController : Controller
{
    private readonly IUserSettingsService _settingsService;

    public SettingsController(IUserSettingsService settingsService)
    {
        _settingsService = settingsService;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Index()
    {
        var userSettings = _settingsService.GetUserSettings(User.Identity.Name);
        
        var settings = new[]
        {
            new
            {
                Id = "notifications",
                Title = "Notification Settings",
                Description = "Configure how you receive notifications",
                CurrentValue = userSettings.NotificationsEnabled
            },
            new
            {
                Id = "privacy",
                Title = "Privacy Settings",
                Description = "Manage your privacy preferences",
                CurrentValue = userSettings.ProfilePublic
            }
        };
        
        return Inertia.Render("Settings/Index", new { settings });
    }

    [HttpPost]
    public IActionResult Update([FromForm] UserSettings settings)
    {
        _settingsService.UpdateSettings(User.Identity.Name, settings);
        return Inertia.Back().With("success", "Settings updated successfully!");
    }
}`;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{t('components.accordion.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('components.accordion.description')}
        </p>
      </div>

      {/* Basic Accordion */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.accordion.basic.title')}</h3>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t('components.accordion.basic.question1')}</AccordionTrigger>
              <AccordionContent>
                {t('components.accordion.basic.answer1')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t('components.accordion.basic.question2')}</AccordionTrigger>
              <AccordionContent>
                {t('components.accordion.basic.answer2')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t('components.accordion.basic.question3')}</AccordionTrigger>
              <AccordionContent>
                {t('components.accordion.basic.answer3')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode1,
            backend: backendCode1
          }}
        />
      </div>

      {/* Features Accordion */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.accordion.features.title')}</h3>
        <div className="max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="performance">
              <AccordionTrigger className="text-left">
                {t('components.accordion.features.item1.title')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {t('components.accordion.features.item1.description')}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger className="text-left">
                {t('components.accordion.features.item2.title')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {t('components.accordion.features.item2.description')}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="scalability">
              <AccordionTrigger className="text-left">
                {t('components.accordion.features.item3.title')}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  {t('components.accordion.features.item3.description')}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode2,
            backend: backendCode2
          }}
        />
      </div>

      {/* Multiple Open Accordion */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('components.accordion.multiple.title')}</h3>
        <div className="max-w-2xl">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="notifications">
              <AccordionTrigger className="text-left">
                <div>
                  <div className="font-semibold">{t('components.accordion.multiple.item1.title')}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {t('components.accordion.multiple.item1.description')}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('components.accordion.multiple.item1.content')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger className="text-left">
                <div>
                  <div className="font-semibold">{t('components.accordion.multiple.item2.title')}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {t('components.accordion.multiple.item2.description')}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('components.accordion.multiple.item2.content')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="account">
              <AccordionTrigger className="text-left">
                <div>
                  <div className="font-semibold">{t('components.accordion.multiple.item3.title')}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {t('components.accordion.multiple.item3.description')}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('components.accordion.multiple.item3.content')}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeExample
          code={{
            frontend: frontendCode3,
            backend: backendCode3
          }}
        />
      </div>
    </div>
  );
};

export default AccordionExamples;
