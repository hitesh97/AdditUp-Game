import * as React from 'react';
import './../assets/scss/App.scss';
// Import Excercise Library from Built version using relative path
// Ideally this would be from published package location
import { AddUpService } from '../../../common/lib/AddUpService';
import { QuestionModel } from '../../../common/lib/QuestionModel';

import { CountdownTimer } from './CountdownTimer';

const reactLogo = require('./../assets/img/react_logo.svg');

enum SkillLevel {
  Beginner = 0,
  Talented = 1,
  Intermediate = 2,
  Advanced = 3,
  Expert = 4
}
export interface AppProps {}
export interface IAppState {
  timerStarted: boolean;
  timerPaused: boolean;
  isSubmitted: boolean;
  skillLevel: SkillLevel;
  correctCount: number;
  incorrectCount: number;
  curentAnswer: string;
  newGame: boolean;
  newQuestion: boolean;
  questionModel: QuestionModel;
  gameOver: boolean;
}
class AppState implements IAppState {
  timerStarted: boolean;
  timerPaused: boolean;
  isSubmitted: boolean;
  skillLevel: SkillLevel = SkillLevel.Beginner;
  correctCount: number = 0;
  incorrectCount: number = 0;
  curentAnswer: string;
  newGame: boolean = true;
  newQuestion: boolean = false;
  questionModel: QuestionModel;
  gameOver: boolean = false;
}

export default class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);
    const initialState: IAppState = new AppState();
    initialState.curentAnswer = '';
    this.state = initialState;
  }

  timerComplete = () => {
    this.resetGameState();
  };

  startGame = () => {
    // get new game from add Up service
    const h: AddUpService = new AddUpService();
    const questionModel: QuestionModel = h.getNewQuestion();

    const newGameState = this.createNewGame(questionModel, false, true);
    this.setState(newGameState);
    this.startTimer();
  };

  startTimer = () => {
    this.setState({ timerStarted: true, timerPaused: false });
  };

  updateAnswer = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    this.setState({ curentAnswer: e.currentTarget.value });
  };

  submitAnswer = () => {
    // first pause the timer!
    this.setState({
      timerPaused: true,
      isSubmitted: true
    });

    const prevCorrectCount = this.state.correctCount;
    const previnCorrectCount = this.state.incorrectCount;

    let prevSkillLevel: SkillLevel = this.state.skillLevel;
    let currSkillLevel: SkillLevel = this.state.skillLevel;

    // check answer with addUpService
    const h: AddUpService = new AddUpService();
    const isCorrect: boolean = h.isCorrectAnswer(
      this.state.questionModel.a,
      this.state.questionModel.b,
      parseInt(this.state.curentAnswer)
    );

    if (isCorrect) {
      const currCorrectCount = prevCorrectCount + 1;
      // Check if we reached max correct count!
      // if so, increment the skill level
      if (currCorrectCount % 3 === 0) {
        currSkillLevel = prevSkillLevel + 1;
        // cannot increment skill level any more!!
        if (currSkillLevel >= SkillLevel.Talented) {
          currSkillLevel = SkillLevel.Talented;
        }
      }
      const newQuestion = h.getNewQuestion(this.state.questionModel);
      this.setState(
        {
          correctCount: currCorrectCount,
          isSubmitted: false,
          skillLevel: currSkillLevel,
          questionModel: newQuestion,
          timerPaused: false,
          curentAnswer: ''
        },
        () => {
          console.log('**************************');
          console.log(currCorrectCount);
          console.log(this.state.correctCount);
          console.log('**************************');
        }
      );
    } else {
      const currIncorrectCount = previnCorrectCount + 1;
      this.setState({ incorrectCount: currIncorrectCount });
      // game over!!
      // start over ?
      this.resetGameState();
    }
  };

  resetGameState = () => {
    this.setState({
      newGame: true,
      timerPaused: true,
      correctCount: 0,
      incorrectCount: 0,
      isSubmitted: false,
      curentAnswer: '',
      gameOver: true
    });
  };

  createNewGame = (
    questionModel: QuestionModel,
    newGame: boolean,
    newQuestion: boolean
  ): IAppState => {
    const initialState: IAppState = new AppState();
    initialState.questionModel = questionModel;
    initialState.skillLevel = SkillLevel.Beginner;
    initialState.timerStarted = false;
    initialState.newGame = newGame;
    initialState.newQuestion = newQuestion;
    return initialState;
  };

  render() {
    return (
      <div className="app">
        <img src={reactLogo} height="40" width="40" className="logo" />
        <h1>Welcome to Add it Up!!</h1>

        {this.state.newGame && (
          <div>
            {!this.state.gameOver && <h1>Would you like to play the game?</h1>}
            {this.state.gameOver && (
              <h1>Game Over!! Would you like to restart the game?</h1>
            )}
            <button type="button" onClick={this.startGame}>
              yes
            </button>
          </div>
        )}
        {!this.state.newGame &&
          this.state.newQuestion && (
            <div>
              <h1>Your skill level is : {SkillLevel[this.state.skillLevel]}</h1>
              <CountdownTimer
                secondsRemaining={this.state.questionModel.secondsRemaining}
                onComplete={this.timerComplete}
                stopTimer={this.state.timerPaused}
              />
              <h2>
                What is {this.state.questionModel.a} +{' '}
                {this.state.questionModel.b} = ?{' '}
                <input
                  type="text"
                  onChange={e => {
                    this.updateAnswer(e);
                  }}
                  value={this.state.curentAnswer}
                />{' '}
                <button
                  type="button"
                  onClick={this.submitAnswer}
                  disabled={this.state.isSubmitted}
                >
                  Submit
                </button>
              </h2>
            </div>
          )}
        {this.state.incorrectCount > 1 && <h1>Game Over!!</h1>}
      </div>
    );
  }
}
