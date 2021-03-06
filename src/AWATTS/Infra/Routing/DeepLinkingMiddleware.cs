﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Threading.Tasks;

namespace AWATTS.Infra.Routing
{
    public class DeepLinkingMiddleware
    {
        public DeepLinkingMiddleware(RequestDelegate next,
            IHostingEnvironment hostingEnv,
            ILoggerFactory loggerFactory,
            DeepLinkingMiddlewareOptions options)
        {
            this.next = next;
            this.options = options;

            var staticFileOptions = new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(options.AbsolutePhysicalRootPath),
            };

            staticFileMiddleware = new StaticFileMiddleware(next,
                hostingEnv, Options.Create(staticFileOptions), loggerFactory);
        }

        public async Task Invoke(HttpContext context)
        {
            // try to resolve the request with default static file middleware
            await staticFileMiddleware.Invoke(context);

            // proceed as normal when it's not a case of resource not found
            if (context.Response.StatusCode != StatusCodes.Status404NotFound)
            {
                return;
            }

            // proceed as normal when it's not a GET request
            if (!IsGetRequest(context))
            {
                return;
            }

            // when resource is not found, check if request path should be ignored
            // completely for the purposes of deep-linking
            if (ShouldIgnoreRequest(context))
            {
                return;
            }

            // when resource is not found, check if request should be redirected
            // to a parent path, so to allow deep-linking in web application

            PathString redirectUrlPath = TryResolveRedirect(context);

            if (redirectUrlPath != unresolvedPath)
            {
                // if resolved, reset response as successful
                context.Response.StatusCode = StatusCodes.Status200OK;
                context.Request.Path = redirectUrlPath;

                await staticFileMiddleware.Invoke(context);
            }
        }

        bool ShouldIgnoreRequest(HttpContext context)
        {
            PathString requestedPath = context.Request.Path;

            bool ignoreRequest = options.IgnoredRoutePaths
                .Any(allowed => requestedPath.StartsWithSegments(allowed));

            return ignoreRequest;
        }

        protected virtual PathString TryResolveRedirect(HttpContext context)
        {
            // route to root path when request was not resolved
            return options.RedirectUrlPath;
        }

        protected readonly DeepLinkingMiddlewareOptions options;
        protected readonly RequestDelegate next;
        protected readonly StaticFileMiddleware staticFileMiddleware;

        protected readonly PathString unresolvedPath = null;

        static bool IsGetRequest(HttpContext context)
        {
            return (context.Request.Method.ToUpper() == "GET");
        }
    }
}
