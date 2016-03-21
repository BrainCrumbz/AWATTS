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

            // TODO remove
            Console.WriteLine(context.Request.Path + ": " + context.Response.StatusCode);

            // route to root path if the status code is 404
            if (context.Response.StatusCode == 404)
            {
                context.Request.Path = options.EntryPath;

                await staticFileMiddleware.Invoke(context);

                // TODO remove
                Console.WriteLine(">> " + context.Request.Path + ": " + context.Response.StatusCode);
            }
        }

        readonly DeepLinkingOptions options;
        readonly RequestDelegate next;
        readonly StaticFileMiddleware staticFileMiddleware;
    }
}
