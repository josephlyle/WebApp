﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Reddit;

namespace WebApp1.Interfaces
{
    public interface IRedditRepo
    {
        public Reddit.Things.PostContainer getHotPosts(string subRedditName, int num);
    }
}
