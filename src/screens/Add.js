import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Header from '../components/Header';
import NewAnnonce from '../components/newAnnonce/NewAnnonceP1';

export default class Add extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="nouvelle annonce" iconLeft />
        <View style={{flex: 1, paddingVertical: 15}}>
          <NewAnnonce />
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
