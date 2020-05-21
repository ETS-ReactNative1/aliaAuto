import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {authApi} from '../../api';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../../routes/NavigationService';
import Colors from '../../constants/Colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('email Required'),
  pseudo: Yup.string()
    .min(3)
    .max(40)
    .required('psuedo obligatoire entre 3 et 40'),
  password: Yup.string().min(2).max(60).required('le mot de passe est requis'),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), 'confirmation must be the same as password'])
    .required('confirmation of password is required'),
});

const SignUpNrml = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        hasBackdrop
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalWrapper}>
          <Text style={styles.titleModal}>Confirmation</Text>

          <View style={{marginBottom: 10, marginTop: 5}}>
            <Text>
              votre demande a été bien enregistré, un lien vous a été envoyé
              pour réinitialiser votre mot de passe, penser à vérifier dans vos
              courrier indisérables (spam)
            </Text>
          </View>

          <View style={styles.buttonswrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.scene}>
      <ScrollView>
        <Formik
          initialValues={{
            email: '',
            pseudo: '',
            password: '',
            confirmation: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(false);
            authApi.verifyEmailExist(values.email).then((res) => {
              if (res && res.status === 200) {
                authApi.signUp(values).then((res) => {
                  if (res) {
                    console.log('success');
                    setModalVisible(true);
                    resetForm();
                    NavigationService.navigate('signIn');
                  }
                });
              }
            });
            setSubmitting(true);
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
                  value={values.pseudo}
                  name="pseudo"
                  placeholder="myPseudo"
                  type="none"
                  isWrong={touched.pseudo && errors.pseudo}
                  errorText={errors.email}
                  onChangeText={handleChange('pseudo')}
                />
                <FormInput
                  value={values.password}
                  name="mot de passe"
                  placeholder="*********"
                  type="password"
                  icon="eye"
                  secureTextEntry={true}
                  iconOff="eye-off"
                  isWrong={touched.password && errors.password}
                  errorText={errors.password}
                  onChangeText={handleChange('password')}
                />
                <FormInput
                  value={values.confirmation}
                  name="confirmation de mot de passe"
                  placeholder="*********"
                  type="password"
                  icon="eye"
                  secureTextEntry={true}
                  iconOff="eye-off"
                  isWrong={touched.confirmation && errors.confirmation}
                  errorText={errors.confirmation}
                  onChangeText={handleChange('confirmation')}
                />
              </View>
              <Button text={'enregistrer'} onPress={handleSubmit} />
            </>
          )}
        </Formik>
        {renderModal()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  formContainer: {
    marginTop: 10,
    marginHorizontal: 25,
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

export default SignUpNrml;
