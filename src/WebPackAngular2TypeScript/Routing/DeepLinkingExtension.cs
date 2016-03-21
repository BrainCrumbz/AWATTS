using Microsoft.AspNet.Builder;
using Microsoft.AspNet.FileProviders;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.StaticFiles;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace WebPackAngular2TypeScript.Routing
{
    public static class DeepLinkingExtension
    {
        public static IApplicationBuilder UseDeepLinking(this IApplicationBuilder app,
            string baseFileSystemPath,
            string localFilesRelativePath,
            string clientRedirectPath,
            IEnumerable<string> clientRoutePaths = null)
        {
            DeepLinkingOptions options;
            Func<IApplicationBuilder> useMiddleware;

            if (clientRoutePaths == null)
            {
                options = new DeepLinkingOptions();

                useMiddleware = () => app.UseMiddleware<DeepLinkingMiddleware>(options);
            }
            else
            {
                PathString[] allowedRoutePaths = clientRoutePaths
                    .Select(url => new PathString(url)).ToArray();

                options = new DeepLinkingStrictOptions()
                {
                    AllowedRoutePaths = allowedRoutePaths,
                };

                useMiddleware = () => app.UseMiddleware<DeepLinkingStrictMiddleware>(options);
            }

            string absoluteLookupRootPath = Path.Combine(baseFileSystemPath, localFilesRelativePath);

            options.FileServerOptions = new FileServerOptions()
            {
                FileProvider = new PhysicalFileProvider(absoluteLookupRootPath),
                EnableDirectoryBrowsing = false,
            };

            options.RedirectUrlPath = new PathString(clientRedirectPath);

            return useMiddleware();
        }
    }
}
