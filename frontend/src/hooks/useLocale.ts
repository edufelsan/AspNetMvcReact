import { useTranslation } from 'react-i18next';

interface LocaleConfig {
  locale: string;
  currency: string;
  currencySymbol: string;
  dateFormat: Intl.DateTimeFormatOptions;
  timeFormat: Intl.DateTimeFormatOptions;
  numberFormat: Intl.NumberFormatOptions;
}

const localeConfigs: Record<string, LocaleConfig> = {
  en: {
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    dateFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    timeFormat: { hour: '2-digit', minute: '2-digit' },
    numberFormat: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  },
  pt: {
    locale: 'pt-BR',
    currency: 'BRL',
    currencySymbol: 'R$',
    dateFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    timeFormat: { hour: '2-digit', minute: '2-digit' },
    numberFormat: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  },
  es: {
    locale: 'es-ES',
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    timeFormat: { hour: '2-digit', minute: '2-digit' },
    numberFormat: { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  }
};

/**
 * Hook para formatação localizada de números, datas e moedas
 */
export function useLocale() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const config = localeConfigs[currentLanguage] || localeConfigs.pt;

  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(config.locale, { ...config.numberFormat, ...options }).format(value);
  };

  const formatCurrency = (value: number, currencyCode?: string) => {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currencyCode || config.currency,
    }).format(value);
  };

  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return date.toLocaleDateString(config.locale, { ...config.dateFormat, ...options });
  };

  const formatTime = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return date.toLocaleTimeString(config.locale, { ...config.timeFormat, ...options });
  };

  const formatDateTime = (date: Date, dateOptions?: Intl.DateTimeFormatOptions, timeOptions?: Intl.DateTimeFormatOptions) => {
    const formattedDate = formatDate(date, dateOptions);
    const formattedTime = formatTime(date, timeOptions);
    return `${formattedDate} ${formattedTime}`;
  };

  return {
    locale: config.locale,
    currency: config.currency,
    currencySymbol: config.currencySymbol,
    formatNumber,
    formatCurrency,
    formatDate,
    formatTime,
    formatDateTime,
  };
}