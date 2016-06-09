using System.Collections.Generic;

namespace WebPackAngular2TypeScript.Routing
{
    public class DeepLinkingOptions
    {
        public string BaseFileSystemPath { get; set; }

        public string LocalFilesRelativePath { get; set; }

        public string ClientRedirectPath { get; set; }

        public IEnumerable<string> AllowedClientPaths { get; set; }

        public IEnumerable<string> IgnoredClientPaths { get; set; }
    }
}
