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
import {CheckBox} from 'react-native-elements';

const {height, width} = Dimensions.get('window');

class NewAnnonceP3 extends Component {
  state = {
    isNew: true,
    emailVisible: false,
    phone1Visible: false,
    phone2Visible: false,
    adresseVisible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginTop: 20}} />
          <FormInput
            name="contact"
            placeholder="test"
            type={'none'}
            small
            material
            icon="account-box"
          />
          <View style={styles.twoGridContainer}>
            <View style={{width: '60%'}}>
              <FormInput name="email" small placeholder="test" type="none" />
            </View>
            <View style={{width: '36%'}}>
              <CheckBox
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checked={this.state.emailVisible}
                onPress={() =>
                  this.setState({emailVisible: !this.state.emailVisible})
                }
                center
                size={20}
                title="afficher cet email"
                checkedIcon={'check-square'}
                checkedColor={Colors.$baseOrange}
              />
            </View>
          </View>
          <View style={styles.twoGridContainer}>
            <View style={{width: '60%'}}>
              <FormInput name="te1 1" small placeholder="test" type="none" />
            </View>
            <View style={{width: '36%'}}>
              <CheckBox
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checked={this.state.phone1Visible}
                onPress={() =>
                  this.setState({phone1Visible: !this.state.phone1Visible})
                }
                center
                size={20}
                title="afficher ce numero"
                checkedIcon={'check-square'}
                checkedColor={Colors.$baseOrange}
              />
            </View>
          </View>
          <View style={styles.twoGridContainer}>
            <View style={{width: '60%'}}>
              <FormInput name="tel 2" small placeholder="test" type="none" />
            </View>
            <View style={{width: '36%'}}>
              <CheckBox
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checked={this.state.phone2Visible}
                onPress={() =>
                  this.setState({phone2Visible: !this.state.phone2Visible})
                }
                center
                size={20}
                title="afficher ce numero"
                checkedIcon={'check-square'}
                checkedColor={Colors.$baseOrange}
              />
            </View>
          </View>
          <FormInput
            name="adresse"
            placeholder="test"
            type={'none'}
            small
            material
            icon="my-location"
          />
          <FormInput
            name="ville"
            placeholder="test"
            type="addressCity"
            small
            icon="map-pin"
          />
          <CheckBox
            containerStyle={styles.checkboxAdresse}
            textStyle={styles.checkboxText}
            checked={this.state.adresseVisible}
            onPress={() =>
              this.setState({adresseVisible: !this.state.adresseVisible})
            }
            size={20}
            title="afficher cette adresse"
            checkedIcon={'check-square'}
            checkedColor={Colors.$baseOrange}
          />
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
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: '100%',
    margin: 0,
    marginTop: 16,
  },
  checkboxText: {
    fontFamily: 'roboto',
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: 12,
  },
  checkboxAdresse: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: '100%',
    margin: 0,
    paddingLeft: 0,
  },
  buttonswrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default NewAnnonceP3;
