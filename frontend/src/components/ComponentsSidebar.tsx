import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
    MousePointer2, 
    AlertTriangle, 
    CreditCard,
    Home,
    MessageSquare,
    ChevronDown,
    RectangleHorizontal,
    User,
    Tag,
    Navigation,
    Group,
    Calendar as CalendarIcon,
    Image,
    BarChart3,
    CheckSquare,
    ChevronsUpDown,
    Terminal,
    Menu,
    Table as TableIcon
} from 'lucide-react';

interface ComponentsSidebarProps {
    selectedComponent: string;
    onSelectComponent: (component: string) => void;
}

interface ComponentItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    examples: number;
}



export function ComponentsSidebar({ selectedComponent, onSelectComponent }: ComponentsSidebarProps) {
    const { t } = useTranslation();
    
    const components: ComponentItem[] = [
        {
            id: 'overview',
            name: 'Overview',
            icon: Home,
            description: t('sidebar.overview.description'),
            examples: 0
        },
        {
            id: 'accordion',
            name: 'Accordion',
            icon: ChevronDown,
            description: t('sidebar.accordion.description'),
            examples: 3
        },
        {
            id: 'alert',
            name: 'Alert',
            icon: AlertTriangle,
            description: t('sidebar.alert.description'),
            examples: 6
        },
        {
            id: 'alertDialog',
            name: 'Alert Dialog',
            icon: MessageSquare,
            description: t('sidebar.alertDialog.description'),
            examples: 3
        },
        {
            id: 'aspectRatio',
            name: 'Aspect Ratio',
            icon: RectangleHorizontal,
            description: t('sidebar.aspectRatio.description'),
            examples: 3
        },
        {
            id: 'avatar',
            name: 'Avatar',
            icon: User,
            description: t('sidebar.avatar.description'),
            examples: 3
        },
        {
            id: 'badge',
            name: 'Badge',
            icon: Tag,
            description: t('sidebar.badge.description'),
            examples: 3
        },
        {
            id: 'breadcrumb',
            name: 'Breadcrumb',
            icon: Navigation,
            description: t('sidebar.breadcrumb.description'),
            examples: 3
        },
        {
            id: 'button',
            name: 'Button',
            icon: MousePointer2,
            description: t('sidebar.button.description'),
            examples: 8
        },
        {
            id: 'buttonGroup',
            name: 'Button Group',
            icon: Group,
            description: t('sidebar.buttonGroup.description'),
            examples: 3
        },
        {
            id: 'calendar',
            name: 'Calendar',
            icon: CalendarIcon,
            description: t('sidebar.calendar.description'),
            examples: 3
        },
        {
            id: 'card',
            name: 'Card',
            icon: CreditCard,
            description: t('sidebar.card.description'),
            examples: 7
        },
        {
            id: 'carousel',
            name: 'Carousel',
            icon: Image,
            description: t('sidebar.carousel.description'),
            examples: 3
        },
        {
            id: 'chart',
            name: 'Chart',
            icon: BarChart3,
            description: t('sidebar.chart.description'),
            examples: 3
        },
        {
            id: 'checkbox',
            name: 'Checkbox',
            icon: CheckSquare,
            description: t('sidebar.checkbox.description'),
            examples: 3
        },
        {
            id: 'collapsible',
            name: 'Collapsible',
            icon: ChevronsUpDown,
            description: t('sidebar.collapsible.description'),
            examples: 3
        },
        {
            id: 'combobox',
            name: 'Combobox',
            icon: ChevronsUpDown,
            description: t('sidebar.combobox.description'),
            examples: 3
        },
        {
            id: 'command',
            name: 'Command',
            icon: Terminal,
            description: t('sidebar.command.description'),
            examples: 3
        },
        {
            id: 'contextMenu',
            name: 'Context Menu',
            icon: Menu,
            description: t('sidebar.contextMenu.description'),
            examples: 3
        },
        {
            id: 'dataTable',
            name: 'Data Table',
            icon: TableIcon,
            description: t('sidebar.dataTable.description'),
            examples: 3
        },
        {
            id: 'datePicker',
            name: 'Date Picker',
            icon: CalendarIcon,
            description: t('sidebar.datePicker.description'),
            examples: 3
        },
        {
            id: 'dialog',
            name: 'Dialog',
            icon: MessageSquare,
            description: t('sidebar.dialog.description'),
            examples: 3
        },
        {
            id: 'drawer',
            name: 'Drawer',
            icon: Menu,
            description: t('sidebar.drawer.description'),
            examples: 3
        }
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 flex-shrink-0">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('sidebar.title')}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    {t('sidebar.description')}
                </p>
            </div>
            
            <Separator className="flex-shrink-0" />
            
            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1 pb-4">
                    {components.map((component) => {
                        const Icon = component.icon;
                        const isSelected = selectedComponent === component.id;
                        
                        return (
                            <Button
                                key={component.id}
                                variant={isSelected ? 'secondary' : 'ghost'}
                                className={cn(
                                    'w-full justify-between relative group',
                                    isSelected && 'bg-secondary border-l-2 border-l-primary'
                                )}
                                onClick={() => onSelectComponent(component.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon className={cn(
                                        'h-4 w-4 flex-shrink-0',
                                        isSelected ? 'text-primary' : 'text-muted-foreground'
                                    )} />
                                    <span className={cn(
                                        'text-sm font-medium',
                                        isSelected ? 'text-foreground' : 'text-foreground'
                                    )}>
                                        {component.name}
                                    </span>
                                </div>
                                
                                {component.examples > 0 && (
                                    <Badge 
                                        variant="outline" 
                                        className="text-xs px-1.5 py-0.5 h-5"
                                    >
                                        {component.examples}
                                    </Badge>
                                )}
                            </Button>
                        );
                    })}
                </div>
            </ScrollArea>
            
            <Separator className="flex-shrink-0" />
            
            <div className="p-4 space-y-2 flex-shrink-0">
                <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                        <span>{t('sidebar.stats.totalComponents')}</span>
                        <span className="font-medium">{components.length - 1}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t('sidebar.stats.examples')}</span>
                        <span className="font-medium">
                            {components.reduce((acc, comp) => acc + comp.examples, 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}