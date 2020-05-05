import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Root from './src/routes/Root';
import axios from 'axios';
import store from './src/store';
import {Provider, connect} from 'react-redux';

axios.defaults.baseURL = 'http://142.93.111.57/';

axios.defaults.timeout = 3000;

axios.interceptors.request.use((request) => {
  console.log('starting request', request.url);
  return request;
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Root theme="light" />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEEEF',
  },
});
