# ASP.NET Core + Inertia.js + React

Complete full-stack template with ASP.NET Core 8, Inertia.js, React 18, TypeScript, shadcn/ui, ASP.NET Core Identity, **multilingual support** (Portuguese, English, Spanish), **SEO optimization**, and **PWA ready**.

## 🌐 Live Demo

**🚀 [View Live Example](https://aspnetreact.dotforge.net/)** - See the template in action!

## 🛠️ Prerequisites

Before running this project, make sure you have the following installed:

- **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** (version 8.0 or later)
- **[Node.js](https://nodejs.org/)** (version 18 or later)
- **[MySQL Server](https://dev.mysql.com/downloads/mysql/)** (version 8.0 or later)
- **Git** for cloning the repository

## �🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/edufelsan/AspNetMvcReact.git
cd AspNetMvcReact
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. MySQL Database Setup

### 1. Configure MySQL Credentials

Edit the configuration files with your MySQL credentials:

**appsettings.json** (Production):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AspNetStackDb;User=root;Password=YOUR_PASSWORD_HERE;Port=3306;SslMode=None;"
  }
}
```

**appsettings.Development.json** (Development):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AspNetStackDb_Dev;User=root;Password=YOUR_PASSWORD_HERE;Port=3306;SslMode=None;"
  }
}
```

### 2. Create and Apply Migrations

After configuring the credentials, run the following commands:

```bash
# Create the initial Identity migration
dotnet ef migrations add InitialIdentitySetup

# Create the database and apply migrations
dotnet ef database update
```

### 4. Install .NET Packages

```bash
# Restore NuGet packages
dotnet restore
```

### 5. Build and Run

**Option A: Development Mode (Recommended)**
```bash
# Start frontend development server (in one terminal)
cd frontend
npm run dev

# Start backend with hot reload (in another terminal)
dotnet watch run
```

**Option B: Production Mode**
```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Run the application
dotnet run
```

### 6. Access the Application

- **Frontend**: https://localhost:5001 or http://localhost:5000
- **Development Server** (if using npm run dev): http://localhost:5173

## 🔧 Development Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

- **C# Dev Kit** - C# and .NET support
- **ES7+ React/Redux/React-Native snippets** - React snippets
- **Tailwind CSS IntelliSense** - Tailwind CSS autocomplete
- **TypeScript Importer** - Auto import for TypeScript

### Development Scripts

```bash
# Backend development
dotnet watch run              # Run with hot reload
dotnet build                  # Build the project
dotnet clean                  # Clean build artifacts

# Frontend development
cd frontend
npm run dev                   # Start development server
npm run build                 # Build for production
npm run lint                  # Run ESLint
npm run type-check           # TypeScript type checking
```

## 📦 Included Features

### ✅ Frontend
- **React 18** with TypeScript
- **Inertia.js** for SPA without APIs
- **Vite** as bundler
- **Tailwind CSS** for styling
- **shadcn/ui** - 56+ modern components with interactive examples
- **Lucide React** for icons
- **React i18next** - Multilingual support (PT/EN/ES)
- **Interactive component showcase** with live examples
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **PWA Ready** - Web App Manifest, themed icons
- **Custom Favicons** - Multi-format support (SVG, ICO, Apple Touch)

### ✅ Backend
- **ASP.NET Core 8**
- **Entity Framework Core 8**
- **ASP.NET Core Identity** for authentication
- **Pomelo MySQL** provider
- **InertiaCore** for integration

### ✅ Implemented Pages
- **Welcome** - Modern multilingual landing page with SEO optimization
- **Login** - Authentication with Identity
- **Register** - User registration
- **Dashboard** - Administrative panel
- **Profile** - User profile management
- **Components Showcase** - Interactive component examples
  - **Accordion Examples** - 3 collapsible content patterns
  - **Alert Examples** - 6 types with dismissible options
  - **Alert Dialog Examples** - 3 modal confirmation dialogs
  - **Button Examples** - 8 variants and states
  - **Card Examples** - 7 layouts and styles
  - **Overview** - Getting started guide

### ✅ Multilingual Support
- **3 Languages** - Portuguese (default), English, Spanish
- **React i18next** integration
- **Dynamic language switching**
- **Fully translated UI** including component examples
- **Hierarchical translation structure**
- **SEO-friendly** language detection

### ✅ Authentication
- **Login/Logout** functionality
- **User registration**
- **Form validation**
- **Route protection**
- **Session management**

### ✅ SEO & PWA Features
- **Complete Meta Tags**: Title, description, keywords for all pages
- **Open Graph Tags**: Optimized for social media sharing (Facebook, LinkedIn)
- **Twitter Cards**: Rich previews for Twitter/X
- **Structured Data**: JSON-LD for search engines
- **PWA Manifest**: Web app installation support
- **Multi-format Favicons**: SVG, ICO, Apple Touch Icon
- **Theme Colors**: Consistent branding across platforms
- **Multilingual SEO**: Localized metadata for PT/EN/ES

## 🎨 Component Showcase Features

### 📋 Component Examples Available

#### **Accordion Component** (3 Examples)
- **Basic Accordion**: Single collapsible FAQ sections
- **Features Accordion**: Dynamic content with icons and descriptions
- **Multiple Open Accordion**: Allow multiple sections open simultaneously
- **Fully translated** in PT/EN/ES

#### **Alert Component** (6 Types)
- **Success Alerts**: Confirmation messages
- **Warning Alerts**: Cautionary notifications  
- **Error Alerts**: Failure and validation messages
- **Info Alerts**: Informational tips and updates
- **Dismissible Alerts**: User-closable notifications
- **Temporary Alerts**: Auto-disappearing messages

#### **Alert Dialog Component** (3 Examples)
- **Basic Dialog**: Simple confirmation modal
- **Delete Confirmation**: Destructive action with state management
- **Logout Confirmation**: Session termination dialog
- **Functional callbacks** for user actions

#### **Button Component** (8 Examples)
- **Variants**: Default, Secondary, Destructive, Outline, Ghost, Link
- **Sizes**: Small, Medium, Large
- **States**: Normal, Loading, Disabled
- **Interactive demos** with live code examples

#### **Card Component** (7 Layouts)
- **Basic Cards**: Simple content containers
- **User Profile Cards**: Avatar and bio information
- **Statistics Cards**: Metrics with trend indicators
- **Product Cards**: E-commerce with pricing and badges
- **Notification Cards**: Activity feed with avatars
- **Pricing Cards**: Subscription plans with features
- **Settings Cards**: Toggle switches and preferences

### 🌐 Translation System Features

- **Complete UI Translation**: All interface elements
- **Component Examples**: Fully translated examples
- **Dynamic Language Switching**: Real-time language change
- **Persistent Language**: Remembers user preference
- **SEO Optimized**: Proper language metadata

### 🔧 Interactive Features

- **Live Code Examples**: View source code for each component
- **Copy to Clipboard**: Easy code copying
- **Responsive Design**: Mobile-friendly showcase
- **Navigation Sidebar**: Quick component access
- **Search & Filter**: Find components quickly

## 🛠️ Useful Commands

### Entity Framework
```bash
# Add new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# View migration status
dotnet ef migrations list
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development (watch mode)
npm run dev

# Build for production
npm run build

# Add shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Translation management
# Edit translation files in src/locales/
# - pt.json (Portuguese - default)
# - en.json (English)
# - es.json (Spanish)
```

## 📁 Project Structure

```
AspNetMvcReact/
├── Controllers/          # MVC Controllers
│   ├── AuthController.cs
│   ├── ComponentsController.cs  # Components showcase
│   ├── DashboardController.cs
│   ├── HomeController.cs
│   └── ProfileController.cs
├── Data/                 # EF Core Context
├── Models/               # Identity Models
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # shadcn/ui Components
│   │   │   ├── examples/ # Component examples
│   │   │   │   ├── AccordionExamples.tsx
│   │   │   │   ├── AlertDialogExamples.tsx
│   │   │   │   ├── AlertExamples.tsx
│   │   │   │   ├── ButtonExamples.tsx
│   │   │   │   └── CardExamples.tsx
│   │   │   ├── layout/   # Layout components
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── ui/       # shadcn/ui base components
│   │   ├── locales/      # Translation files
│   │   │   ├── pt.json   # Portuguese (default)
│   │   │   ├── en.json   # English
│   │   │   └── es.json   # Spanish
│   │   ├── Pages/        # Inertia Pages
│   │   │   ├── Auth/     # Authentication pages
│   │   │   ├── ComponentsDemo.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Welcome.tsx
│   │   ├── i18n.ts       # i18n configuration
│   │   └── main.tsx      # Entry point
│   ├── package.json
│   └── vite.config.ts
├── wwwroot/              # Static Assets
│   ├── favicon.svg       # SVG favicon
│   ├── favicon.ico       # ICO favicon
│   ├── apple-touch-icon.svg
│   ├── manifest.json     # PWA manifest
│   └── build/            # Vite build output
├── Views/
│   └── App.cshtml        # Main layout with SEO tags
├── appsettings.json      # Configuration
└── Program.cs            # Application Configuration
```

## 🔐 Security Settings

### Password Policy (Identity)
- Minimum 6 characters
- Requires uppercase letter
- Requires lowercase letter
- Requires digit
- No special character required

### Lockout
- Maximum 5 attempts
- 5-minute lockout duration

### Cookies
- Name: `AspNetStackAuth`
- HttpOnly: true
- Duration: 60 minutes
- SlidingExpiration: true

## � Troubleshooting

### Common Issues

**1. "Connection refused" MySQL Error**
- Ensure MySQL server is running
- Check if credentials in `appsettings.json` are correct
- Verify the port (default: 3306)

**2. Frontend not loading / 404 errors**
- Make sure you ran `npm install` in the `frontend` directory
- If using production mode, run `npm run build` first
- For development, ensure `npm run dev` is running

**3. "Permission denied" on Linux/Mac**
- Run `chmod +x *.sh` for shell scripts
- Use `sudo` if needed for package installations

**4. TypeScript compilation errors**
- Delete `node_modules` and run `npm install` again
- Check if Node.js version is 18 or later

**5. Translation not working / Text not changing**
- Verify translation files exist in `frontend/src/locales/`
- Check browser console for i18next errors
- Ensure `useTranslation` hook is imported correctly
- Clear browser cache and localStorage

**6. Component examples not displaying**
- Navigate to `/components` route
- Check if all shadcn/ui components are installed
- Verify `ComponentsController.cs` is properly configured

### Reset Everything

If you encounter persistent issues:

```bash
# Clean .NET build
dotnet clean
dotnet restore

# Clean Node.js dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..

# Reset database (WARNING: This will delete all data)
dotnet ef database drop --force
dotnet ef database update
```

## 🌐 Deployment

### Production Checklist

1. **Environment Configuration**
   - Update connection strings in `appsettings.json`
   - Set `ASPNETCORE_ENVIRONMENT=Production`
   - Configure proper SSL certificates

2. **Build for Production**
   ```bash
   cd frontend
   npm run build
   cd ..
   dotnet publish -c Release -o ./publish
   ```

3. **Database Migration**
   ```bash
   dotnet ef database update --configuration Release
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ASP.NET Core team** for the amazing framework
- **Inertia.js** for seamless SPA experience
- **shadcn/ui** for beautiful and accessible components
- **React i18next** for robust internationalization
- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for consistent iconography
- **React and TypeScript communities** for continuous innovation

---

**Developed with ❤️ for the .NET community**
