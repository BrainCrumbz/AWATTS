using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace AWATTS.Infra.StaticFiles
{
    public static class CustomStaticFilesExtension
    {
        public static IApplicationBuilder UseCustomStaticFiles(this IApplicationBuilder app,
            IHostingEnvironment env, IConfiguration configuration)
        {
            var clientSettings = new ClientSettings();
            configuration.GetSection(ClientSettings.Key).Bind(clientSettings);

            // Serve up the static assets in wwwroot and those built by client-side toolchain
            app.UseStaticFiles();

            string clientBuildOutputPath = Path.Combine(env.ContentRootPath, clientSettings.BuildOutputRelativePath);

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(clientBuildOutputPath),
            });

            return app;
        }
    }
}
