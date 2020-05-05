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

const {height, width} = Dimensions.get('window');

class NewAnnonceP1 extends Component {
  state = {
    isNew: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{flexDirection: 'row', marginVertical: 10, marginLeft: 10}}>
            <TouchableOpacity
              style={{width: '40%'}}
              onPress={() => this.setState({isNew: false})}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MAterialIcon
                  name={
                    !this.state.isNew
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={22}
                  color={
                    !this.state.isNew ? Colors.$baseOrange : Colors.$iconGray
                  }
                />
                <Text style={styles.genderTitle}>Occasion</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '40%'}}
              onPress={() => this.setState({isNew: true})}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MAterialIcon
                  name={
                    this.state.isNew
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={22}
                  color={
                    this.state.isNew ? Colors.$baseOrange : Colors.$iconGray
                  }
                />
                <Text style={styles.genderTitle}>Neuve</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FormInput name="titre" placeholder="test" type={'none'} small />
          <FormInput
            name="version / finition"
            placeholder="test"
            type={'none'}
            small
            material
            icon="style"
          />
          <View style={styles.twoGridContainer}>
            <View style={{width: '48%'}}>
              <FormInput
                name="marque"
                small
                placeholder="test"
                type="none"
                icon="chevron-down"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="modèle"
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
                name="année"
                small
                placeholder="test"
                type="none"
                icon="chevron-down"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="carburant"
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
                name="prix"
                small
                placeholder="test"
                type="none"
                icon="dollar-sign"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="km"
                placeholder="test"
                type="none"
                small
                material
                icon="timeline"
              />
            </View>
          </View>
          <View style={styles.twoGridContainer}>
            <View style={{width: '48%'}}>
              <FormInput
                name="boite de vitesse"
                small
                placeholder="test"
                type="none"
                icon="chevron-down"
              />
            </View>
            <View style={{width: '48%'}}>
              <FormInput
                name="type"
                placeholder="test"
                type="none"
                small
                icon="chevron-down"
              />
            </View>
          </View>
          <FormInput
            name="détail"
            placeholder="test"
            type="none"
            small
            textarea
          />
          <View style={{alignItems: 'flex-end', marginTop: 8}}>
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
});

export default NewAnnonceP1;
