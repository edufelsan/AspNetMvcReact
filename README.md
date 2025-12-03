# ASP.NET Core + Inertia.js + React

Complete full-stack template with ASP.NET Core 8, Inertia.js, React 18, TypeScript, shadcn/ui, ASP.NET Core Identity, **multilingual support** (Portuguese, English, Spanish), **SEO optimization**, **PWA ready**, and **comprehensive component showcase** with **21 shadcn/ui components** and **69+ interactive examples**.

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

# Create the database and apply migrations (Development only)
dotnet ef database update
```

> **📝 Note**: Migrations are automatically applied in **Production environment** when `ASPNETCORE_ENVIRONMENT=Production`. In development, you need to run `dotnet ef database update` manually.

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
- **Welcome** - Modern multilingual landing page with:
  - SEO optimization and meta tags
  - Hero section with call-to-action buttons
  - Feature showcase with 7 key technologies
  - Statistics section with key metrics
  - **NEW: GitHub open source section** with project highlights
  - Multilingual support (PT/EN/ES)
- **Login** - Authentication with Identity
- **Register** - User registration with validation
- **Dashboard** - Administrative panel with user management
- **Profile** - User profile management and settings
- **Components Showcase** - Interactive component library with:
  - **19 shadcn/ui components** currently implemented
  - **63+ interactive examples** with practical use cases
  - **Progressive implementation** - More components being added regularly
  - Complete documentation and live examples for each component
  - **Accordion Examples** - 3 collapsible content patterns
  - **Alert Examples** - 6 types with dismissible options
  - **Alert Dialog Examples** - 3 modal confirmation dialogs
  - **Aspect Ratio Examples** - 3 responsive ratio containers
  - **Avatar Examples** - 3 user profile image variations
  - **Badge Examples** - 3 label and status indicators
  - **Button Examples** - 8 variants and states
  - **Card Examples** - 7 layouts and styles
  - **Overview** - Getting started guide

### ✅ Welcome Page Features
- **Hero Section**: Modern gradient design with technology stack highlighting
- **Feature Grid**: 7 technology cards (ASP.NET Core 8, Inertia.js, shadcn/ui, Auth, EF, Production-ready, TanStack Table)
- **Statistics Section**: Key project metrics (56 components, 100% TypeScript, 0 APIs needed, 5min setup)
- **GitHub Section**: Open source project promotion with:
  - Project repository link
  - 4 feature highlights (Open Source, Free, Community, Contributions)
  - Direct GitHub integration with external link
- **Call-to-Action Section**: Registration and dashboard access buttons
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Complete meta tags and structured data

### ✅ Multilingual Support
- **3 Languages** - Portuguese (default), English, Spanish
- **React i18next** integration
- **Dynamic language switching**
- **Fully translated UI** including component examples and GitHub section
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

### 🎨 Component Showcase Features

**Currently Implemented**: 21 shadcn/ui components with 69+ interactive examples
**Status**: Progressive implementation - new components added regularly

### 📋 Component Examples Available (Current Implementation)

#### **Date Picker Component** (3 Examples)
- **Basic Date Picker**: Simple calendar selection with formatted display
- **Birthday Picker**: Age calculation with specialized date selection
- **Appointment Picker**: Future date scheduling with quick action buttons
- **Date formatting** with date-fns integration

#### **Dialog Component** (3 Examples)
- **Basic Dialog**: Simple modal with title and description
- **Form Dialog**: Profile editing with controlled form inputs
- **Contact Dialog**: Contact form with validation and required fields
- **State management** and form handling

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

#### **Aspect Ratio Component** (3 Examples)
- **Image 16:9**: Widescreen ratio for modern images
- **Video 4:3**: Classic ratio for traditional content
- **Comparison Grid**: Side-by-side 1:1, 16:9, and 21:9 ratios
- **Responsive containers** maintaining proportions

#### **Avatar Component** (3 Examples)
- **Basic Avatar**: Profile images with initials fallback
- **Avatar Sizes**: 4 size variations (Small to Extra Large)
- **Avatar Group**: Stacked avatars with online status indicators
- **Status badges** (Online, Away, Offline)

#### **Badge Component** (3 Examples)
- **Badge Variants**: Default, Secondary, Destructive, Outline styles
- **Status Badges**: With icons (Active, Pending, Warning, Inactive)
- **Product Badges**: Combined tags, ratings, and promotional labels
- **Icon integration** with Lucide React

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

#### **Additional Components Available**
- **Data Table Component** (3 Examples): Interactive tables with sorting, filtering, pagination
- **Command Component** (3 Examples): Command palette with search functionality
- **Context Menu Component** (3 Examples): Right-click contextual menus
- **Combobox Component** (3 Examples): Searchable select dropdowns
- **Date Picker Component** (3 Examples): Calendar date selection with various formats
- **Dialog Component** (3 Examples): Modal windows for forms and confirmations

#### **GitHub Integration Features**
- **Open Source Section**: Dedicated section on Welcome page
- **External Link Integration**: Direct links to GitHub repository
- **Feature Cards**: Visual representation of project benefits
- **Multilingual Content**: GitHub section translated in PT/EN/ES
- **Modern Design**: Card-based layout with hover effects
- **Icon Integration**: GitHub and Lucide icons throughout

#### **Progressive Implementation Status**
- **✅ Implemented**: 19 components with full examples and documentation
- **🚧 In Progress**: Additional shadcn/ui components being added gradually
- **🎯 Target**: Complete coverage of all 56+ shadcn/ui components
- **📅 Update Frequency**: New components added weekly

### 🌐 Translation System Features

- **Complete UI Translation**: All interface elements including new GitHub section
- **Component Examples**: 63+ fully translated examples across 19 components
- **Dynamic Language Switching**: Real-time language change with state persistence
- **Persistent Language**: Remembers user preference across sessions
- **SEO Optimized**: Proper language metadata for all pages
- **Hierarchical Structure**: Organized translation keys for maintainability
- **GitHub Content**: Open source section fully translated in PT/EN/ES

### 🔧 Interactive Features

- **Live Code Examples**: View source code for each component
- **Copy to Clipboard**: Easy code copying
- **Responsive Design**: Mobile-friendly showcase
- **Navigation Sidebar**: Quick component access with example counts
- **Progressive Loading**: Components organized by implementation status
- **Real-time Stats**: Live count of implemented components and examples

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

# Component management
# Currently implemented: 19 components with 63+ examples
# shadcn/ui components available: 56+ total
# Implementation status: Progressive (new components added regularly)

# Translation management
# Edit translation files in src/locales/
# - pt.json (Portuguese - default) - Includes GitHub section
# - en.json (English) - Fully synchronized
# - es.json (Spanish) - Complete translation coverage
# New keys added: welcome.github.* for open source section
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
│   │   │   │   ├── CardExamples.tsx
│   │   │   │   ├── DatePickerExamples.tsx
│   │   │   │   └── DialogExamples.tsx
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
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── ForgotPassword.tsx
│   │   │   ├── ComponentsDemo.tsx  # 69+ interactive examples
│   │   │   ├── Dashboard.tsx       # Admin panel
│   │   │   ├── Profile/           # User profile management
│   │   │   │   └── Index.tsx
│   │   │   └── Welcome.tsx        # Landing page with GitHub section
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

## 🗄️ Database Migrations

### Automatic Migration System

The application includes an **automatic migration system** that executes database migrations based on the environment:

#### **Production Environment** (`ASPNETCORE_ENVIRONMENT=Production`)
- ✅ **Automatic Execution**: Migrations run automatically on application startup
- ✅ **Pending Detection**: Only applies migrations that haven't been executed
- ✅ **Detailed Logging**: Logs all migration activity and results
- ✅ **Fail-Fast**: Application stops if migrations fail (ensures data integrity)

#### **Development Environment** (`ASPNETCORE_ENVIRONMENT=Development`)
- ❌ **Manual Execution**: Migrations must be run manually using `dotnet ef database update`
- ✅ **Full Control**: Developers maintain control over when migrations are applied

### Migration Commands

```bash
# Create a new migration
dotnet ef migrations add MigrationName

# Apply migrations manually (Development)
dotnet ef database update

# Remove the last migration (if not applied)
dotnet ef migrations remove

# Check migration status
dotnet ef migrations list
```

### Production Deployment

When deploying to production:

1. **Set Environment Variable**: `ASPNETCORE_ENVIRONMENT=Production`
2. **Deploy Application**: Migrations will run automatically on first startup
3. **Monitor Logs**: Check application logs for migration execution status

```bash
# Example production environment setup
export ASPNETCORE_ENVIRONMENT=Production
dotnet AspNetMvcReact.dll
```

The system automatically:
- Detects pending migrations
- Logs migration names before execution
- Applies all pending migrations in correct order
- Confirms successful completion
- Throws exceptions on failure (fail-fast approach)

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

## 📊 Component Implementation Status

### Currently Available (19/56+ Components)
The project implements **21 shadcn/ui components** with **69+ interactive examples**:

✅ **Fully Implemented Components:**
- Accordion (3 examples) • Alert (6 examples) • Alert Dialog (3 examples)
- Aspect Ratio (3 examples) • Avatar (3 examples) • Badge (3 examples)
- Breadcrumb (3 examples) • Button (8 examples) • Button Group (3 examples)
- Calendar (3 examples) • Card (7 examples) • Carousel (3 examples)
- Chart (3 examples) • Checkbox (3 examples) • Collapsible (3 examples)
- Combobox (3 examples) • Command (3 examples) • Context Menu (3 examples)
- Date Picker (3 examples) • Dialog (3 examples) • Data Table (3 examples)

🚧 **In Progressive Development:**
- Additional shadcn/ui components are being implemented gradually
- Target: Complete coverage of all 56+ shadcn/ui components
- New components added weekly with full examples and translations

## 🆕 Recent Updates & New Features

### Welcome Page Enhancements
- **✨ GitHub Open Source Section**: New dedicated section highlighting the project's open-source nature
- **🔗 External Links**: Direct integration with GitHub repository
- **🎨 Feature Cards**: Visual representation of project benefits (Open Source, Free, Community, Contributions)
- **🌍 Full Multilingual Support**: GitHub section translated in Portuguese, English, and Spanish
- **📱 Responsive Design**: Optimized layout for all screen sizes

### Translation System Improvements
- **🆕 GitHub Content**: Added comprehensive translations for the new GitHub section
- **🔄 Synchronized Languages**: All three languages (PT/EN/ES) fully updated
- **🏗️ Hierarchical Structure**: Better organized translation keys for easier maintenance
- **✅ Complete Coverage**: Every UI element and example properly translated

### Component Showcase Implementation
- **📈 69+ Examples**: Currently implemented across 21 shadcn/ui components
- **🎯 Practical Use Cases**: Real-world examples for each component
- **📋 Progressive Documentation**: Enhanced descriptions and use case explanations
- **🔍 Improved Navigation**: Sidebar with component counts and implementation status
- **🚧 Active Development**: New components added regularly (target: 56+ total)

### Technical Improvements
- **⚡ Enhanced Performance**: Optimized bundle size and loading times
- **🛠️ Better Developer Experience**: Improved TypeScript definitions and code organization
- **📦 Updated Dependencies**: Latest versions of React, Vite, and shadcn/ui components
- **🎨 Icon Integration**: Extended Lucide React icon usage throughout the application

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
