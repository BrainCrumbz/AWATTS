using Microsoft.AspNet.Http;
using System.Collections.Generic;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingMiddlewareOptions
    {
        public string AbsolutePhysicalRootPath { get; set; }

        public IEnumerable<PathString> IgnoredRoutePaths { get; set; }

        public PathString RedirectUrlPath { get; set; }
    }
}
