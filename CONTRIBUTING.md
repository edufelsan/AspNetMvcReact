# Contributing to ASP.NET Core + React SPA Template

Thank you for your interest in contributing! This document provides guidelines and information about contributing to this project.

## 🚀 Quick Start for Contributors

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/edufelsan/AspNetMvcReact.git
   cd AspNetMvcReact
   ```
3. **Run the setup script**
   - Windows: `setup.bat`
   - Linux/Mac: `./setup.sh`

## 🛠️ Development Workflow

### Setting up Development Environment

1. **Prerequisites**
   - .NET 8 SDK
   - Node.js 18+
   - MySQL 8.0+
   - VS Code (recommended)

2. **VS Code Extensions**
   - C# Dev Kit
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer

3. **Development Mode**
   ```bash
   # Terminal 1: Frontend development server
   cd frontend
   npm run dev

   # Terminal 2: Backend with hot reload
   dotnet watch run
   ```

### Code Style and Standards

#### C# Backend
- Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Use PascalCase for public members
- Use camelCase for private fields
- Add XML comments for public APIs

#### TypeScript/React Frontend
- Use TypeScript for all new files
- Follow React functional components with hooks
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use kebab-case for file names

#### Database
- Use descriptive table and column names
- Follow Entity Framework conventions
- Create migrations for schema changes

### Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

Examples:
feat(auth): add password reset functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
style(frontend): format code with prettier
refactor(api): simplify user controller logic
test(auth): add unit tests for login
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - OS (Windows/Linux/Mac)
   - .NET version (`dotnet --version`)
   - Node.js version (`node --version`)
   - Browser and version

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Error Messages**
   - Full error messages
   - Stack traces
   - Console logs

## ✨ Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and why it's needed
3. **Provide examples** of how it would work
4. **Consider backward compatibility**

## 🔧 Pull Request Process

1. **Create a branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, tested code
   - Update documentation if needed
   - Add tests for new features

3. **Test your changes**
   ```bash
   # Backend tests
   dotnet test

   # Frontend linting
   cd frontend
   npm run lint
   npm run type-check
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe what changes were made
   - Include screenshots for UI changes

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated as needed
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Commits follow conventional commit format

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

### Frontend Testing
```bash
cd frontend

# Lint code
npm run lint

# Type checking
npm run type-check

# Build to check for errors
npm run build
```

## 📁 Project Structure

Understanding the project structure helps with contributions:

```
AspNetMvcReact/
├── Controllers/          # MVC Controllers
├── Data/                 # EF Core DbContext
├── Models/               # Entity models
├── Services/             # Business logic
├── Extensions/           # Extension methods
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── Pages/        # Inertia.js pages
│   │   ├── hooks/        # Custom hooks
│   │   └── types/        # Type definitions
├── Templates/Email/      # Email templates
└── wwwroot/              # Static assets
```

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

## 🆘 Getting Help

- **Issues**: For bugs and feature requests
- **Discussions**: For general questions and ideas
- **Discord/Slack**: [Add your community links]

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🎉