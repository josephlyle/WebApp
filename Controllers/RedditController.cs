using Microsoft.AspNetCore.Mvc;
using Reddit;
using System.Collections.Generic;
using Reddit.Inputs;
using WebApp1.Interfaces;

namespace WebApp1.Controllers
{
    [ApiController]
    public class RedditController : ControllerBase
    {
        private readonly IRedditService _redditService;
        public RedditController(IRedditService redditService)
        {
            _redditService = redditService;
        }

        [HttpGet]
        [Route("api/RedditController")]
        public ActionResult Index()
        {
            var topPosts = _redditService.getTopPosts("spaceporn", 100);
            return Ok(topPosts);
        }
    }
}


/*https://www.reddit.com/api/v1/authorize?client_id=dDjh9osAv4Qf0g&response_type=code&state=randomstate&redirect_uri=http://localhost:5001/Reddit.NET/oauth2Redirect&duration=permanent&scope=[read]
            http://localhost:5001/Reddit.NET/oauth2Redirect
            used to get refresh link
*/
