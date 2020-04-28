import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Colors from '../../constants/Colors';

const SignUpPro1 = () => {
  return (
    <View style={styles.scene}>
      <View style={styles.formContainer}>
        <FormInput
          name="email"
          placeholder="testmail@gmail.com"
          type={'emailAddress'}
          small
        />
        <FormInput
          name="mot de passe"
          placeholder="*********"
          type="password"
          icon="eye"
          iconOff="eye-off"
          small
        />
        <FormInput
          name="confirmation de mot de passe"
          placeholder="*********"
          type="password"
          icon="eye"
          iconOff="eye-off"
          small
        />
        <FormInput
          name="SIRET"
          small
          placeholder="votre Siret ici"
          type="none"
        />
        <FormInput
          name="nom de l'entreprise"
          placeholder="entreprise"
          type="none"
          small
        />
        <View style={{alignItems: 'flex-end', marginTop: 3}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>suivant</Text>
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
});

export default SignUpPro1;
