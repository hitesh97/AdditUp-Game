export class QuestionModel {
  constructor(id: number, a: number, b: number, secondsRemaining: number) {
    this.id = id;
    this.a = a;
    this.b = b;
    this.secondsRemaining = secondsRemaining;
  }

  id: number = 0;
  a: number = 0;
  b: number = 0;
  secondsRemaining: number = 0;
}
