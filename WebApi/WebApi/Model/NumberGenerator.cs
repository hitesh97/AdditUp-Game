using System;

namespace WebApi.Model
{
    public class NumberGenerator : INumberGenerator
    {
        Random rnd = new Random();
        
        //todo: inject number generation strategy here
        //so it can be configured and tested!!
        public int Generate()
        {
            return rnd.Next(1, 100);
        }
    }
}
