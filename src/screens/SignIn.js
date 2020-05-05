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
import {Formik} from 'formik';
import * as Yup from 'yup';
import {authApi} from '../api';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('email Required'),
  password: Yup.string().min(2).max(60).required('le mot de passe est requis'),
});

export default class SignIn extends Component {
  testfunc = () => {
    console.log('test');
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
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                  authApi.signIn(values);
                  console.log('submitting');
                  console.log(values);
                }}>
                {({
                  values,
                  handleSubmit,
                  isSubmiting,
                  handleErrors,
                  touched,
                  errors,
                  handleChange,
                }) => (
                  <>
                    <View style={styles.formContainer}>
                      <FormInput
                        value={values.email}
                        name="email"
                        placeholder="testmail@gmail.com"
                        type={'emailAddress'}
                        isWrong={touched.email && errors.email}
                        errorText={errors.email}
                        onChangeText={handleChange('email')}
                      />
                      <FormInput
                        value={values.password}
                        name="mot de passe"
                        placeholder="*********"
                        type="password"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        isWrong={touched.password && errors.password}
                        errorText={errors.password}
                      />
                      <View style={styles.forgetContainer}>
                        <TouchableOpacity onPress>
                          <Text style={styles.creeText}>Cree un compte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Text style={styles.forgetMdp}>
                            mot de passe oublié ?
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{marginTop: 35}}>
                      <Button text="se connecter" onPress={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
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
