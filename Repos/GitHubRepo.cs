using Microsoft.Extensions.Caching.Memory;
using Octokit;
using Polly;
using Polly.Caching;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp1.Interfaces;

namespace WebApp1.Repos
{
    public class GitHubRepo : IGitHubRepo
    { 
        private readonly GitHubClient github;
        private readonly CachePolicy cachePolicy;
        public GitHubRepo()
        {
            github = new GitHubClient(new ProductHeaderValue("MyAmazingApp"));

            var cache = new MemoryCache(new MemoryCacheOptions());
            var cacheProvider = new Polly.Caching.Memory.MemoryCacheProvider(cache);
            cachePolicy = Policy.Cache(cacheProvider, TimeSpan.FromMinutes(5));
        }
        
        public Task<IReadOnlyList<Repository>> getRepos(string user)
        {
            //var repos = await github.Repository.GetAllForUser(user);
            var repos = cachePolicy.ExecuteAndCapture(async x => await github.Repository.GetAllForUser(user), new Context(user)).Result;
            return repos;
        }
    }
}
