import { useCurrency } from '@/hooks/useCurrency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Globe, Clock, Wifi, WifiOff } from 'lucide-react';

/**
 * Componente que exibe informações sobre o sistema de câmbio
 */
export function CurrencyStatus() {
  const { t } = useTranslation();
  const { 
    currencyConfig, 
    isLoading, 
    lastUpdate, 
    refreshRates,
    exchangeRates 
  } = useCurrency();

  const hasRates = Object.keys(exchangeRates).length > 0;
  const isOnline = navigator.onLine;

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return t('currency.never');
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return t('currency.justNow');
    if (diffMins < 60) return t('currency.minutesAgo', { count: diffMins });
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t('currency.hoursAgo', { count: diffHours });
    
    return date.toLocaleDateString();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5" />
            {t('currency.status.title')}
            <Badge variant={hasRates ? 'default' : 'secondary'} className="ml-2">
              {currencyConfig.code}
            </Badge>
          </CardTitle>
          
          <Button
            variant="outline"
            size="sm"
            onClick={refreshRates}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {t('currency.status.refresh')}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status da Conexão */}
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-600" />
            )}
            <div>
              <p className="font-medium text-sm">
                {t('currency.status.connection')}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOnline ? t('currency.status.online') : t('currency.status.offline')}
              </p>
            </div>
          </div>

          {/* Última Atualização */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-sm">
                {t('currency.status.lastUpdate')}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatLastUpdate(lastUpdate)}
              </p>
            </div>
          </div>

          {/* Taxa Atual */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center bg-primary/10 rounded text-primary font-bold text-xs">
              {currencyConfig.symbol}
            </div>
            <div>
              <p className="font-medium text-sm">
                {t('currency.status.currentRate')}
              </p>
              <p className="text-xs text-muted-foreground">
                {currencyConfig.code === 'BRL' 
                  ? '1.00 BRL = 1.00 BRL'
                  : `1.00 BRL = ${(exchangeRates[currencyConfig.code] || 0).toFixed(3)} ${currencyConfig.code}`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Informação adicional quando offline */}
        {!isOnline && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ {t('currency.status.offlineWarning')}
            </p>
          </div>
        )}

        {/* Informação quando carregando */}
        {isLoading && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              🔄 {t('currency.status.loading')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}