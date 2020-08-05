﻿using Microsoft.AspNetCore.Mvc;
using Octokit;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<Repository>> getRepos(string user)
        {
            var repositories = await _getHubRepo.getRepos(user);
           // List<Repository> repoList = new List<Repository>(repositories); // convert IReadOnlyList into a List
            return repositories;
            /*
            List<Dictionary<string, string>> repoDict = new List<Dictionary<string, string>>();
            foreach (var repo in repoList)
            {
                Dictionary<string, string> dict = new Dictionary<string, string>
                {
                    { "repoName", repo.Name },
                    { "desc", repo.Description },
                    { "url", repo.Url }
                };
                repoDict.Add(dict);
            }
            return repoDict;
            */
        }
    }
}
