import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import MAterialIcon from 'react-native-vector-icons/MaterialIcons';
import FormInput from '../FormInput';
import {ScrollView} from 'react-native-gesture-handler';
import {array} from 'yup';

const {height, width} = Dimensions.get('window');

class NewAnnonceP2 extends Component {
  state = {
    isNew: true,
    images: new Array(5).fill({}),
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.twoGridContainer, {marginTop: 15}]}>
            <View style={{width: '48%'}}>
              <FormInput
                name="couleur"
                small
                placeholder="test"
                type="none"
                icon="chevron-down"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="nb de porte"
                placeholder="test"
                type="none"
                small
                material
                icon="airport-shuttle"
              />
            </View>
          </View>
          <View style={styles.twoGridContainer}>
            <View style={{width: '48%'}}>
              <FormInput
                name="nb de place"
                small
                placeholder="2020"
                type="none"
                material
                icon="airline-seat-recline-normal"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="puissance fiscale"
                placeholder="test"
                type="none"
                small
                icon="chevron-down"
              />
            </View>
          </View>
          <View style={styles.twoGridContainer}>
            <View style={{width: '48%'}}>
              <FormInput
                name="puissance din ch"
                small
                placeholder="test"
                type="none"
                materialC
                icon="speedometer"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="referance"
                placeholder="1000"
                type="none"
                small
                materialC
                icon="vote"
              />
            </View>
          </View>

          <View style={{marginTop: 30, marginBottom: 20}}>
            <Text style={styles.name}>images</Text>
            <View style={styles.imageScrollerContainer}>
              <ScrollView horizontal style={styles.imageScroller}>
                {this.state.images.map((image, index) => (
                  <TouchableOpacity>
                    <View key={index} style={styles.imageContainer}>
                      <MAterialIcon
                        name="add-a-photo"
                        size={25}
                        color={Colors.$textBlack}
                      />
                      <Text>image principale</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.buttonswrapper}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: Colors.$iconGray}]}>
              <Text style={styles.buttonText}>precedant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>suivant</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.$white,
    borderRadius: 20,
    height: '100%',
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 8,
    shadowOffset: {height: 3, width: 2},
    elevation: 2,
    //overflow: 'hidden',
  },
  test: {
    backgroundColor: 'red',
  },
  genderTitle: {
    color: Colors.$black,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  twoGridContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: Colors.$baseOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: '40%',
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 15,
    color: Colors.$black,
    textTransform: 'capitalize',
    marginLeft: 5,
    marginBottom: 25,
  },
  imageScrollerContainer: {
    borderRadius: 13,
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 20,
    shadowOffset: {height: 10, width: 10},
    elevation: 2,
    backgroundColor: Colors.$white,
    marginHorizontal: 1,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.$iconLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  imageScroller: {
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  buttonswrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default NewAnnonceP2;
