using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace AWATTS.Infra.Routing
{
    public class DeepLinkingMiddlewareOptions
    {
        public string AbsolutePhysicalRootPath { get; set; }

        public IEnumerable<PathString> IgnoredRoutePaths { get; set; }

        public PathString RedirectUrlPath { get; set; }
    }
}
