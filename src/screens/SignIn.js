import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {authApi} from '../api';
import {connect} from 'react-redux';
import {saveToken} from '../store/actions';
import NavigationService from '../routes/NavigationService';
import Modal from 'react-native-modal';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('Mail obligatoire'),
  password: Yup.string()
    .max(60, 'mot de passe ne doit pas depacer 60 caracteres')
    .required('champ obligatoire'),
});

const validationModalSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('Mail obligatoire'),
});

class SignIn extends Component {
  state = {
    modalVisible: false,
    modalMessageSent: false,
    isSending: false,
    isSendingModal: false,
  };
  changeScreen = (screen) => {
    NavigationService.navigate(screen);
  };

  saveTokenSInStore = (tokens) => {
    this.props.saveTokens(tokens);
  };

  renderModal = () => {
    return (
      <Modal
        isVisible={this.state.modalVisible}
        hasBackdrop
        onBackButtonPress={() => {
          this.setState({modalVisible: false});
        }}
        onBackdropPress={() => {
          this.setState({modalVisible: false});
        }}>
        <View style={styles.modalWrapper}>
          {this.state.modalMessageSent ? (
            <Text style={styles.titleModal}>Confirmation</Text>
          ) : (
            <Text style={styles.titleModal}>
              Réinitialiser le mot de passe de votre compte
            </Text>
          )}

          <Formik
            initialValues={{email: ''}}
            validationSchema={validationModalSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
              if (!this.state.modalMessageSent) {
                setSubmitting(true);
                this.setState({isSendingModal: true});
                authApi.resetPassword(values.email).then((res) => {
                  if (res) {
                    this.setState({
                      modalMessageSent: true,
                      isSendingModal: false,
                    });
                    setSubmitting(false);
                    resetForm();
                  } else {
                    alert('erreur dans la reinistialisation du mot de passe');
                    setSubmitting(false);
                  }
                });
              } else {
                this.setState({modalMessageSent: true, modalVisible: false});
                setSubmitting(false);
                resetForm();
              }
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
                <View style={{marginBottom: 10, marginTop: 5}}>
                  {this.state.modalMessageSent ? (
                    <Text>
                      votre demande a été bien enregistré, un lien vous a été
                      envoyé pour réinitialiser votre mot de passe, penser à
                      vérifier dans vos courrier indisérables (spam)
                    </Text>
                  ) : (
                    <>
                      <FormInput
                        value={values.email}
                        name="Email"
                        placeholder="Email"
                        type={'emailAddress'}
                        isWrong={touched.email && errors.email}
                        errorText={errors.email}
                        onChangeText={handleChange('email')}
                      />
                      <Text>
                        si vous n'avez pas recu de mail , veuiller vérifier dans
                        votre courrier indésirable (spam)
                      </Text>
                    </>
                  )}
                </View>

                <View style={styles.buttonswrapper}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      this.state.isSendingModal
                        ? {backgroundColor: Colors.$iconLightGray}
                        : null,
                    ]}
                    onPress={() => {
                      if (this.state.modalMessageSent) {
                        this.setState({
                          modalMessageSent: true,
                          modalVisible: false,
                        });
                      } else {
                        handleSubmit();
                      }
                    }}>
                    {this.state.isSendingModal ? (
                      <ActivityIndicator
                        style={{paddingVertical: 6, paddingHorizontal: 10}}
                        size="small"
                        color={Colors.$white}
                      />
                    ) : (
                      <Text style={styles.buttonText}>
                        {this.state.modalMessageSent ? 'OK' : 'Envoyer'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    );
  };

  render() {
    // if (this.props.isFocused && this.props.token !== null) {
    //   this.changeScreen('home');
    // }
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1}}>
          <View style={styles.headerBG}>
            <View style={styles.logoContainer}>
              <View>
                {/* <Text style={styles.logoText}>Alia</Text>
                <Text style={styles.logoSub}>auto</Text> */}
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
              <Text style={styles.title}>Connecter</Text>
            </View> */}
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
                this.setState({isSending: true});
                setSubmitting(false);
                authApi.signIn(values, this.saveTokenSInStore).then((res) => {
                  if (res) {
                    console.log(this.props);
                    //this.props.saveTokens(res);

                    this.setState({isSending: false});
                    setSubmitting(true);
                    resetForm();

                    this.changeScreen('home');
                  } else {
                    alert('mot de passe ou login erreur');
                    this.setState({isSending: false});
                    setSubmitting(true);
                  }
                });
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
                      name="Email"
                      placeholder="Email"
                      type={'emailAddress'}
                      isWrong={touched.email && errors.email}
                      errorText={errors.email}
                      onChangeText={handleChange('email')}
                    />

                    <FormInput
                      value={values.password}
                      name="Mot de passe"
                      placeholder="*********"
                      type="password"
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      isWrong={touched.password && errors.password}
                      errorText={errors.password}
                    />
                    <View style={styles.forgetContainer}>
                      <TouchableOpacity
                        onPress={() => this.changeScreen('signUp')}>
                        <Text style={styles.creeText}>Nouveau compte</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text
                          style={styles.forgetMdp}
                          onPress={() => {
                            this.setState({
                              modalVisible: true,
                            });
                          }}>
                          Mot de passe oublié ?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{marginTop: 35, marginBottom: 20}}>
                    <Button
                      text="se connecter"
                      isSending={this.state.isSending}
                      onPress={handleSubmit}
                      disabled={this.state.isSending}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>

          {this.renderModal()}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatshToProps = (dispatch) => {
  return {
    saveTokens: (tokens) => dispatch(saveToken(tokens)),
  };
};

const mapStateToProps = ({authReducer}) => {
  //console.log(authReducer);
  return {
    token: authReducer.token,
  };
};

export default connect(mapStateToProps, mapDispatshToProps)(SignIn);

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: '100%',
    backgroundColor: Colors.$baseOrange, //Colors.$bgGray,
  },
  logoCercle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.$baseOrange,
    marginTop: 10,
    marginHorizontal: 2,
  },
  headerBG: {
    backgroundColor: Colors.$bgGray,
    height: '50%',
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
    //height: '70%',
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 8,
    shadowOffset: {height: 3, width: 2},
    elevation: 2,
    marginTop: '-50%',
    paddingTop: 20,
    //paddingVertical: 20,
    //justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  avatarContaier: {
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: -25,
    marginTop: 40,
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
  modalWrapper: {
    backgroundColor: Colors.$white,
    padding: 20,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleModal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.$black,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.$baseOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: '40%',
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  buttonswrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});
