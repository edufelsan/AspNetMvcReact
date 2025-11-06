import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

// Português é o idioma padrão quando não há detecção
const DEFAULT_FALLBACK = 'pt';

// Função para detectar idioma inicial
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_FALLBACK;
  
  // Verifica localStorage primeiro
  const stored = localStorage.getItem('i18nextLng');
  if (stored && ['en', 'pt', 'es'].includes(stored)) {
    console.log('🔍 Idioma encontrado no localStorage:', stored);
    return stored;
  }
  
  // Verifica idioma do navegador
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'pt', 'es'].includes(browserLang)) {
    console.log('🌐 Idioma do navegador detectado:', browserLang);
    return browserLang;
  }
  
  console.log('🔄 Usando idioma padrão:', DEFAULT_FALLBACK);
  return DEFAULT_FALLBACK;
};

const initialLanguage = getInitialLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    fallbackLng: DEFAULT_FALLBACK,
    debug: false,
    
    resources: {
      en: {
        translation: en
      },
      pt: {
        translation: pt
      },
      es: {
        translation: es
      }
    },

    interpolation: {
      escapeValue: false
    },
    
    supportedLngs: ['en', 'pt', 'es'],
    
    // Configuração de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  }).then(() => {
    console.log('✅ i18n inicializado com idioma:', i18n.language);
  });

export default i18n;