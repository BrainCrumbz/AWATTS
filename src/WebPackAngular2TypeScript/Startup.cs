using Microsoft.AspNet.Builder;
using Microsoft.AspNet.FileProviders;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;
using WebPackAngular2TypeScript.Routing;

namespace WebPackAngular2TypeScript
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IApplicationEnvironment appEnv)
        {
            app.UseStaticFiles();

            string clientBuildOutputPath = Path.Combine(appEnv.ApplicationBasePath, "buildOutput");

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(clientBuildOutputPath),
            });

            app.UseDeepLinking(new DeepLinkingOptions()
            {
                BaseFileSystemPath = appEnv.ApplicationBasePath,
                LocalFilesRelativePath = "/",
                ClientRedirectPath = "/",
                IgnoredClientPaths = new string[]
                {
                    "/api",
                },
            });
            // NOTE: in order to switch to strict deep linking, pass the following option too:
            /*
                AllowedClientPaths: new string[]
                {
                    "/dashboard",
                    "/heroes",
                });
            */

            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
