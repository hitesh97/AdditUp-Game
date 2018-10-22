using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("WebApi.Tests")]

namespace WebApi.Model
{
    public class Exercise
    {
        public Question CurrentQuestion { private set; get; }
        //TODO: Use better number generating strategy here!!
        Random rnd = new Random();

        static Dictionary<string, Question> _dict = new Dictionary<string, Question> { };
        private readonly INumberGenerator numberGenerator;

        public Exercise(INumberGenerator numberGenerator)
        {
            this.numberGenerator = numberGenerator;
        }

        internal Question getQuestionForUser(String userId)
        {
            Question question = new Question();
            question.a = numberGenerator.Generate();
            question.b = numberGenerator.Generate();

            if(!areNumbersUnique(question.a, question.b))
            {
                //generate new numbers until unique
                question.a = numberGenerator.Generate();
                question.b = numberGenerator.Generate();

                while (!areNumbersUnique(question.a, question.b))
                {
                    question.a = numberGenerator.Generate();
                    question.b = numberGenerator.Generate();
                }
            }
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

        internal bool areNumbersUnique(int a, int b)
        {
            //TODO : improve this logic if the numbers are sent in different order
            return !_dict.Values.Any(x => (x.a == a && x.b == b));
        }
    }
}
