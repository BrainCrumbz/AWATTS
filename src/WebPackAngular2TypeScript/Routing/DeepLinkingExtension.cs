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
            string relativeRedirectUrl)
        {
            string absoluteLookupRootPath = Path.Combine(baseFileSystemPath, localFilesRelativePath);

            var options = new DeepLinkingOptions()
            {
                FileServerOptions = new FileServerOptions()
                {
                    FileProvider = new PhysicalFileProvider(absoluteLookupRootPath),
                    EnableDirectoryBrowsing = false,
                },

                RelativeRedirectUrlPath = new PathString(relativeRedirectUrl),
            };

            app.UseDefaultFiles(options.FileServerOptions.DefaultFilesOptions);

            return app.UseMiddleware<DeepLinkingMiddleware>(options);
        }
    }
}
