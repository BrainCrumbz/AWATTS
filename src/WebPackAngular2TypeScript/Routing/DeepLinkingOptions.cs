using Microsoft.AspNet.Http;
using Microsoft.AspNet.StaticFiles;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingOptions
    {
        public PathString RelativeRedirectUrlPath { get; set; }

        public FileServerOptions FileServerOptions { get; set; }
    }
}