using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp1.Interfaces;

namespace WebApp1.Services
{
    public class GitHubService: IGitHubService
    {
        private readonly IGitHubRepo _getHubRepo;
        public GitHubService(IGitHubRepo getHubRepo)
        {
            _getHubRepo = getHubRepo;
        }

        public Task<IReadOnlyList<Repository>> getRepos(string user)
        {
            return _getHubRepo.getRepos(user);
        }
    }
}
