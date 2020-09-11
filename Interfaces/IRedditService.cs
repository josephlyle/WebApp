using System;
using System.Collections.Generic;

namespace WebApp1.Interfaces
{
    public interface IRedditService
    {
        public List<Tuple<string, string, string>> getHotPosts(string subRedditName, int num);
    }
}
