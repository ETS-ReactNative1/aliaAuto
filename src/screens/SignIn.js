import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/comptes.png')}
            style={styles.imgBackground}
            resizeMode="stretch"
            imageStyle={styles.imgStyle}>
            <View style={styles.logoContainer}>
              <View>
                <Text style={styles.logoText}>Alia</Text>
                <Text style={styles.logoSub}>auto</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.logoShadow} />
                </View>
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>SignIn</Text>
            </View>
            <View style={styles.globalContainer}>
              <View style={styles.avatarContaier}>
                <View style={styles.avatarBorder}>
                  <Image
                    source={require('../../assets/man.png')}
                    style={styles.avatar}
                  />
                </View>
              </View>
              <View style={styles.formContainer}>
                <FormInput
                  name="email"
                  placeholder="testmail@gmail.com"
                  type={'emailAddress'}
                />
                <FormInput
                  name="mot de passe"
                  placeholder="*********"
                  type="password"
                />
                <View style={styles.forgetContainer}>
                  <TouchableOpacity>
                    <Text style={styles.creeText}>Cree un compte</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.forgetMdp}>mot de passe oublié ?</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Button text="se connecter" />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: '100%',
    backgroundColor: Colors.$bgGray,
  },
  imgBackground: {
    flex: 1,
    height: '100%',
  },
  imgStyle: {
    height: '50%',
    width,
    resizeMode: 'cover',
  },
  logoShadow: {
    marginTop: 20,
    width: 20,
    height: 5,
    backgroundColor: '#D7AB05',
    borderRadius: 100,
    transform: [{scaleX: 7}],
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '35%',
  },
  logoText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.$black,
  },
  logoSub: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.$black,
    marginTop: -20,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.$black,
  },
  globalContainer: {
    marginHorizontal: 15,
    backgroundColor: Colors.$white,
    borderRadius: 36,
    height: '60%',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  avatarContaier: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  avatarBorder: {
    backgroundColor: Colors.$bgGray,
    width: 105,
    height: 105,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  creeText: {
    color: Colors.$baseOrange,
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgetMdp: {
    color: Colors.$inputColor,
    fontSize: 14,
  },
  forgetContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
});
