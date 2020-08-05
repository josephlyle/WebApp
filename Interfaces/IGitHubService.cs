using Microsoft.AspNetCore.Mvc;
using Octokit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApp1.Interfaces
{
    public interface IGitHubService
    {
        public Task<IEnumerable<Repository>> getRepos(string user);
    }
}
