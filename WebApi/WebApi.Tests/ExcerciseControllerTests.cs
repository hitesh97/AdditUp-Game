using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Controllers;
using WebApi.Model;

namespace WebApi.Tests
{

    [TestClass]
    public class ExcerciseControllerTests
    {
        [TestMethod]
        public void DefaultsUserIdAndReturnsQuestion()
        {
            INumberGenerator numberGenerator = new NumberGenerator();
            ExcerciseController controller = new ExcerciseController(numberGenerator);
            var question = controller.Get(string.Empty);
            Assert.IsNotNull(question);
        }

        [TestMethod]
        public void ReturnsQuestionForGivenUserId()
        {
            INumberGenerator numberGenerator = new NumberGenerator();
            ExcerciseController controller = new ExcerciseController(numberGenerator);
            var question = controller.Get("2");
            Assert.IsNotNull(question);
        }

        [TestMethod]
        public void ReducesTimeRemainingForRepeatQuestionSameUserId()
        {
            INumberGenerator numberGenerator = new NumberGenerator();
            ExcerciseController controller = new ExcerciseController(numberGenerator);

            const string userId = "3";

            var question = controller.Get(userId);
            Assert.IsNotNull(question);
            Assert.AreEqual(question.secondsRemaining, 20);

            var question2 = controller.Get(userId);
            Assert.IsNotNull(question2);
            Assert.AreEqual(question2.secondsRemaining, 19);

            var question3 = controller.Get(userId);
            Assert.IsNotNull(question3);
            Assert.AreEqual(question3.secondsRemaining, 18);
        }

        [TestMethod]
        public void PostAnswerVerifiesCorrectAnswer()
        {
            INumberGenerator numberGenerator = new NumberGenerator();
            ExcerciseController controller = new ExcerciseController(numberGenerator);
            QuestionPostModel questionPostModel = new QuestionPostModel();
            Question question = new Question();
            question.a = 20;
            question.b = 20;
            questionPostModel.question = question;
            questionPostModel.answer = 40;
            var result = controller.PostAnswer(questionPostModel);

            Assert.IsTrue(result);
        }

        [TestMethod]
        public void PostAnswerVerifiesInCorrectAnswer()
        {
            INumberGenerator numberGenerator = new NumberGenerator();
            ExcerciseController controller = new ExcerciseController(numberGenerator);

            QuestionPostModel questionPostModel = new QuestionPostModel();
            Question question = new Question();
            question.a = 20;
            question.b = 30;
            questionPostModel.question = question;
            questionPostModel.answer = 40;

            var result = controller.PostAnswer(questionPostModel);

            Assert.IsFalse(result);
        }
    }
}
