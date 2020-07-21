using Microsoft.AspNetCore.Mvc;
using Octokit;

namespace WebApp1.Controllers
{
    [ApiController]
    public class GitHubController : ControllerBase
    {
        [HttpGet]
        [Route("api/GitHubController")]
        public async System.Threading.Tasks.Task<IActionResult> IndexAsync()
        {
            var github = new GitHubClient(new ProductHeaderValue("MyAmazingApp"));
            var user = await github.User.Get("josephlyle");
            var user2 = await github.Repository.GetAllForUser("josephlyle");
  
            return Ok(user2);
        }
    }
}
