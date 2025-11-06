import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/useCurrency';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Componente de demonstração para testar formatação de moeda
 * Este componente pode ser adicionado temporariamente ao Dashboard para teste
 */
export function CurrencyDemo() {
  const { i18n } = useTranslation();
  const { formatCurrency, formatBRLValue, currencyConfig } = useCurrency();

  const testValues = [1000, 5000, 10000, 25000, 50000];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>🧪 Demonstração de Moeda</CardTitle>
        <p className="text-sm text-muted-foreground">
          Idioma atual: <strong>{i18n.language}</strong> | 
          Moeda: <strong>{currencyConfig.code}</strong> ({currencyConfig.symbol})
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Valores formatados (BRL convertido):</h4>
            <ul className="space-y-1">
              {testValues.map(value => (
                <li key={value} className="flex justify-between">
                  <span>R$ {value.toLocaleString('pt-BR')}</span>
                  <span className="font-mono">{formatBRLValue(value)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Valores diretos na moeda local:</h4>
            <ul className="space-y-1">
              {testValues.map(value => (
                <li key={value} className="flex justify-between">
                  <span>{value.toLocaleString()}</span>
                  <span className="font-mono">{formatCurrency(value)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>Como funciona:</strong> Os valores são convertidos de BRL usando taxas fictícias:
          </p>
          <ul className="text-xs mt-1 space-y-1">
            <li>🇧🇷 Português: Real Brasileiro (BRL) - R$ 1.000 = R$ 1.000</li>
            <li>🇺🇸 English: US Dollar (USD) - R$ 1.000 ≈ $200 (taxa: 0.20)</li>
            <li>🇪🇸 Español: Euro (EUR) - R$ 1.000 ≈ €180 (taxa: 0.18)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}