using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace AWATTS.Infra.Routing
{
    public class DeepLinkingStrictMiddleware : DeepLinkingMiddleware
    {
        public DeepLinkingStrictMiddleware(RequestDelegate next,
            IHostingEnvironment hostingEnv,
            ILoggerFactory loggerFactory,
            DeepLinkingStrictMiddlewareOptions strictOptions)
            : base(next, hostingEnv, loggerFactory, strictOptions)
        {
            this.strictOptions = strictOptions;
        }

        protected override PathString TryResolveRedirect(HttpContext context)
        {
            // route to root path when request was not resolved
            // and it belongs to allowed client routes

            PathString requestedPath = context.Request.Path;

            bool requestIsAllowed = strictOptions.AllowedRoutePaths
                .Any(allowed => requestedPath.StartsWithSegments(allowed));

            if (requestIsAllowed)
            {
                return base.TryResolveRedirect(context);
            }
            else
            {
                return unresolvedPath;
            }
        }

        readonly DeepLinkingStrictMiddlewareOptions strictOptions;
    }
}
