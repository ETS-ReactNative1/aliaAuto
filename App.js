import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import Root from './src/routes/Root';
import axios from 'axios';
import store from './src/store';
import {Provider, connect} from 'react-redux';
import {authApi} from './src/api';
import {saveToken} from './src/store/actions';
import appConfig from './src/config/appConfig.json';

axios.defaults.baseURL = appConfig.globalUri;

axios.defaults.timeout = 3000;

axios.interceptors.request.use((request) => {
  console.log('starting request', request.url);
  return request;
});

export default class App extends Component {
  state = {
    initial: 'signIn',
  };

  constructor(props) {
    super(props);
    this.store = store;
  }

  saveTokenToStore = (tokens) => {
    this.store.dispatch(saveToken(tokens));
  };

  async componentDidMount() {
    const tokens = await authApi.getTokens();
    if (tokens.token !== null) {
      // todo
      // check if token is dead or not
      // change to home
      this.saveTokenToStore(tokens);
      this.setState({initial: 'signIn'});
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Root theme="light" initial={this.state.initial} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexGrow: 1,
    //height: Dimensions.get('window').height + StatusBar.currentHeight,
    //flex: 1,
    backgroundColor: '#EDEEEF',
  },
});
