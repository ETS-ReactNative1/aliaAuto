import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import Root from './src/routes/Root';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Root theme="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
