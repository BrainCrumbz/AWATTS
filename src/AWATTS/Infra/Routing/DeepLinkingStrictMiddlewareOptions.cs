using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace AWATTS.Infra.Routing
{
    public class DeepLinkingStrictMiddlewareOptions : DeepLinkingMiddlewareOptions
    {
        public IEnumerable<PathString> AllowedRoutePaths { get; set; }
    }
}
