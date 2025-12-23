using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using AspNetMvcReact.Services;

namespace AspNetMvcReact.Extensions
{
    public static class ViteHelperExtensions
    {
        public static IHtmlContent ViteAsset(this IHtmlHelper htmlHelper, string entryPoint)
        {
            var env = htmlHelper.ViewContext.HttpContext.RequestServices.GetService<IWebHostEnvironment>();
            
            // Em desenvolvimento, verifica se existe um servidor Vite rodando
            if (env?.IsDevelopment() == true)
            {
                // Tenta primeiro o servidor de desenvolvimento do Vite
                var devScript = $"<script type=\"module\" src=\"http://localhost:5173/{entryPoint}\"></script>";
                
                // Se não conseguir conectar ao Vite dev server, usa arquivos buildados
                var manifestPath = Path.Combine(env.WebRootPath, "build", "manifest.json");
                if (!File.Exists(manifestPath))
                {
                    return new HtmlString(devScript);
                }
            }

            var viteService = htmlHelper.ViewContext.HttpContext.RequestServices.GetService<IViteManifestService>();
            if (viteService == null)
                return new HtmlString($"<script type=\"module\" src=\"/build/{entryPoint}\"></script>");

            var assetPath = viteService.GetAssetPath(entryPoint);
            if (string.IsNullOrEmpty(assetPath))
                return new HtmlString($"<script type=\"module\" src=\"/build/{entryPoint}\"></script>");

            return new HtmlString($"<script type=\"module\" src=\"/{assetPath}\"></script>");
        }

        public static IHtmlContent ViteCss(this IHtmlHelper htmlHelper, string entryPoint)
        {
            var env = htmlHelper.ViewContext.HttpContext.RequestServices.GetService<IWebHostEnvironment>();
            
            // Em desenvolvimento, não carrega CSS separado (Vite injeta automaticamente)
            if (env?.IsDevelopment() == true)
            {
                var manifestPath = Path.Combine(env.WebRootPath, "build", "manifest.json");
                if (!File.Exists(manifestPath))
                {
                    return new HtmlString(""); // Vite dev server injeta CSS automaticamente
                }
            }

            var viteService = htmlHelper.ViewContext.HttpContext.RequestServices.GetService<IViteManifestService>();
            if (viteService == null)
                return new HtmlString("");

            var cssFiles = viteService.GetCssFiles(entryPoint);
            if (cssFiles == null || cssFiles.Length == 0)
                return new HtmlString("");

            var html = string.Join("\n", cssFiles.Select(css => $"<link rel=\"stylesheet\" href=\"/{css}\" />"));
            return new HtmlString(html);
        }
    }
}