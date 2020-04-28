import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

const FormInput = ({name, placeholder, type, icon, iconOff}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          textContentType={inputType}
        />
        <TouchableOpacity
          onPress={() => {
            if (isVisible) setInputType('none');
            else setInputType('password');
            setIsVisible(!isVisible);
          }}>
          <Feather
            name={isVisible ? iconOff : icon}
            size={20}
            color={Colors.$iconGray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    //paddingHorizontal: 15,
    color: Colors.$inputColor,
    paddingVertical: 7,
    width: '90%',
  },
  name: {
    fontSize: 15,
    color: Colors.$black,
    textTransform: 'capitalize',
    marginLeft: 5,
    marginBottom: 3,
  },
  globalContainer: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.$borderGray,
    borderRadius: 7,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default FormInput;
