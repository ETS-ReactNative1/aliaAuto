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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import SignUpNrml from '../components/auth/SignUpNrml';
import SignUpPro from '../components/auth/SignUpPro2';

const FirstRoute = () => <SignUpNrml />;

const SecondRoute = () => <SignUpPro />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default class SignUp extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'particulier'},
      {key: 'second', title: 'professionel'},
    ],
  };

  handleChange = (index) => {
    this.setState({index});
  };

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.$baseOrange}}
      style={{backgroundColor: Colors.$white}}
      renderLabel={this.renderLabel}
    />
  );

  renderLabel = ({route, focused, color}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Feather
          name={route.key === 'first' ? 'user' : 'users'}
          size={22}
          color={Colors.$black}
        />
        <Text
          style={{
            color: Colors.$black,
            fontSize: 15,
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}>
          {route.title}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/backgroundImg.png')}
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
              <Text style={styles.title}>Sign Up</Text>
            </View>
            <View style={styles.globalContainer}>
              <TabView
                navigationState={{
                  index: this.state.index,
                  routes: this.state.routes,
                }}
                renderTabBar={this.renderTabBar}
                renderScene={renderScene}
                onIndexChange={this.handleChange}
              />
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
  scene: {
    flex: 1,
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
    marginTop: '30%',
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
    marginTop: 40,
    marginBottom: 10,
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
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 8,
    shadowOffset: {height: 3, width: 2},
    elevation: 2,
    overflow: 'hidden',
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
