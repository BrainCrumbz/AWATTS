using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace AWATTS.Infra.Routing
{
    public static class CustomRoutingExtension
    {
        public static IApplicationBuilder UseCustomRouting(this IApplicationBuilder app,
            IHostingEnvironment env)
        {
            app.UseDeepLinking(new DeepLinkingOptions()
            {
                BaseFileSystemPath = env.ContentRootPath,
                LocalFilesRelativePath = "/",
                ClientRedirectPath = "/",
                // In order to switch to strict deep linking, pass an option similar to the following:
                /*
                AllowedClientPaths: new string[]
                {
                    "/dashboard",
                    "/heroes",
                });
                */
                // In order to ignore paths when trying to deep-link, pass an option similar to the following:
                /*
                IgnoredClientPaths = new string[]
                {
                    "/api",
                },
                */
            });

            if (env.IsDevelopment())
            {
                /* TODO remove if not used
                app.UseBrowserLink();
                */
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // Add Error handling middleware which catches all application specific errors and
                // sends the request to the following path or controller action
                app.UseExceptionHandler("/Home/Error");
            }

            return app;
        }
    }
}
