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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Feather from 'react-native-vector-icons/Feather';
import SignUpNrml from '../components/auth/SignUpNrml';
import SignUpPro from '../components/auth/SignUpProWrapper';

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
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={2}>
        <View style={styles.container}>
          <View style={styles.headerBG}>
            <View style={styles.logoContainer}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.logoText}>Aut</Text>
                  <View style={styles.logoCercle} />
                  <Text style={[styles.logoText, {color: Colors.$baseOrange}]}>
                    alia
                  </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.logoShadow} />
                </View>
              </View>
            </View>
            {/* <View style={styles.titleContainer}>
              <Text style={styles.title}>Nouveau compte</Text>
            </View> */}
          </View>

          <View style={styles.globalContainer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <TabView
                navigationState={{
                  index: this.state.index,
                  routes: this.state.routes,
                }}
                renderTabBar={this.renderTabBar}
                renderScene={renderScene}
                onIndexChange={this.handleChange}
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //flex: 1,
    backgroundColor: Colors.$baseOrange,
  },
  headerBG: {
    backgroundColor: Colors.$bgGray,
    height: '50%',
  },
  imgBackground: {
    flex: 1,
    height: '100%',
  },
  logoCercle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.$baseOrange,
    marginTop: 10,
    marginHorizontal: 2,
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
    backgroundColor: '#d4d5d6',
    borderRadius: 100,
    transform: [{scaleX: 7}],
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17%',
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
    marginTop: 30,
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
    minHeight: '70%',
    height: '70%',
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 8,
    shadowOffset: {height: 3, width: 2},
    elevation: 2,
    overflow: 'hidden',
    paddingBottom: 20,
    marginBottom: 20,
    marginTop: '-50%',
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
