import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CodeExample } from '../CodeExample';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Copy, Download, Share2 } from 'lucide-react';

const ButtonGroupExamples: React.FC = () => {
    const { t } = useTranslation();

    const frontendCode1 = `import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline } from "lucide-react"

export function BasicButtonGroup() {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button variant="outline" className="rounded-r-none">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="rounded-none border-x-0">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="rounded-l-none">
        <Underline className="h-4 w-4" />
      </Button>
    </div>
  )
}`;

    const backendCode1 = `// Controllers/EditorController.cs
public class EditorController : Controller
{
    private readonly IEditorService _editorService;
    private readonly IUserPreferenceService _preferenceService;
    private readonly UserManager<ApplicationUser> _userManager;

    public EditorController(
        IEditorService editorService,
        IUserPreferenceService preferenceService, 
        UserManager<ApplicationUser> userManager)
    {
        _editorService = editorService;
        _preferenceService = preferenceService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var formattingActions = await _editorService.GetFormattingActionsAsync(user.Id);
        var userPreferences = await _preferenceService.GetEditorPreferencesAsync(user.Id);
        
        return Inertia.Render("Editor/Index", new { 
            formattingActions,
            userPreferences
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ApplyFormatting([FromForm] ApplyFormattingRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        await _editorService.ApplyFormattingAsync(user.Id, request.Action, request.Content);
        
        return Inertia.Back().With("success", $"Formatting '{request.Action}' applied successfully!");
    }
}

// Models/EditorAction.cs
public class EditorAction
{
    public string Name { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Action { get; set; } = "";
    public bool IsActive { get; set; }
    public string Shortcut { get; set; } = "";
}

// Models/ApplyFormattingRequest.cs
public class ApplyFormattingRequest
{
    public string Action { get; set; } = "";
    public string Content { get; set; } = "";
}`;

    const frontendCode2 = `import { Button } from "@/components/ui/button"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { useState } from "react"

export function ButtonGroupWithState() {
  const [alignment, setAlignment] = useState("left")

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button
        variant={alignment === "left" ? "default" : "outline"}
        className="rounded-r-none"
        onClick={() => setAlignment("left")}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant={alignment === "center" ? "default" : "outline"}
        className="rounded-none border-x-0"
        onClick={() => setAlignment("center")}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant={alignment === "right" ? "default" : "outline"}
        className="rounded-l-none"
        onClick={() => setAlignment("right")}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  )
}`;

    const backendCode2 = `// Controllers/TextEditorController.cs
public class TextEditorController : Controller
{
    private readonly ITextEditorService _textEditorService;
    private readonly IUserPreferenceService _preferenceService;
    private readonly UserManager<ApplicationUser> _userManager;

    public TextEditorController(
        ITextEditorService textEditorService,
        IUserPreferenceService preferenceService,
        UserManager<ApplicationUser> userManager)
    {
        _textEditorService = textEditorService;
        _preferenceService = preferenceService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> AlignmentOptions()
    {
        var user = await _userManager.GetUserAsync(User);
        var currentAlignment = await _preferenceService.GetAlignmentPreferenceAsync(user.Id);
        
        var options = new[]
        {
            new AlignmentOption { Value = "left", Label = "Align Left", Icon = "AlignLeft" },
            new AlignmentOption { Value = "center", Label = "Align Center", Icon = "AlignCenter" },
            new AlignmentOption { Value = "right", Label = "Align Right", Icon = "AlignRight" }
        };
        
        return Inertia.Render("TextEditor/AlignmentOptions", new { 
            options,
            currentAlignment
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SetAlignment([FromForm] SetAlignmentRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        await _preferenceService.SaveAlignmentPreferenceAsync(user.Id, request.Alignment);
        
        return Inertia.Back().With("success", $"Text alignment changed to {request.Alignment}");
    }
}

// Models/AlignmentOption.cs
public class AlignmentOption
{
    public string Value { get; set; } = "";
    public string Label { get; set; } = "";
    public string Icon { get; set; } = "";
}

// Models/SetAlignmentRequest.cs
public class SetAlignmentRequest
{
    public string Alignment { get; set; } = "left";
}`;

    const frontendCode3 = `import { Button } from "@/components/ui/button"
import { Copy, Download, Share2 } from "lucide-react"

export function ButtonGroupWithLabels() {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button variant="outline" className="rounded-r-none gap-2">
        <Copy className="h-4 w-4" />
        Copy
      </Button>
      <Button variant="outline" className="rounded-none border-x-0 gap-2">
        <Download className="h-4 w-4" />
        Download
      </Button>
      <Button variant="outline" className="rounded-l-none gap-2">
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  )
}`;

    const backendCode3 = `// Controllers/DocumentController.cs
public class DocumentController : Controller
{
    private readonly IDocumentService _documentService;
    private readonly IShareService _shareService;
    private readonly UserManager<ApplicationUser> _userManager;

    public DocumentController(
        IDocumentService documentService,
        IShareService shareService,
        UserManager<ApplicationUser> userManager)
    {
        _documentService = documentService;
        _shareService = shareService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var document = await _documentService.GetDocumentAsync(id);
        if (document == null) return NotFound();
        
        var actions = new[]
        {
            new DocumentAction { Id = "copy", Label = "Copy", Icon = "Copy", IsEnabled = true },
            new DocumentAction { Id = "download", Label = "Download", Icon = "Download", IsEnabled = true },
            new DocumentAction { Id = "share", Label = "Share", Icon = "Share2", IsEnabled = document.IsShareable }
        };
        
        return Inertia.Render("Documents/Details", new { 
            document,
            actions
        });
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Copy(int id)
    {
        var document = await _documentService.GetDocumentAsync(id);
        if (document == null) return NotFound();
        
        var copyLink = await _documentService.CreateCopyLinkAsync(document.Id);
        
        return Inertia.Back().With("success", "Document copy link created!")
                            .With("copyLink", copyLink);
    }

    [HttpGet]
    public async Task<IActionResult> Download(int id)
    {
        var document = await _documentService.GetDocumentAsync(id);
        if (document == null) return NotFound();
        
        var fileBytes = await _documentService.GetDocumentBytesAsync(id);
        return File(fileBytes, "application/pdf", $"{document.Title}.pdf");
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Share(int id, [FromForm] ShareDocumentRequest request)
    {
        var document = await _documentService.GetDocumentAsync(id);
        if (document == null) return NotFound();
        
        await _shareService.ShareDocumentAsync(document.Id, request.Recipients);
        
        return Inertia.Back().With("success", 
            $"Document shared with {request.Recipients.Length} recipients");
    }
}

// Models/DocumentAction.cs
public class DocumentAction
{
    public string Id { get; set; } = "";
    public string Label { get; set; } = "";
    public string Icon { get; set; } = "";
    public bool IsEnabled { get; set; } = true;
}

// Models/ShareDocumentRequest.cs
public class ShareDocumentRequest
{
    public string[] Recipients { get; set; } = Array.Empty<string>();
}`;

    const [alignment, setAlignment] = React.useState('left');

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">{t('components.buttonGroup.title')}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {t('components.buttonGroup.description')}
                </p>
            </div>

            {/* Example 1: Basic Button Group */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.buttonGroup.basic.title')}</h3>
                <p className="text-muted-foreground">{t('components.buttonGroup.basic.description')}</p>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <Button variant="outline" className="rounded-r-none" size="sm">
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="rounded-none border-x-0" size="sm">
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="rounded-l-none" size="sm">
                        <Underline className="h-4 w-4" />
                    </Button>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode1, backend: backendCode1 }}
                />
            </div>

            {/* Example 2: Button Group with State */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.buttonGroup.withState.title')}</h3>
                <p className="text-muted-foreground">{t('components.buttonGroup.withState.description')}</p>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <Button
                        variant={alignment === 'left' ? 'default' : 'outline'}
                        className="rounded-r-none"
                        size="sm"
                        onClick={() => setAlignment('left')}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={alignment === 'center' ? 'default' : 'outline'}
                        className="rounded-none border-x-0"
                        size="sm"
                        onClick={() => setAlignment('center')}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={alignment === 'right' ? 'default' : 'outline'}
                        className="rounded-l-none"
                        size="sm"
                        onClick={() => setAlignment('right')}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t('components.buttonGroup.withState.currentAlignment')}: <span className="font-medium">{alignment}</span>
                </p>
                <CodeExample
                    code={{ frontend: frontendCode2, backend: backendCode2 }}
                />
            </div>

            {/* Example 3: Button Group with Labels */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">{t('components.buttonGroup.withLabels.title')}</h3>
                <p className="text-muted-foreground">{t('components.buttonGroup.withLabels.description')}</p>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <Button variant="outline" className="rounded-r-none gap-2">
                        <Copy className="h-4 w-4" />
                        {t('components.buttonGroup.withLabels.copy')}
                    </Button>
                    <Button variant="outline" className="rounded-none border-x-0 gap-2">
                        <Download className="h-4 w-4" />
                        {t('components.buttonGroup.withLabels.download')}
                    </Button>
                    <Button variant="outline" className="rounded-l-none gap-2">
                        <Share2 className="h-4 w-4" />
                        {t('components.buttonGroup.withLabels.share')}
                    </Button>
                </div>
                <CodeExample
                    code={{ frontend: frontendCode3, backend: backendCode3 }}
                />
            </div>
        </div>
    );
};

export default ButtonGroupExamples;
