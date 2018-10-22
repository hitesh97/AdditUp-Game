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
        // GET: api/<controller>
        [HttpGet]
        [Route("api/exercise")]
        public Question Get()
        {
            var headers = this.Request.Headers;
            string token = string.Empty;
            string pwd = string.Empty;
            if (headers["userId"].Any())
            {
                //check if the user had already visited the site
                // without storing any state in the appication!!
                return  new Exercise().getQuestionForUser(headers["userId"].FirstOrDefault());
            }
            else
            {
                // first time user? create new question and default to user id -1
                // TODO: generate a unique userid on server side and send it on header
                // so that client can access it and use it nex time!!
                return new Exercise().getQuestionForUser("-1");
            }
             
        }

        [HttpPost]
        [Route("api/excercise/validate")]
        public Boolean PostAnswer([FromBody]Question question, int answer)
        {
            return question.a + question.b == answer;
        }

    }
}
