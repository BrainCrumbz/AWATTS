using Microsoft.AspNet.Http;
using Microsoft.AspNet.StaticFiles;
using System.Collections.Generic;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingOptions
    {
        public PathString RedirectUrlPath { get; set; }

        public FileServerOptions FileServerOptions { get; set; }
    }
}