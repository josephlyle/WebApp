using Reddit.Inputs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp1.Interfaces;

namespace WebApp1.Services
{
    public class RedditService : IRedditService
    {
        private readonly IRedditRepo _redditRepo;
        public RedditService(IRedditRepo redditRepo)
        {
            _redditRepo = redditRepo;
        }
        public List<Tuple<string, string, string>> getTopPosts(string subRedditName, int num)
        {
            // reddit.net
            List<Tuple<string, string, string>> topPostArray = new List<Tuple<string, string, string>> { };
            var topPosts = (_redditRepo.getSubTopPosts(subRedditName, num)).Data.Children;
            topPosts.ForEach(x => { 
                var tuple = new Tuple<string, string, string>(x.Data.Title, x.Data.URL, x.Data.Permalink);
                topPostArray.Add(tuple);
            });
            
            return topPostArray;
        }
    }
}
