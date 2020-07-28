using Microsoft.AspNetCore.Mvc;
using Octokit;
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

        [HttpGet]
        [Route("api/GitHubController")]
        public async System.Threading.Tasks.Task<IActionResult> IndexAsync()
        {  
            var test = await _gitHubService.getRepos("josephlyle");
            return Ok(test);
        }
    }
}
