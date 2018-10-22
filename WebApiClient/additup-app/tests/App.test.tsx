import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from '../src/components/App';
import * as renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('App Tests', () => {
  it('App is rendered - snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders start button', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ newGame: true, gameOver: false });
    expect(wrapper.find('h1').length).toEqual(2);
    const startButton = wrapper.find('button');
    expect(startButton.length).toEqual(1);
    expect(startButton.text()).toEqual('Start');
  });

  it('renders CounterTimer and question with input when New game started', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      newGame: false,
      newQuestion: true,
      skillLevel: 0,
      questionModel: { secondsRemaining: 20, a: 10, b: 10 }
    });
    expect(wrapper.find('CountdownTimer').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    const h2Wrapper = wrapper.find('h2');
    expect(h2Wrapper.length).toEqual(1);
    expect(h2Wrapper.text()).toEqual('What is 10 + 10 = ?  Submit');
  });

  it('renders re-start button', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ newGame: true, gameOver: true });
    expect(wrapper.find('h1').length).toEqual(2);
    const startButton = wrapper.find('button');
    expect(startButton.length).toEqual(1);
    expect(startButton.text()).toEqual('Re-Start');
  });
});
