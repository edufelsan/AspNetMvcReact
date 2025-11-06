# Script de Deploy para Linux
# Este script faz o deploy da aplicacao ASP.NET MVC React para Linux

Write-Host "Iniciando deploy para Linux..." -ForegroundColor Green

# Passo 1: Limpar pasta de publicacao anterior
Write-Host "Limpando pasta publish-linux..." -ForegroundColor Yellow
if (Test-Path "publish-linux") {
    Remove-Item "publish-linux" -Recurse -Force
    Write-Host "Pasta anterior removida" -ForegroundColor Green
}

# Passo 2: Build do frontend
Write-Host "Fazendo build do frontend..." -ForegroundColor Yellow
Set-Location "frontend"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no build do frontend" -ForegroundColor Red
    Set-Location ".."
    exit 1
}
Write-Host "Frontend build concluido" -ForegroundColor Green
Set-Location ".."

# Passo 3: Publish do backend para Linux
Write-Host "Fazendo publish do backend para Linux..." -ForegroundColor Yellow
dotnet publish -c Release -r linux-x64 --self-contained true -o "publish-linux"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro no publish do backend" -ForegroundColor Red
    exit 1
}

# Passo 4: Verificar arquivos criados
Write-Host "Verificando arquivos criados..." -ForegroundColor Yellow
$files = Get-ChildItem "publish-linux" | Measure-Object
Write-Host "Deploy concluido! $($files.Count) arquivos criados em publish-linux/" -ForegroundColor Green

# Passo 5: Mostrar informacoes do deploy
Write-Host "Informacoes do deploy:" -ForegroundColor Cyan
Write-Host "  - Pasta de destino: publish-linux/" -ForegroundColor White
Write-Host "  - Runtime: linux-x64" -ForegroundColor White
Write-Host "  - Self-contained: Sim" -ForegroundColor White
Write-Host "  - Configuracao: Release" -ForegroundColor White

$publishSize = (Get-ChildItem "publish-linux" -Recurse | Measure-Object -Property Length -Sum).Sum
$publishSizeMB = [Math]::Round($publishSize / 1MB, 2)
Write-Host "  - Tamanho total: $publishSizeMB MB" -ForegroundColor White

Write-Host "Deploy concluido com sucesso!" -ForegroundColor Green
Write-Host "Para executar no Linux: ./AspNetMvcReact" -ForegroundColor Cyan