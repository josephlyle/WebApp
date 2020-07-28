using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp1.Interfaces
{
    public interface IGitHubService
    {
        public Task<IReadOnlyList<Repository>> getRepos(string user);
    }
}
