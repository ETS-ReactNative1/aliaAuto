import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import appConfig from '../config/appConfig.json';

const {height, width} = Dimensions.get('window');

export default class CarAnnonce extends Component {
  render() {
    const {annonce} = this.props;
    const imagePath = '/backservice/file/download/temp/';
    return (
      <View style={styles.globalContainer}>
        <Image
          //source={require('../../assets/ford.jpg')}
          source={{
            uri: appConfig.globalUri + imagePath + annonce.principaleImage.path,
          }}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={{margin: 15}}>
          <Text style={styles.text}>{annonce.title}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.priceContainer}>
              <Feather name="tag" size={22} color={Colors.$baseOrange} />
              <Text style={styles.priceText}>{annonce.price}€</Text>
            </View>
            <View style={styles.posContainer}>
              <Feather name="map-pin" size={22} color={Colors.$iconLightGray} />
              <Text style={styles.posText}>
                {annonce.location.region_name} {annonce.location.commune_name} (
                {annonce.location.zip_code})
              </Text>
            </View>
            <View
              style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntIcon name="heart" size={22} color={Colors.$iconLightGray} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globalContainer: {
    borderRadius: 14,
    backgroundColor: Colors.$white,
    overflow: 'hidden',
    marginBottom: 15,
  },
  img: {
    width: '100%',
    height: 140,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
  },
  posContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  text: {
    color: Colors.$textBlack,
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceText: {
    color: Colors.$baseOrange,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  posText: {
    color: Colors.$iconLightGray,
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
