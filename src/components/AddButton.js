import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NavigationService from '../routes/NavigationService';

const AddButton = () => {
  const ChangeScreen = (screen) => {
    NavigationService.navigate(screen);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        ChangeScreen('AddEvent');
      }}>
      <View style={styles.button}>
        <Feather style={styles.icon} name="plus" size={22} color="#ffffff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FBB710',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    //marginBottom: 20,
    shadowOpacity: 0.29,
    shadowRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {height: 3, width: 0},
    elevation: 12,
  },
  icon: {
    zIndex: 20,
  },
});

export default AddButton;
