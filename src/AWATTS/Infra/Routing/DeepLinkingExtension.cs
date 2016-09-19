using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;

namespace AWATTS.Infra.Routing
{
    public static class DeepLinkingExtension
    {
        public static IApplicationBuilder UseDeepLinking(this IApplicationBuilder app, DeepLinkingOptions options)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app), "Passed application builder cannot be null");
            }

            if (options == null)
            {
                throw new ArgumentNullException(nameof(options), "Passed options cannot be null");
            }

            string absolutePhysicalRootPath = Path.Combine(options.BaseFileSystemPath, options.LocalFilesRelativePath);

            var redirectUrlPath = new PathString(options.ClientRedirectPath);

            var allowedClientPaths = options.AllowedClientPaths ?? new string[0];

            bool usingStrict = allowedClientPaths.Any();

            var ignoredClientPaths = options.IgnoredClientPaths ?? new string[0];

            PathString[] ignoredPathStrings = ignoredClientPaths
                .Select(url => new PathString(url)).ToArray();

            Func<IApplicationBuilder> useMiddleware;

            if (!usingStrict)
            {
                var middlewareOptions = new DeepLinkingMiddlewareOptions()
                {
                    AbsolutePhysicalRootPath = absolutePhysicalRootPath,
                    RedirectUrlPath = redirectUrlPath,
                    IgnoredRoutePaths = ignoredPathStrings,
                };

                useMiddleware = () => app.UseMiddleware<DeepLinkingMiddleware>(middlewareOptions);
            }
            else
            {
                PathString[] allowedPathStrings = allowedClientPaths
                    .Select(url => new PathString(url)).ToArray();

                var strictMiddlewareOptions = new DeepLinkingStrictMiddlewareOptions()
                {
                    AbsolutePhysicalRootPath = absolutePhysicalRootPath,
                    RedirectUrlPath = redirectUrlPath,
                    AllowedRoutePaths = allowedPathStrings,
                    IgnoredRoutePaths = ignoredPathStrings,
                };

                useMiddleware = () => app.UseMiddleware<DeepLinkingStrictMiddleware>(strictMiddlewareOptions);
            }

            return useMiddleware();
        }
    }
}
