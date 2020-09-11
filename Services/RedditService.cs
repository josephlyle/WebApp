using System;
using System.Collections.Generic;
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
        public List<Tuple<string, string, string>> getHotPosts(string subRedditName, int num)
        {
            // reddit.net
            List<Tuple<string, string, string>> topPostArray = new List<Tuple<string, string, string>> { };
            // get a list of the top posts and grab the info we care about
            (_redditRepo.getHotPosts(subRedditName, num)).Data.Children
                .ForEach(x => { 
                var tuple = new Tuple<string, string, string>(x.Data.Title, x.Data.URL, x.Data.Permalink);
                topPostArray.Add(tuple);
            });
            
            return topPostArray;
        }
    }
}
