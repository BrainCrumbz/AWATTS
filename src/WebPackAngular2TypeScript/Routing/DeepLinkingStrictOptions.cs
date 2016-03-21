using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingStrictOptions : DeepLinkingOptions
    {
        public IEnumerable<PathString> AllowedRoutePaths { get; set; }
    }
}
