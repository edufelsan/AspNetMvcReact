import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Componente para garantir inicialização correta do i18n
 * Deve ser usado no início da aplicação
 */
export default function I18nInitializer() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Aguarda a inicialização do i18n
    const checkI18nReady = () => {
      if (i18n.isInitialized) {
        console.log('✅ I18n inicializado - Idioma atual:', i18n.language);
        
        // Se não há idioma definido ou é inválido, força detecção
        if (!i18n.language || i18n.language === 'cimode' || !['en', 'pt', 'es'].includes(i18n.language)) {
          console.log('⚠️ Idioma inválido detectado, forçando detecção...');
          
          const storedLang = localStorage.getItem('i18nextLng');
          if (storedLang && ['en', 'pt', 'es'].includes(storedLang)) {
            i18n.changeLanguage(storedLang);
          } else {
            const browserLang = navigator.language.split('-')[0];
            const finalLang = ['en', 'pt', 'es'].includes(browserLang) ? browserLang : 'pt';
            i18n.changeLanguage(finalLang);
          }
        }
      } else {
        // Se ainda não inicializou, tenta novamente em 100ms
        setTimeout(checkI18nReady, 100);
      }
    };

    checkI18nReady();
  }, [i18n]);

  return null; // Componente invisível
}