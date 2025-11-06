import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

// Componentes de bandeiras mais detalhados
const BrazilFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#009739"/>
    <polygon points="10,2 17,7 10,12 3,7" fill="#FEDD00"/>
    <circle cx="10" cy="7" r="2.5" fill="#012169"/>
    <g fill="#FEDD00" fontSize="6" textAnchor="middle">
      <text x="10" y="8.5" style={{fontSize: '2px', fontFamily: 'Arial'}}>★</text>
    </g>
  </svg>
);

const USAFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#B22234"/>
    {[0,1,2,3,4,5,6].map(i => (
      <rect key={i} width="20" height="1" y={1 + i*2} fill="white"/>
    ))}
    <rect width="8" height="7" fill="#3C3B6E"/>
    <g fill="white">
      {[0,1,2,3,4].map(row => 
        [0,1,2,3,4,5].map(col => {
          if ((row % 2 === 0 && col < 6) || (row % 2 === 1 && col < 5)) {
            return <circle key={`${row}-${col}`} cx={1 + col * 1.3} cy={1 + row * 1.2} r="0.3"/>
          }
          return null;
        })
      )}
    </g>
  </svg>
);

const SpainFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded border border-gray-200">
    <rect width="20" height="14" fill="#C60B1E"/>
    <rect width="20" height="8" y="3" fill="#FFC400"/>
    <g transform="translate(4,7)">
      <rect width="3" height="2" fill="#C60B1E"/>
      <rect width="1" height="3" x="1" y="-0.5" fill="#FFC400"/>
    </g>
  </svg>
);

const languages = [
  { code: 'pt', name: 'Português', flag: <BrazilFlag /> },
  { code: 'en', name: 'English', flag: <USAFlag /> },
  { code: 'es', name: 'Español', flag: <SpainFlag /> },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>('');

  // Monitora mudanças no idioma do i18n
  useEffect(() => {
    const updateLanguage = () => {
      const lang = i18n.language;
      console.log('🔄 LanguageSelector - Idioma atual:', lang);
      
      if (lang && languages.find(l => l.code === lang)) {
        setCurrentLang(lang);
      } else {
        setCurrentLang('pt'); // fallback
      }
    };

    // Atualiza imediatamente
    updateLanguage();
    
    // Escuta mudanças de idioma
    i18n.on('languageChanged', updateLanguage);
    
    return () => {
      i18n.off('languageChanged', updateLanguage);
    };
  }, [i18n]);

  const changeLanguage = (languageCode: string) => {
    console.log('🌍 Mudando idioma para:', languageCode);
    i18n.changeLanguage(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`gap-2 flex items-center ${currentLang === language.code ? 'bg-accent' : ''}`}
          >
            {language.flag}
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}