using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AWATTS.Infra.Logging
{
    public static class CustomLoggingExtension
    {
        public static IApplicationBuilder UseCustomLogging(this IApplicationBuilder app,
            ILoggerFactory loggerFactory, IConfiguration configuration)
        {
            // add simple console logging
            // TODO add file logging, similar to NLog or by reusing it
            loggerFactory
                .AddConsole(configuration.GetSection(LoggingSettings.Key))
                .AddDebug();

            return app;
        }
    }
}
