using Reddit;
using Reddit.Inputs;
using System;
using System.Collections.Generic;
using WebApp1.Interfaces;

namespace WebApp1.Repos
{
    public class RedditRepo: IRedditRepo
    {
        private readonly RedditClient reddit;
        public RedditRepo()
        {
            reddit = new RedditClient(appId: "dDjh9osAv4Qf0g", appSecret: "xU2VIooyjOh2z8YQ0-p775K1y-k", refreshToken: "576921060013-oDTQSRthMHgRIYA5XuhszUv4-1k");
        }
        // returns top posts of desired subreddit
        public Reddit.Things.PostContainer getTopPosts(string subRedditName, int num)
        {
            // return top *num* posts from *subRedditName* 
            return reddit.Models.Listings.Top(new TimedCatSrListingInput(limit: num), subRedditName);
        }
    }
}
