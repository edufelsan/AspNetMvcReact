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

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

public class EditorController : Controller
{
    public class EditorAction
    {
        public string Name { get; set; } = "";
        public string Icon { get; set; } = "";
        public string Action { get; set; } = "";
        public bool IsActive { get; set; }
    }

    [HttpGet("/api/editor/formatting-actions")]
    public IActionResult GetFormattingActions()
    {
        var actions = new[]
        {
            new EditorAction 
            { 
                Name = "Bold", 
                Icon = "Bold", 
                Action = "toggleBold",
                IsActive = false 
            },
            new EditorAction 
            { 
                Name = "Italic", 
                Icon = "Italic", 
                Action = "toggleItalic",
                IsActive = false 
            },
            new EditorAction 
            { 
                Name = "Underline", 
                Icon = "Underline", 
                Action = "toggleUnderline",
                IsActive = false 
            }
        };
        
        return Json(actions);
    }

    [HttpPost("/api/editor/apply-formatting")]
    public IActionResult ApplyFormatting([FromBody] string action)
    {
        return Json(new { Success = true, Action = action });
    }
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

public class TextEditorController : Controller
{
    public class AlignmentOption
    {
        public string Value { get; set; } = "";
        public string Label { get; set; } = "";
        public string Icon { get; set; } = "";
    }

    [HttpGet("/api/text-editor/alignment-options")]
    public IActionResult GetAlignmentOptions()
    {
        var options = new[]
        {
            new AlignmentOption 
            { 
                Value = "left", 
                Label = "Align Left", 
                Icon = "AlignLeft" 
            },
            new AlignmentOption 
            { 
                Value = "center", 
                Label = "Align Center", 
                Icon = "AlignCenter" 
            },
            new AlignmentOption 
            { 
                Value = "right", 
                Label = "Align Right", 
                Icon = "AlignRight" 
            }
        };
        
        return Json(options);
    }

    [HttpPost("/api/text-editor/set-alignment")]
    public IActionResult SetAlignment([FromBody] string alignment)
    {
        // Save user preference
        return Json(new 
        { 
            Success = true, 
            Alignment = alignment,
            Message = $"Text alignment changed to {alignment}"
        });
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

public class DocumentController : Controller
{
    public class DocumentAction
    {
        public string Id { get; set; } = "";
        public string Label { get; set; } = "";
        public string Icon { get; set; } = "";
        public string Endpoint { get; set; } = "";
    }

    [HttpGet("/api/document/{documentId}/actions")]
    public IActionResult GetDocumentActions(int documentId)
    {
        var actions = new[]
        {
            new DocumentAction 
            { 
                Id = "copy", 
                Label = "Copy", 
                Icon = "Copy",
                Endpoint = $"/api/document/{documentId}/copy"
            },
            new DocumentAction 
            { 
                Id = "download", 
                Label = "Download", 
                Icon = "Download",
                Endpoint = $"/api/document/{documentId}/download"
            },
            new DocumentAction 
            { 
                Id = "share", 
                Label = "Share", 
                Icon = "Share2",
                Endpoint = $"/api/document/{documentId}/share"
            }
        };
        
        return Json(actions);
    }

    [HttpPost("/api/document/{documentId}/copy")]
    public IActionResult CopyDocument(int documentId)
    {
        return Json(new { Success = true, Message = "Document copied to clipboard" });
    }

    [HttpGet("/api/document/{documentId}/download")]
    public IActionResult DownloadDocument(int documentId)
    {
        return Json(new { Success = true, DownloadUrl = $"/downloads/document-{documentId}.pdf" });
    }

    [HttpPost("/api/document/{documentId}/share")]
    public IActionResult ShareDocument(int documentId, [FromBody] string[] recipients)
    {
        return Json(new { Success = true, Message = $"Document shared with {recipients.Length} recipients" });
    }
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
