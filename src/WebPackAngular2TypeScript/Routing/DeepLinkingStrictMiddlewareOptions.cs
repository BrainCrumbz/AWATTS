using Microsoft.AspNet.Http;
using System.Collections.Generic;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingStrictMiddlewareOptions : DeepLinkingMiddlewareOptions
    {
        public IEnumerable<PathString> AllowedRoutePaths { get; set; }
    }
}
