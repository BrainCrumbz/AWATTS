using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.StaticFiles;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Http;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingStrictMiddleware : DeepLinkingMiddleware
    {
        public DeepLinkingStrictMiddleware(RequestDelegate next,
            IHostingEnvironment hostingEnv,
            ILoggerFactory loggerFactory,
            DeepLinkingStrictOptions strictOptions)
            : base(next, hostingEnv, loggerFactory, strictOptions)
        {
            this.strictOptions = strictOptions;
        }

        protected override PathString FindRedirection(HttpContext context)
        {
            // route to root path when request was not resolved
            // and it belongs to allowed client routes

            PathString requestedPath = context.Request.Path;

            bool requestIsAllowed = strictOptions.AllowedRoutePaths
                .Any(allowed => requestedPath.StartsWithSegments(allowed));

            if (requestIsAllowed)
            {
                return base.FindRedirection(context);
            }
            else
            {
                // do *NOT* invoke base implementation

                return unresolvedPath;
            }
        }

        readonly DeepLinkingStrictOptions strictOptions;
    }
}
