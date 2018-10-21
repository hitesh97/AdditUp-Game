import { QuestionModel } from './QuestionModel';

export class AddUpService {
  getNewQuestion(previousQuestion?: QuestionModel): QuestionModel {
    const newTimeInSeconds: number = previousQuestion
      ? previousQuestion.secondsRemaining - 1
      : 20;
    const newquestionId: number = previousQuestion
      ? previousQuestion.id + 1
      : 1;
    // generate random numbers for uniqueness between two users
    // can use some dictionary / hashing for comparision of
    // uniqueness of the question sent to two users
    const X: number = Math.floor(Math.random() * 10) + 1;
    const Y: number = Math.floor(Math.random() * 10) + 1;
    return new QuestionModel(newquestionId, X, Y, newTimeInSeconds);
  }
  async isCorrectAnswer(a: number, b: number, answer: number) {
    return a + b === answer;
  }
}
