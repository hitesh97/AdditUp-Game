import { QuestionModel } from './QuestionModel';
import axios, { AxiosResponse } from 'axios';

export class AddUpService {
  async getNewQuestion(
    previousQuestion?: QuestionModel
  ): Promise<QuestionModel> {
    const prevId = previousQuestion ? previousQuestion.id : -1;
    return await axios
      .get(`http://localhost:56000/api/exercise`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          userId: '1' //TODO: generate new userid for new user!!
        }
      })
      .then((result: AxiosResponse<QuestionModel>) => {
        return result.data;
      });
  }
  async ValidateAnswer(question: QuestionModel, answer: number) {
    //return a + b === answer;
    return await axios
      .post(`http://localhost:56000/api/excercise/validate`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          userId: '1' //TODO: generate new userid for new user!!
        },
        data: JSON.stringify({ question: question, answer: answer })
      })
      .then((result: AxiosResponse<boolean>) => {
        return result.data;
      });
  }
}
