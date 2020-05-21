import React, {Component} from 'react';
import {Text, View} from 'react-native';
import SignUpPro1 from './SignUpPro1';
import SignUpPro2 from './SignUpPro2';

class SignUpProWrapper extends Component {
  state = {
    current: 1,
    page1: {},
    page2: {
      checked: '',
      selectedVille: {},
    },
  };

  saveState = (state, page) => {
    console.log('called');
    if (page === 1) this.setState({current: 2, page1: state});
    if (page === 2) this.setState({current: 1, page2: state});
  };

  render() {
    const currentScreen =
      this.state.current === 1 ? (
        <SignUpPro1 state={this.state.page1} saveState={this.saveState} />
      ) : (
        <SignUpPro2 state={this.state} saveState={this.saveState} />
      );
    return currentScreen;
  }
}

export default SignUpProWrapper;
