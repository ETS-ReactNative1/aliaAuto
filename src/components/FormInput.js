import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const FormInput = ({name, placeholder, type}) => {
  return (
    <View style={styles.globalContainer}>
      <Text style={styles.name}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        textContentType={type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: Colors.$borderGray,
    borderRadius: 7,
    paddingHorizontal: 15,
    color: Colors.$inputColor,
  },
  name: {
    fontSize: 15,
    color: Colors.$black,
    textTransform: 'capitalize',
    marginLeft: 5,
    marginBottom: 3,
  },
  globalContainer: {
    marginBottom: 20,
  },
});

export default FormInput;
