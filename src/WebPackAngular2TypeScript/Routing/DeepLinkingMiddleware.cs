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
    public class DeepLinkingMiddleware
    {
        public DeepLinkingMiddleware(RequestDelegate next,
            IHostingEnvironment hostingEnv,
            ILoggerFactory loggerFactory,
            DeepLinkingOptions options)
        {
            this.next = next;
            this.options = options;

            staticFileMiddleware = new StaticFileMiddleware(next, 
                hostingEnv, options.FileServerOptions.StaticFileOptions, loggerFactory);
        }

        public async Task Invoke(HttpContext context)
        {
            // try to resolve the request with default static file middleware
            await staticFileMiddleware.Invoke(context);

            if (context.Response.StatusCode == 404)
            {
                var redirectUrlPath = FindRedirection(context);

                if (redirectUrlPath != unresolvedPath)
                {
                    context.Request.Path = redirectUrlPath;

                    await staticFileMiddleware.Invoke(context);
                }
            }
        }

        protected virtual PathString FindRedirection(HttpContext context)
        {
            // route to root path when request was not resolved
            return options.RedirectUrlPath;
        }

        protected readonly DeepLinkingOptions options;
        protected readonly RequestDelegate next;
        protected readonly StaticFileMiddleware staticFileMiddleware;

        protected readonly PathString unresolvedPath = null;
    }
}
