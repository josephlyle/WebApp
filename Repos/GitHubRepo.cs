using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp1.Interfaces;

namespace WebApp1.Repos
{
    public class GitHubRepo : IGitHubRepo
    { 
        private readonly GitHubClient github;
        public GitHubRepo()
        {
            github = new GitHubClient(new ProductHeaderValue("MyAmazingApp"));
        }
        
        async public Task<IReadOnlyList<Repository>> getRepos(string user)
        {
            var repos = await github.Repository.GetAllForUser(user);
            //tast.GetEnumerator();
            return repos;
        }
    }
}
