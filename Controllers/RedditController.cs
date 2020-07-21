using Microsoft.AspNetCore.Mvc;
using RedditSharp;
using Reddit;
using System.Net.Http;
using System.Collections.Generic;
using System.IO;
using Reddit.Inputs;
using System.Text.Json;

namespace WebApp1.Controllers
{
    [ApiController]
    public class RedditController : ControllerBase
    {
        [HttpGet]
        [Route("api/RedditController")]
        public async System.Threading.Tasks.Task<IActionResult> IndexAsync()
        {
            // reddit.net
            List<string> spacePicArr = new List<string> { };
            var reddit = new RedditClient(appId: "dDjh9osAv4Qf0g", appSecret: "xU2VIooyjOh2z8YQ0-p775K1y-k", refreshToken: "576921060013-oDTQSRthMHgRIYA5XuhszUv4-1k");
            var space = reddit.Models.Subreddits.About("spaceporn");
            var topPost = reddit.Models.Listings.Top(new TimedCatSrListingInput(), "spaceporn").Data.Children;
            foreach(var x in topPost)
            {
                spacePicArr.Add(x.Data.URL);
            }
            return Ok(spacePicArr);
        }

        /*https://www.reddit.com/api/v1/authorize?client_id=dDjh9osAv4Qf0g&response_type=code&state=randomstate&redirect_uri=http://localhost:5001/Reddit.NET/oauth2Redirect&duration=permanent&scope=[read]
        http://localhost:5001/Reddit.NET/oauth2Redirect
         used to get refresh link
         */
    }
}
