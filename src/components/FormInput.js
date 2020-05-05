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
import MAterialIcon from 'react-native-vector-icons/MaterialIcons';

const FormInput = ({
  name,
  placeholder,
  type,
  icon,
  iconOff,
  small,
  material,
  isWrong,
  errorText,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  return (
    <View style={[styles.globalContainer, small ? {marginBottom: 8} : null]}>
      <Text style={styles.name}>{name}</Text>
      <View
        style={[
          styles.inputContainer,
          isWrong ? {borderColor: Colors.$errorRed} : null,
        ]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          textContentType={inputType}
          {...rest}
        />
        <TouchableOpacity
          onPress={() => {
            if (icon === 'eye') {
              if (isVisible) setInputType('none');
              else setInputType('password');
              setIsVisible(!isVisible);
            }
            console.log('clicked icon');
          }}>
          {material ? (
            <MAterialIcon
              name={isVisible ? iconOff : icon}
              size={20}
              color={Colors.$iconGray}
            />
          ) : (
            <Feather
              name={isVisible ? iconOff : icon}
              size={20}
              color={Colors.$iconGray}
            />
          )}
        </TouchableOpacity>
      </View>
      {isWrong ? <Text style={styles.textError}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    //paddingHorizontal: 15,
    color: Colors.$inputColor,
    paddingVertical: 5,
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
  textError: {
    color: Colors.$errorRed,
    marginLeft: 10,
  },
});

export default FormInput;
