/**
 * Serviço para obter taxas de câmbio em tempo real
 * Usa a ExchangeRate-API (gratuita) com fallback para taxas estáticas
 */

export interface ExchangeRates {
  [currencyCode: string]: number;
}

export interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: ExchangeRates;
}

class ExchangeRateService {
  private readonly baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  private cache = new Map<string, { data: ExchangeRates; timestamp: number; }>();
  private readonly cacheTimeout = 3600000; // 1 hora em ms

  // Taxas fallback (estáticas) caso a API falhe
  private readonly fallbackRates: Record<string, ExchangeRates> = {
    BRL: {
      BRL: 1,
      USD: 0.20,
      EUR: 0.18,
      GBP: 0.16,
      JPY: 30.0,
      CAD: 0.27,
      AUD: 0.30,
      CHF: 0.18
    },
    USD: {
      USD: 1,
      BRL: 5.0,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 150.0,
      CAD: 1.35,
      AUD: 1.52,
      CHF: 0.91
    },
    EUR: {
      EUR: 1,
      BRL: 5.45,
      USD: 1.09,
      GBP: 0.86,
      JPY: 163.0,
      CAD: 1.47,
      AUD: 1.65,
      CHF: 0.99
    }
  };

  /**
   * Obtém taxas de câmbio para uma moeda base
   * @param baseCurrency - Moeda base (ex: 'BRL', 'USD', 'EUR')
   * @param forceRefresh - Força atualização ignorando cache
   */
  async getExchangeRates(baseCurrency: string, forceRefresh = false): Promise<ExchangeRates> {
    const cacheKey = baseCurrency.toUpperCase();
    const now = Date.now();

    // Verifica cache se não for refresh forçado
    if (!forceRefresh && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (now - cached.timestamp < this.cacheTimeout) {
        console.log(`[ExchangeRate] Using cached rates for ${baseCurrency}`);
        return cached.data;
      }
    }

    try {
      console.log(`[ExchangeRate] Fetching rates from API for ${baseCurrency}`);
      const response = await fetch(`${this.baseUrl}/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ExchangeRateResponse = await response.json();
      
      if (data.result !== 'success') {
        throw new Error('API returned error result');
      }

      // Armazena no cache
      this.cache.set(cacheKey, {
        data: data.conversion_rates,
        timestamp: now
      });

      console.log(`[ExchangeRate] Successfully fetched rates for ${baseCurrency}`);
      return data.conversion_rates;

    } catch (error) {
      console.warn(`[ExchangeRate] API failed for ${baseCurrency}, using fallback:`, error);
      
      // Usa taxas fallback
      const fallbackData = this.fallbackRates[cacheKey] || this.fallbackRates.BRL;
      
      // Armazena fallback no cache por menos tempo (15 min)
      this.cache.set(cacheKey, {
        data: fallbackData,
        timestamp: now - (this.cacheTimeout - 900000) // Expira em 15 min
      });

      return fallbackData;
    }
  }

  /**
   * Converte um valor de uma moeda para outra
   * @param amount - Valor a ser convertido
   * @param fromCurrency - Moeda de origem
   * @param toCurrency - Moeda de destino
   */
  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const rates = await this.getExchangeRates(fromCurrency);
    const rate = rates[toCurrency.toUpperCase()];

    if (!rate) {
      console.warn(`[ExchangeRate] Rate not found for ${fromCurrency} -> ${toCurrency}`);
      return amount; // Retorna valor original se taxa não encontrada
    }

    return amount * rate;
  }

  /**
   * Obtém uma taxa específica entre duas moedas
   * @param fromCurrency - Moeda de origem
   * @param toCurrency - Moeda de destino
   */
  async getRate(fromCurrency: string, toCurrency: string): Promise<number> {
    if (fromCurrency === toCurrency) {
      return 1;
    }

    const rates = await this.getExchangeRates(fromCurrency);
    return rates[toCurrency.toUpperCase()] || 1;
  }

  /**
   * Limpa o cache de taxas
   */
  clearCache(): void {
    this.cache.clear();
    console.log('[ExchangeRate] Cache cleared');
  }

  /**
   * Obtém informações do cache
   */
  getCacheInfo(): { size: number; keys: string[]; } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Pré-carrega taxas para as moedas principais
   */
  async preloadMainCurrencies(): Promise<void> {
    const mainCurrencies = ['BRL', 'USD', 'EUR'];
    const promises = mainCurrencies.map(currency => 
      this.getExchangeRates(currency).catch(error => 
        console.warn(`Failed to preload ${currency}:`, error)
      )
    );
    
    await Promise.allSettled(promises);
    console.log('[ExchangeRate] Main currencies preloaded');
  }
}

// Singleton instance
export const exchangeRateService = new ExchangeRateService();

// Pré-carrega taxas principais na inicialização
if (typeof window !== 'undefined') {
  exchangeRateService.preloadMainCurrencies();
}