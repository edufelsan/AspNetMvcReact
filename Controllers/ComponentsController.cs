using Microsoft.AspNetCore.Mvc;
using InertiaCore;

namespace AspNetMvcReact.Controllers
{
    public class ComponentsController : Controller
    {
        /// <summary>
        /// Display the components demo page with shadcn/ui examples
        /// </summary>
        /// <returns>Components demo page</returns>
        public IActionResult Demo()
        {
            return Inertia.Render("ComponentsDemo", new
            {
                // Podemos adicionar dados do servidor se necessário
                // Por exemplo: componentes disponíveis, configurações, etc.
            });
        }

        /// <summary>
        /// API endpoint to get available components information
        /// </summary>
        /// <returns>JSON with components data</returns>
        [HttpGet]
        public IActionResult GetComponentsInfo()
        {
            var components = new[]
            {
                new
                {
                    Id = "button",
                    Name = "Button",
                    Description = "Clickable button elements with various styles and states",
                    Examples = 8,
                    Category = "Form",
                    Documentation = "https://ui.shadcn.com/docs/components/button"
                },
                new
                {
                    Id = "alert",
                    Name = "Alert",
                    Description = "Alert notifications and messages for user feedback",
                    Examples = 6,
                    Category = "Feedback",
                    Documentation = "https://ui.shadcn.com/docs/components/alert"
                },
                new
                {
                    Id = "card",
                    Name = "Card",
                    Description = "Flexible container for content and actions",
                    Examples = 7,
                    Category = "Layout",
                    Documentation = "https://ui.shadcn.com/docs/components/card"
                }
            };

            return Json(new
            {
                components,
                totalComponents = components.Length,
                totalExamples = components.Sum(c => c.Examples)
            });
        }
    }
}