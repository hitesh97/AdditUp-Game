export enum Level {
  Beginner,
  Expert
}

export interface IGameSession {
  Id: string;
  SkillLevel: Level;
  Score: number;
}
export interface IExcercise {
  GameSession?: IGameSession;
}

export class Excercise implements IExcercise {
  GameSession?: IGameSession;
}