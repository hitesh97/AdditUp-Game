import { IExcercise, Excercise } from './IExcercise';

export class Helper {
  add(i: number, j: number): number {
    return i + j;
  }
}

export class AddUpService {
  isCorrectAnswer(a: number, b: number, answer: number) {
    return a + b === answer;
  }
}
