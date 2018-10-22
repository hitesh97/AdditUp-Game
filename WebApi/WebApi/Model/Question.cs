namespace WebApi.Model
{
    public class Question
    {
        public Question()
        {

        }
        public int id { get; set; }
        public int a { get; set; }

        public int b { get; set; }

        public int secondsRemaining { get; set; }

    }

    public class QuestionPostModel
    {
        public QuestionPostModel()
        {

        }
        public Question question  { get;set; }
        public int answer { get; set; }
    }
}
