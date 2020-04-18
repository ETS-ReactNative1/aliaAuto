import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';

const {width, height} = Dimensions.get('window');

const Header = ({search, title, iconLeft, iconRight}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {iconLeft && (
          <TouchableOpacity>
            <Feather
              style={styles.rightIcon}
              name="bar-chart"
              size={35}
              color={Colors.$white}
            />
          </TouchableOpacity>
        )}
      </View>

      {search ? (
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchIcon}>
            <Feather
              //style={styles.searchIcon}
              name="search"
              size={22}
              color={Colors.$iconGray}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="personalisser recherche"
          />
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        {iconRight && (
          <TouchableOpacity>
            <Feather
              style={styles.rightIcon}
              name="sliders"
              size={30}
              color={Colors.$white}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width,
    height: 80,
    backgroundColor: '#FBB710',
    padding: 5,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 18,
    color: Colors.$white,
    fontWeight: 'bold',
  },
  rightIcon: {
    transform: [{rotate: '90deg'}],
  },
  leftIcon: {
    transform: [{rotate: '-90deg'}],
  },
  rightContainer: {
    width: '15%',
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    width: '15%',
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '70%',
    alignItems: 'center',
  },
  searchContainer: {
    width: '70%',
    alignItems: 'center',
    backgroundColor: Colors.$white,
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  searchIcon: {
    width: '15%',
    paddingLeft: 5,
  },
  textInput: {
    //backgroundColor: 'red',
    padding: 0,
    marginLeft: 5,
    paddingVertical: 5,
    width: '85%',
  },
});

export default Header;
