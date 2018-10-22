using System;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{

    [EnableCors("CorsPolicy")]
    public class ExcerciseController : Controller
    {
        private readonly INumberGenerator numberGenerator;

        public ExcerciseController(INumberGenerator numberGenerator)
        {
            this.numberGenerator = numberGenerator;
        }
        // GET: api/<controller>
        [HttpGet]
        [Route("api/exercise")]
        public Question Get([FromHeader(Name = "userId")] string userId)
        {
            return new Exercise(this.numberGenerator).getQuestionForUser(string.IsNullOrEmpty(userId)? "-1" : userId);
        }

        [HttpPost]
        [Route("api/excercise/validate")]
        public Boolean PostAnswer([FromBody]Question question, int answer)
        {
            return question.a + question.b == answer;
        }

    }
}
