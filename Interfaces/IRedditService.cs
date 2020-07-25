using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp1.Interfaces
{
    public interface IRedditService
    {
        public List<Tuple<string, string, string>> getTopPosts(string subRedditName, int num);
    }
}
