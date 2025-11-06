# Sistema de Internacionalização (i18n)

O projeto agora suporta múltiplos idiomas usando **react-i18next**. Os idiomas suportados são:

- �� **Inglês (en)** - Idioma padrão
- �� **Português (pt)**
- 🇪🇸 **Espanhol (es)**

## Estrutura de Arquivos

```
src/
├── i18n.ts                    # Configuração do i18n
├── locales/                   # Arquivos de tradução
│   ├── en.json               # Inglês (padrão)
│   ├── pt.json               # Português
│   └── es.json               # Espanhol
└── components/
    └── LanguageSelector.tsx   # Componente seletor de idioma
```

## Como Usar

### 1. Em Componentes React

```tsx
import { useTranslation } from 'react-i18next';

function MeuComponente() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
    </div>
  );
}
```

### 2. Seletor de Idioma

O componente `LanguageSelector` já está incluído nas páginas principais:

```tsx
import LanguageSelector from '@/components/LanguageSelector';

function Header() {
  return (
    <header>
      <LanguageSelector />
    </header>
  );
}
```

### 3. Mudança de Idioma Programática

```tsx
import { useTranslation } from 'react-i18next';

function AlgumComponente() {
  const { i18n } = useTranslation();
  
  const mudarIdioma = (idioma: string) => {
    i18n.changeLanguage(idioma);
  };
  
  return (
    <button onClick={() => mudarIdioma('en')}>
      Mudar para Inglês
    </button>
  );
}
```

## Estrutura das Traduções

Os arquivos de tradução seguem uma estrutura hierárquica:

```json
{
  "welcome": {
    "title": "Título da Página",
    "hero": {
      "title": "Título do Hero",
      "description": "Descrição do Hero"
    }
  },
  "auth": {
    "login": {
      "title": "Login",
      "email": "Email"
    }
  }
}
```

## Páginas Traduzidas

✅ **Welcome Page** - Página inicial completamente traduzida
✅ **Login** - Formulário de login traduzido
✅ **Register** - Formulário de registro traduzido
✅ **Dashboard** - Painel principal traduzido

## Adicionando Novas Traduções

### 1. Adicione a chave nos arquivos JSON

**pt.json**
```json
{
  "novaSecao": {
    "titulo": "Novo Título",
    "descricao": "Nova descrição"
  }
}
```

**en.json**
```json
{
  "novaSecao": {
    "titulo": "New Title",
    "descricao": "New description"
  }
}
```

**es.json**
```json
{
  "novaSecao": {
    "titulo": "Nuevo Título",
    "descricao": "Nueva descripción"
  }
}
```

### 2. Use no componente

```tsx
const { t } = useTranslation();

return (
  <div>
    <h2>{t('novaSecao.titulo')}</h2>
    <p>{t('novaSecao.descricao')}</p>
  </div>
);
```

## Configurações

### Idioma Padrão
O idioma padrão é **Inglês (en)** e pode ser alterado em `src/i18n.ts`:

```typescript
.init({
  // ...
  fallbackLng: 'en', // Altere aqui
  // ...
});
```

### Detecção Automática
O sistema detecta automaticamente o idioma do usuário na seguinte ordem:
1. localStorage
2. Cookie
3. Navegador
4. Fallback (português)

### Persistência
O idioma escolhido é salvo automaticamente no **localStorage** e **cookie** do navegador.

## Boas Práticas

1. **Use chaves descritivas**: `auth.login.email` ao invés de `email`
2. **Mantenha consistência**: Use a mesma estrutura em todos os arquivos
3. **Teste todos os idiomas**: Verifique se todas as traduções estão corretas
4. **Use interpolação quando necessário**:
   ```tsx
   // JSON: "welcome": "Bem-vindo, {{name}}!"
   t('welcome', { name: user.name })
   ```

## Comandos Úteis

```bash
# Instalar dependências (já feito)
npm install react-i18next i18next i18next-browser-languagedetector

# Build do projeto
npm run build

# Desenvolvimento
npm run dev
```

---

**Desenvolvido com ❤️ para suportar nossa comunidade global!** 🌍