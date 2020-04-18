import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Header from '../components/Header';

export default class Add extends Component {
  render() {
    return (
      <View>
        <Header title="nouvelle annonce" iconLeft />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/soon.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  img: {
    width: 300,
  },
});
