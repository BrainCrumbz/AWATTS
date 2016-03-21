using Microsoft.AspNet.Mvc;

namespace WebPackAngular2TypeScript.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}