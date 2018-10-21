using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Question
    {
        public int Id { get; set; }
        public int X { get; set; }

        public int Y { get; set; }

        public int TimeReamining { get; set; }

    }
    public class Exercise
    {
        public Question CurrentQuestion { private set; get; }

        // Method to create an exercise of type a + b = ?
        public static Exercise createExercise()
        {
            Exercise ex = new Exercise();
            
            Question question = new Question();
            //question.TimeReamining = (prevQuestion != null) ? prevQuestion.TimeReamining - 1 : 20;
            question.TimeReamining = 20;
            Random rnd = new Random(1);

            question.X = rnd.Next(10);
            question.Y = rnd.Next(10);
            ex.CurrentQuestion = question;

            return ex;
        }
    }
}
