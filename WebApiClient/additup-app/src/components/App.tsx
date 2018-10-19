import * as React from 'react';
import './../assets/scss/App.scss';
// Import Excercise Library from Built version using relative path
// Ideally this would be from published package location
import { AddUpService } from '../../../common/lib/helper';
import * as ReactCountdownClock from 'react-countdown-clock';

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
  a: number;
  b: number;
  skillLevel: SkillLevel;
  timeRemaining: number;
  correctCount: number;
  incorrectCount: number;
  curentAnswer: number;
}
class AppState implements IAppState {
  timerStarted: boolean;
  timerPaused: boolean;
  isSubmitted: boolean;
  a: number;
  b: number;
  skillLevel: SkillLevel;
  timeRemaining: number;
  correctCount: number;
  incorrectCount: number;
  curentAnswer: number;
}

export default class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);
    const initialState: IAppState = new AppState();
    initialState.a = 3;
    initialState.b = 4;
    initialState.skillLevel = SkillLevel.Beginner;
    initialState.timeRemaining = 20;
    initialState.timerStarted = false;
    initialState.correctCount = 0;
    initialState.incorrectCount = 0;
    this.state = initialState;
  }

  timerComplete = () => {
    console.log('Timer Completed');
  };
  startTimer = () => {
    this.setState({ timerStarted: true });
  };
  updateAnswer = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    this.setState({ curentAnswer: parseInt(e.currentTarget.value) });
  };
  isCorrectAnswer = (a, b, answer): boolean => {
    const h: AddUpService = new AddUpService();
    return h.isCorrectAnswer(this.state.a, this.state.b, answer);
  };
  submitAnswer = () => {
    const prevCorrectCount = this.state.correctCount;
    const previnCorrectCount = this.state.incorrectCount;
    const isCorrect: boolean = this.isCorrectAnswer(
      this.state.a,
      this.state.b,
      this.state.curentAnswer
    );

    this.setState({
      timerPaused: true,
      isSubmitted: true
    });
    if (isCorrect) {
      const currCorrectCount = prevCorrectCount + 1;
      let prevSkillLevel: SkillLevel = this.state.skillLevel;
      let currSkillLevel: SkillLevel = this.state.skillLevel;

      if (currCorrectCount === 1) {
        currSkillLevel = prevSkillLevel + 1;
      }

      this.setState({
        correctCount: currCorrectCount,
        skillLevel: currSkillLevel
      });
    } else {
      this.setState({ incorrectCount: previnCorrectCount + 1 });
    }
  };
  render() {
    return (
      <div className="app">
        <img src={reactLogo} height="40" width="40" className="logo" />
        <h1>Welcome to Add it Up!!</h1>

        {!this.state.timerStarted && (
          <div>
            <h1>Would you like to play the game?</h1>
            <button type="button" onClick={this.startTimer}>
              Start
            </button>
          </div>
        )}

        {this.state.timerStarted &&
          this.state.incorrectCount < 1 && (
            <div>
              <h1>Your skill level is : {SkillLevel[this.state.skillLevel]}</h1>
              <ReactCountdownClock
                size={200}
                seconds={this.state.timeRemaining}
                onComplete={this.timerComplete}
                paused={this.state.timerPaused}
              />
              <h2>
                What is {this.state.a} + {this.state.b} = ?{' '}
                <input
                  type="text"
                  onChange={e => {
                    this.updateAnswer(e);
                  }}
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
        {this.state.incorrectCount >= 1 && <h1>Game Over!!</h1>}
      </div>
    );
  }
}
