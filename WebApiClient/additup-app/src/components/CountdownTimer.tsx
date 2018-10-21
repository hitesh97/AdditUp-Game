import { Component } from 'react';
import * as React from 'react';

interface TimerProps {
  secondsRemaining: number;
  onComplete: Function;
  stopTimer: boolean;
}
interface TimerState {
  minutes: any;
  seconds: number;
}

export class CountdownTimer extends Component<TimerProps, TimerState> {
  static defaultProps: Partial<TimerProps> = {};
  timer;
  constructor(props: TimerProps, state: TimerState) {
    super(props, state);
    this.state = {
      minutes: 0,
      seconds: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.secondsRemaining > 0 &&
      this.props.secondsRemaining !== nextProps.secondsRemaining
    ) {
      clearInterval(this.timer);
      this.startTimer(nextProps.secondsRemaining);
    }
  }

  startTimer = (secondsRemaining: number) => {
    let duration = secondsRemaining;
    this.setState({
      minutes: 0,
      seconds: secondsRemaining
    });
    const that = this;
    this.timer = setInterval(function() {
      duration = duration - 1;
      that.diff(duration);
    }, 1000);
  };
  componentWillMount() {
    this.startTimer(this.props.secondsRemaining);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({
      minutes: 0,
      seconds: 0
    });
  }

  diff(diff) {
    if (diff < 1) {
      clearInterval(this.timer);
      this.props.onComplete();
    } else {
      if (this.props.stopTimer) {
        clearInterval(this.timer);
      } else {
        let seconds = Math.floor(diff);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds;
        minutes = minutes % 60;
        this.setState({
          seconds: seconds
        });
      }
    }
  }
  render() {
    return (
      <h2>
        Time Remaining: {this.state.minutes} Mins
        {this.state.minutes === 0 ? ` ${this.state.seconds} secs` : null}
      </h2>
    );
  }
}
