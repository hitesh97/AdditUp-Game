using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace WebApi.Model
{
    public class Question
    {
        public int Id { get; set; }
        public int a { get; set; }

        public int b { get; set; }

        public int secondsRemaining { get; set; }

    }
    public class Exercise
    {
        public Question CurrentQuestion { private set; get; }
        Random rnd = new Random();

        static Dictionary<string, Question> _dict = new Dictionary<string, Question> { };
        // Method to create an exercise of type a + b = ?

        internal Question getQuestionForUser(String userId)
        {
            Question question = new Question();
            question.a = rnd.Next(1, 100);
            question.b = rnd.Next(1, 100);

            //user had been sent a question previously
            if (_dict.ContainsKey(userId))
            {   
                question.secondsRemaining = _dict[userId].secondsRemaining - 1;
                _dict[userId] = question;
            }else
            {
                question.secondsRemaining = 20;
                _dict[userId] = question;
            }

            return question;
        }
    }
}
