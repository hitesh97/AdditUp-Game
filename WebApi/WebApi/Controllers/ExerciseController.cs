using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/exercise")]
    public class ExerciseController : Controller
    {
        // GET api/exercise
        [HttpGet]
        public Exercise GetExercise()
        {
            return Exercise.createExercise();
        }


        // POST api/exercise
        [HttpPost]
        public Exercise PostAnswer([FromBody]string value)
        {
            throw new NotImplementedException();
        }
    }
}
