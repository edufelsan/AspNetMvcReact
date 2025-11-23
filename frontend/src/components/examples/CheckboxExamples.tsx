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

    const backendCode1 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserPreferencesController : ControllerBase
    {
        // Aceitar termos de serviço
        [HttpPost("accept-terms")]
        public IActionResult AcceptTerms([FromBody] TermsAcceptanceRequest request)
        {
            if (!request.Accepted)
                return BadRequest("Você deve aceitar os termos para continuar");

            var acceptance = new
            {
                userId = request.UserId,
                accepted = true,
                acceptedAt = DateTime.UtcNow,
                ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
                termsVersion = "1.0"
            };
            
            return Ok(new
            {
                success = true,
                message = "Termos aceitos com sucesso",
                data = acceptance
            });
        }
    }

    public class TermsAcceptanceRequest
    {
        public string UserId { get; set; } = string.Empty;
        public bool Accepted { get; set; }
    }
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

    const backendCode2 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        // Atualizar preferências de notificação
        [HttpPut("preferences")]
        public IActionResult UpdateNotificationPreferences([FromBody] NotificationPreferencesRequest request)
        {
            var preferences = new
            {
                userId = request.UserId,
                email = request.Email,
                push = request.Push,
                sms = request.Sms,
                updatedAt = DateTime.UtcNow
            };
            
            return Ok(new
            {
                success = true,
                message = "Preferências atualizadas com sucesso",
                preferences = preferences
            });
        }

        // Obter preferências atuais
        [HttpGet("preferences/{userId}")]
        public IActionResult GetNotificationPreferences(string userId)
        {
            var preferences = new
            {
                userId = userId,
                email = true,
                push = false,
                sms = false,
                lastUpdated = DateTime.UtcNow.AddDays(-5)
            };
            
            return Ok(preferences);
        }
    }

    public class NotificationPreferencesRequest
    {
        public string UserId { get; set; } = string.Empty;
        public bool Email { get; set; }
        public bool Push { get; set; }
        public bool Sms { get; set; }
    }
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

    const backendCode3 = `using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SelectionController : ControllerBase
    {
        // Processar seleção múltipla
        [HttpPost("process-selection")]
        public IActionResult ProcessSelection([FromBody] MultipleSelectionRequest request)
        {
            var processedItems = request.SelectedIds.Select(id => new
            {
                id = id,
                status = "Processed",
                processedAt = DateTime.UtcNow
            }).ToList();
            
            return Ok(new
            {
                success = true,
                totalProcessed = processedItems.Count,
                items = processedItems
            });
        }

        // Exportar itens selecionados
        [HttpPost("export")]
        public IActionResult ExportSelected([FromBody] ExportRequest request)
        {
            var exportData = new
            {
                exportId = Guid.NewGuid(),
                itemCount = request.SelectedIds.Count,
                format = request.Format,
                createdAt = DateTime.UtcNow,
                downloadUrl = $"/downloads/{Guid.NewGuid()}.{request.Format}"
            };
            
            return Ok(new
            {
                success = true,
                message = $"{request.SelectedIds.Count} itens exportados com sucesso",
                export = exportData
            });
        }

        // Deletar itens selecionados
        [HttpDelete("batch-delete")]
        public IActionResult BatchDelete([FromBody] BatchDeleteRequest request)
        {
            return Ok(new
            {
                success = true,
                message = $"{request.SelectedIds.Count} itens deletados com sucesso",
                deletedCount = request.SelectedIds.Count,
                deletedAt = DateTime.UtcNow
            });
        }
    }

    public class MultipleSelectionRequest
    {
        public List<string> SelectedIds { get; set; } = new();
    }

    public class ExportRequest
    {
        public List<string> SelectedIds { get; set; } = new();
        public string Format { get; set; } = "csv";
    }

    public class BatchDeleteRequest
    {
        public List<string> SelectedIds { get; set; } = new();
    }
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
