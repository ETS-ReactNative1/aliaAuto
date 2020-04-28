import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';

const SignUpNrml = () => {
  return (
    <View style={styles.scene}>
      <View style={styles.formContainer}>
        <FormInput
          name="email"
          placeholder="testmail@gmail.com"
          type={'emailAddress'}
        />
        <FormInput name="pseudo" placeholder="myPseudo" type="none" />
        <FormInput
          name="mot de passe"
          placeholder="*********"
          type="password"
          icon="eye"
          iconOff="eye-off"
        />
        <FormInput
          name="confirmation de mot de passe"
          placeholder="*********"
          type="password"
          icon="eye"
          iconOff="eye-off"
        />
      </View>
      <Button text={'enregistrer'} />
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
});

export default SignUpNrml;
