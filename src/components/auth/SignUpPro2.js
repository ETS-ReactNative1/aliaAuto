import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Colors from '../../constants/Colors';
import MAterialIcon from 'react-native-vector-icons/MaterialIcons';

const SignUpPro2 = () => {
  const [checked, setChecked] = useState('');
  return (
    <View style={styles.scene}>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', marginVertical: 15}}>
          <TouchableOpacity
            style={{width: '33%'}}
            onPress={() => setChecked('M')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MAterialIcon
                name={
                  checked === 'M'
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={22}
                color={checked === 'M' ? Colors.$baseOrange : Colors.$iconGray}
              />
              <Text style={styles.genderTitle}>M.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '33%'}}
            onPress={() => setChecked('Mme')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MAterialIcon
                name={
                  checked === 'Mme'
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={22}
                color={
                  checked === 'Mme' ? Colors.$baseOrange : Colors.$iconGray
                }
              />
              <Text style={styles.genderTitle}>Mme.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FormInput name="nom" placeholder="nom" type={'name'} small />
        <FormInput name="prénom" placeholder="prénom" type="givenName" small />
        <FormInput
          name="adresse"
          placeholder="adresse"
          type="streetAddressLine1"
          small
          material
          icon="my-location"
        />
        <View style={styles.twoGridContainer}>
          <View style={{width: '50%'}}>
            <FormInput
              name="ville"
              small
              placeholder="ville"
              type="addressCity"
              icon="map-pin"
            />
          </View>
          <View style={{width: '40%'}}>
            <FormInput
              name="tél"
              placeholder="055555555"
              type="telephoneNumber"
              small
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.buttonswrapper}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: Colors.$iconGray}]}>
            <Text style={styles.buttonText}>precedant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  formContainer: {
    marginTop: 10,
    marginHorizontal: 25,
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
  twoGridContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  genderTitle: {
    color: Colors.$black,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonswrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default SignUpPro2;
