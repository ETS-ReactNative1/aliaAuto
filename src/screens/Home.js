import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import CarAnnonce from '../components/CarAnnonce';
import {carAnnounceApi} from '../api';
import Colors from '../constants/Colors';

const {height, width} = Dimensions.get('window');
const list = [
  {img: require('../../assets/peugeut.jpg'), id: 0},
  {img: require('../../assets/golf.jpg'), id: 1},
  {img: require('../../assets/ford.jpg'), id: 2},
];

class Home extends Component {
  state = {
    isLoaded: false,
    annonces: [],
  };

  componentDidMount() {
    carAnnounceApi.getAllAnnounce(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header search iconLeft iconRight />
        {!this.state.isLoaded ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.$baseOrange} />
          </View>
        ) : (
          <FlatList
            style={styles.listContainer}
            data={this.state.annonces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <CarAnnonce annonce={item} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginVertical: 25,
    //marginTop: 25,
    paddingHorizontal: 15,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: height - 160,
  },
});

export default Home;
