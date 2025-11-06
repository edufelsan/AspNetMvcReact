# Deploy para Linux

## Comando de Deploy

```powershell
dotnet publish -c Release -r linux-x64 --self-contained true -o "publish-linux" /p:SkipFrontendBuild=true
```

## Comando Completo com Limpeza

```powershell
cd "c:\Users\eduar\OneDrive\startmídia\Projetos Pessoais\AspNetMvcReact"; if (Test-Path "publish-linux") { Remove-Item "publish-linux" -Recurse -Force }; dotnet publish -c Release -r linux-x64 --self-contained true -o "publish-linux" /p:SkipFrontendBuild=true
```

## Migrações Automáticas

✅ **Configurado**: As migrações do Entity Framework são executadas automaticamente quando a aplicação inicia.

**Como funciona:**
- Na inicialização da aplicação (`Program.cs`), o sistema verifica se existem migrações pendentes
- Se existirem, aplica automaticamente usando `context.Database.MigrateAsync()`
- Logs de sucesso/erro são registrados
- A aplicação continua mesmo se as migrações falharem (comportamento configurável)

**Benefícios:**
- Não precisa executar `dotnet ef database update` manualmente no servidor
- Banco de dados sempre atualizado automaticamente
- Ideal para deployments em containers ou servidores gerenciados

## Estrutura do Deploy

O pacote gerado inclui:
- ✅ Executável da aplicação (`AspNetMvcReact`)
- ✅ Runtime do .NET para Linux x64 (self-contained)
- ✅ Todas as dependências (.dll)
- ✅ Arquivos de configuração (`appsettings.json`, etc.)
- ✅ Arquivos estáticos do frontend (`wwwroot/build/`)
- ✅ Migrações automáticas configuradas