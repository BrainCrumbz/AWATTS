using System.Collections.Generic;

namespace AWATTS.Infra.Routing
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
