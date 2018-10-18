import * as React from 'react';
import './../assets/scss/App.scss';
// Import Excercise Library from Built version using relative path
// Ideally this would be from published package location
import { Helper } from '../../../common/lib/helper';
import * as ReactCountdownClock from 'react-countdown-clock';

const reactLogo = require('./../assets/img/react_logo.svg');

enum SkillLevel {
  Beginner = 'Beginner',
  Talented = 'Talented',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert'
}
export interface AppProps {}
export interface IAppState {
  timerStarted: boolean;
  timerPaused: boolean;
  a: number;
  b: number;
  skillLevel: SkillLevel;
  timeRemaining: number;
}
class AppState implements IAppState {
  timerStarted: boolean;
  timerPaused: boolean;
  a: number;
  b: number;
  skillLevel: SkillLevel;
  timeRemaining: number;
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
    this.state = initialState;
  }

  timerComplete = () => {
    console.log('Timer Completed');
  };
  startTimer = () => {
    this.setState({ timerStarted: true });
  };
  submitAnswer = () => {
    this.setState({ timerPaused: true });
  };
  render() {
    const h: Helper = new Helper();
    const result: number = h.add(this.state.a, this.state.b);
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

        {this.state.timerStarted && (
          <div>
            <h1>Your skill level is : {this.state.skillLevel}</h1>
            <ReactCountdownClock
              size={200}
              seconds={this.state.timeRemaining}
              onComplete={this.timerComplete}
              paused={this.state.timerPaused}
            />
            <h2>
              What is {this.state.a} + {this.state.b} = ?{' '}
              <input type="text" value={result} onChange={() => {}} />{' '}
              <button type="button" onClick={this.submitAnswer}>
                Submit
              </button>
            </h2>
          </div>
        )}
      </div>
    );
  }
}
