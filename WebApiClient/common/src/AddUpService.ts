import { QuestionModel } from './QuestionModel';
import axios, { AxiosResponse } from 'axios';

// TODO : Make API endpoint Configurable using Webpack and DEV/PROD configuration!!
const apiBaseURL: string = 'http://localhost:56000/api/';

export class AddUpService {
  async getNewQuestion(
    previousQuestion?: QuestionModel
  ): Promise<QuestionModel> {
    const prevId = previousQuestion ? previousQuestion.id : -1;
    return await axios
      .get(`${apiBaseURL}exercise`, {
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
      .post(
        `${apiBaseURL}excercise/validate`,
        { question: question, answer: answer },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            userId: '1', //TODO: generate new userid for new user!!
            'content-type': 'application/json'
          }
        }
      )
      .then((result: AxiosResponse<boolean>) => {
        return result.data;
      });

    /*       .post(`http://localhost:56000/api/excercise/validate`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          userId: '1', //TODO: generate new userid for new user!!
          'content-type': 'application/json'
        }
      })
      .then((result: AxiosResponse<boolean>) => {
        return result.data;
      }); */
  }
}
