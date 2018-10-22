using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using WebApi.Model;

namespace WebApi.Tests
{
    [TestClass]
    public class ExcerciseTests
    {
        [TestMethod]
        public void ReturnsQuestionWithNonZero()
        {
            var userId1 = Guid.NewGuid().ToString();
            INumberGenerator numberGenerator = new NumberGenerator();
            Exercise exercise = new Exercise(numberGenerator);
            var question = exercise.getQuestionForUser(userId1);
            Assert.IsNotNull(question);
            Assert.IsTrue(question.a > 0);
            Assert.IsTrue(question.b > 0);
            Assert.IsTrue(question.secondsRemaining == 20);
        }

        [TestMethod]
        public void ReturnsReducingTimeRemainingForSameUser()
        {
            var userId1 = Guid.NewGuid().ToString();
            INumberGenerator numberGenerator = new NumberGenerator();
            Exercise exercise = new Exercise(numberGenerator);
            var question = exercise.getQuestionForUser(userId1);
            Assert.IsNotNull(question);
            Assert.IsTrue(question.a > 0);
            Assert.IsTrue(question.b > 0);
            Assert.IsTrue(question.secondsRemaining == 20);

            var question2 = exercise.getQuestionForUser(userId1);
            Assert.IsNotNull(question2);
            Assert.IsTrue(question2.a > 0);
            Assert.IsTrue(question2.b > 0);
            //assert that time is reduced by 1 second!
            Assert.IsTrue(question2.secondsRemaining == 19);

            var question3 = exercise.getQuestionForUser(userId1);
            Assert.IsNotNull(question2);
            Assert.IsTrue(question3.a > 0);
            Assert.IsTrue(question3.b > 0);
            //assert that time is reduced by 1 second! further!!
            Assert.IsTrue(question3.secondsRemaining == 18);
        }

        [TestMethod]
        public void ReturnsQuestionWithUniqueNumbers()
        {
            var generator = new Moq.Mock<INumberGenerator>();
            //setup mock generator to return same number multiple times!!
            generator.SetupSequence(x => x.Generate())
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(10)
                .Returns(12)
                .Returns(15);

            Exercise exercise = new Exercise(generator.Object);
            //generate new user ID Everytime!!
            var userId1 = Guid.NewGuid().ToString();
            var question = exercise.getQuestionForUser(userId1);
            Assert.IsNotNull(question);
            Assert.IsTrue(question.a == 10);
            Assert.IsTrue(question.b == 10);
            Assert.IsTrue(question.secondsRemaining == 20);

            //Assert that the second question had new/unique numbers
            // but 20 seconds time remaining as its different user!

            //generate new user ID Everytime!!
            var userId2 = Guid.NewGuid().ToString(); ;
            var question2 = exercise.getQuestionForUser(userId2);
            Assert.IsNotNull(question2);
            Assert.IsTrue(question2.a == 12);
            Assert.IsTrue(question2.b == 15);
            Assert.IsTrue(question2.secondsRemaining == 20);

        }


    }
}
