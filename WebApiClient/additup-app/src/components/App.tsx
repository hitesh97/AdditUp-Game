import * as React from 'react';
import './../assets/scss/App.scss';
// Import Excercise Library from Built version using relative path
// Ideally this would be from published package location
import { Helper } from '../../../common/lib/helper';

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
  a: number;
  b: number;
  skillLevel: SkillLevel;
}
class AppState implements IAppState {
  a: number;
  b: number;
  skillLevel: SkillLevel;
}

export default class App extends React.Component<AppProps, IAppState> {
  constructor(props: AppProps) {
    super(props);
    const initialState: IAppState = new AppState();
    initialState.a = 3;
    initialState.b = 4;
    initialState.skillLevel = SkillLevel.Beginner;
    this.state = initialState;
  }

  render() {
    const h: Helper = new Helper();
    const result: number = h.add(this.state.a, this.state.b);
    return (
      <div className="app">
        <p>
          <img src={reactLogo} height="40" width="40" className="logo" />
          <h1>Welcome to Add it Up!!</h1>
        </p>
        <p>Your skill level is : {this.state.skillLevel}</p>
        <h2>
          What is {this.state.a} + {this.state.b} = ?{' '}
          <input type="text" value={result} />{' '}
          <button type="button">Submit</button>
        </h2>
      </div>
    );
  }
}
