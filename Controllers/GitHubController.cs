using Microsoft.AspNetCore.Mvc;
using Octokit;
using System;
using WebApp1.Interfaces;

namespace WebApp1.Controllers
{
    [ApiController]
    public class GitHubController : ControllerBase
    {
        private readonly IGitHubService _gitHubService;
        
        public GitHubController(IGitHubService gitHubService)
        {
            _gitHubService = gitHubService;
        }

        [HttpPost]
        [Route("api/GitHubController/getUsersRepos")]
        public async System.Threading.Tasks.Task<IActionResult> IndexAsync([FromBody] string user)
        {
            var repos = await _gitHubService.getRepos(user);
            return Ok(repos);
        }
    }
}
