import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { exchangeRateService } from '@/services/exchangeRateService';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

export const CURRENCY_CONFIG: Record<string, CurrencyConfig> = {
  pt: {
    code: 'BRL',
    symbol: 'R$',
    locale: 'pt-BR'
  },
  en: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US'
  },
  es: {
    code: 'EUR',
    symbol: '€',
    locale: 'es-ES'
  }
};

/**
 * Hook para formatação de moeda baseada no idioma atual com API real
 */
export function useCurrency() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currencyConfig = CURRENCY_CONFIG[currentLanguage] || CURRENCY_CONFIG.pt;

  // Estado para cache local das taxas
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  /**
   * Carrega taxas de câmbio da API
   */
  const loadExchangeRates = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const rates = await exchangeRateService.getExchangeRates('BRL', forceRefresh);
      setExchangeRates(rates);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega taxas na inicialização e quando o idioma muda
  useEffect(() => {
    loadExchangeRates();
  }, [loadExchangeRates, currentLanguage]);

  /**
   * Formata um valor numérico para moeda baseada no idioma atual
   * @param value - Valor numérico a ser formatado
   * @param options - Opções adicionais de formatação
   */
  const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      ...options
    }).format(value);
  };

  /**
   * Converte um valor de BRL para a moeda do idioma atual usando API real
   * @param brlValue - Valor em Real Brasileiro
   */
  const convertFromBRL = useCallback((brlValue: number): number => {
    if (currencyConfig.code === 'BRL') {
      return brlValue;
    }

    const rate = exchangeRates[currencyConfig.code];
    if (rate) {
      return brlValue * rate;
    }

    // Fallback para taxas estáticas se API não carregou ainda
    const fallbackRates = {
      USD: 0.20,
      EUR: 0.18
    };
    
    const fallbackRate = fallbackRates[currencyConfig.code as keyof typeof fallbackRates];
    return fallbackRate ? brlValue * fallbackRate : brlValue;
  }, [currencyConfig.code, exchangeRates]);

  /**
   * Formata um valor que está em BRL convertendo para a moeda atual
   * @param brlValue - Valor em Real Brasileiro
   * @param options - Opções adicionais de formatação
   */
  const formatBRLValue = useCallback((brlValue: number, options?: Intl.NumberFormatOptions) => {
    const convertedValue = convertFromBRL(brlValue);
    return formatCurrency(convertedValue, options);
  }, [convertFromBRL, formatCurrency]);

  /**
   * Converte entre duas moedas quaisquer
   * @param amount - Valor a ser convertido
   * @param fromCurrency - Moeda de origem
   * @param toCurrency - Moeda de destino
   */
  const convertCurrency = useCallback(async (amount: number, fromCurrency: string, toCurrency: string) => {
    return await exchangeRateService.convertCurrency(amount, fromCurrency, toCurrency);
  }, []);

  /**
   * Força atualização das taxas
   */
  const refreshRates = useCallback(() => {
    loadExchangeRates(true);
  }, [loadExchangeRates]);

  return {
    formatCurrency,
    formatBRLValue,
    convertFromBRL,
    convertCurrency,
    refreshRates,
    currencyConfig,
    currentLanguage,
    exchangeRates,
    isLoading,
    lastUpdate
  };
}