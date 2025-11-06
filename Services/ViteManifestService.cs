using System.Text.Json;

namespace AspNetMvcReact.Services
{
    public interface IViteManifestService
    {
        string? GetAssetPath(string entryPoint);
        string[]? GetCssFiles(string entryPoint);
    }

    public class ViteManifestService : IViteManifestService
    {
        private readonly IWebHostEnvironment _env;
        private readonly Dictionary<string, ViteManifestEntry>? _manifest;

        public ViteManifestService(IWebHostEnvironment env)
        {
            _env = env;
            _manifest = LoadManifest();
        }

        private Dictionary<string, ViteManifestEntry>? LoadManifest()
        {
            var manifestPath = Path.Combine(_env.WebRootPath, "build", "manifest.json");
            
            if (!File.Exists(manifestPath))
                return null;

            try
            {
                var json = File.ReadAllText(manifestPath);
                return JsonSerializer.Deserialize<Dictionary<string, ViteManifestEntry>>(json, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
            }
            catch
            {
                return null;
            }
        }

        public string? GetAssetPath(string entryPoint)
        {
            if (_manifest == null || !_manifest.ContainsKey(entryPoint))
                return null;

            return _manifest[entryPoint].File;
        }

        public string[]? GetCssFiles(string entryPoint)
        {
            if (_manifest == null || !_manifest.ContainsKey(entryPoint))
                return null;

            return _manifest[entryPoint].Css;
        }
    }

    public class ViteManifestEntry
    {
        public string File { get; set; } = string.Empty;
        public string[]? Css { get; set; }
        public bool IsEntry { get; set; }
        public string Src { get; set; } = string.Empty;
    }
}