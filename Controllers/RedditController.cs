using Microsoft.AspNetCore.Mvc;
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
            var topPosts = _redditService.getHotPosts("spaceporn", 100);
// TODO: create another one of these so we can combine these
            //var topPostsEarth = _redditService.getTopPosts("earthporn", 100);

            return Ok(topPosts);
        }
    }
}


/*https://www.reddit.com/api/v1/authorize?client_id=dDjh9osAv4Qf0g&response_type=code&state=randomstate&redirect_uri=http://localhost:5001/Reddit.NET/oauth2Redirect&duration=permanent&scope=[read]
            http://localhost:5001/Reddit.NET/oauth2Redirect
            used to get refresh link
*/
