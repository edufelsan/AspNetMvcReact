import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeExample {
    frontend?: string;
    backend?: string;
}

interface CodeExampleProps {
    code: CodeExample;
    className?: string;
}

export function CodeExample({ code, className = "" }: CodeExampleProps) {
    const { toast } = useToast();
    const [copiedTab, setCopiedTab] = useState<string | null>(null);

    const copyCode = (codeText: string, tabName: string) => {
        navigator.clipboard.writeText(codeText);
        setCopiedTab(tabName);
        toast({
            title: "Código copiado!",
            description: `Código ${tabName} copiado para clipboard.`,
        });
        
        // Reset copied state after 2 seconds
        setTimeout(() => setCopiedTab(null), 2000);
    };

    const hasContent = code.frontend || code.backend;
    if (!hasContent) return null;

    return (
        <Card className={`mt-4 ${className}`}>
            <CardContent className="p-0">
                <Tabs defaultValue={code.frontend ? "frontend" : "backend"} className="w-full">
                    <div className="flex items-center justify-between border-b px-4 py-2">
                        <TabsList className="grid w-fit grid-cols-2">
                            {code.frontend && (
                                <TabsTrigger value="frontend" className="text-xs">
                                    Frontend (React)
                                </TabsTrigger>
                            )}
                            {code.backend && (
                                <TabsTrigger value="backend" className="text-xs">
                                    Backend (C#)
                                </TabsTrigger>
                            )}
                        </TabsList>
                        <Badge variant="outline" className="text-xs">
                            Exemplo de Código
                        </Badge>
                    </div>

                    {code.frontend && (
                        <TabsContent value="frontend" className="relative">
                            <div className="absolute top-2 right-2 z-10">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyCode(code.frontend!, 'Frontend')}
                                    className="h-8 w-8 p-0"
                                >
                                    {copiedTab === 'Frontend' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <pre className="p-4 text-xs overflow-x-auto bg-muted/50 rounded-none">
                                <code className="language-tsx">{code.frontend}</code>
                            </pre>
                        </TabsContent>
                    )}

                    {code.backend && (
                        <TabsContent value="backend" className="relative">
                            <div className="absolute top-2 right-2 z-10">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyCode(code.backend!, 'Backend')}
                                    className="h-8 w-8 p-0"
                                >
                                    {copiedTab === 'Backend' ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <pre className="p-4 text-xs overflow-x-auto bg-muted/50 rounded-none">
                                <code className="language-csharp">{code.backend}</code>
                            </pre>
                        </TabsContent>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
}