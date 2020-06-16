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
  email: Yup.string()
    .email('Adresse mail invalide')
    .required('champ obligatoire'),
  pseudo: Yup.string()
    .min(3)
    .max(40)
    .required('psuedo obligatoire entre 3 et 40'),
  password: Yup.string()
    .max(60)
    .required('champ obligatoire')
    .test(
      'test password',
      'le mot de passe doit au mois avoir huit caractéres ou un est en majuscule et un chiffre',
      function (value) {
        if (value === undefined) return false;
        //console.log(value);
        let numbers = 0;
        let caracters = 0;
        let maj = 0;
        value.split('').map((val) => {
          if (isNaN(val)) {
            caracters++;
            if (val == val.toUpperCase()) maj++;
          } else numbers++;
        });
        return numbers > 0 && caracters >= 8 && maj > 0;
      },
    ),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'le mot de passe ne correspond pas')
    .required('champ obligatoire'),
});

const SignUpNrml = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
                NavigationService.navigate('signIn');
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
      <Formik
        initialValues={{
          email: '',
          pseudo: '',
          password: '',
          confirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          setIsSending(true);
          authApi.verifyEmailExist(values.email).then((res) => {
            if (res && res.status === 200) {
              authApi.signUp(values).then((res) => {
                if (res) {
                  console.log('success');
                  setModalVisible(true);
                  resetForm();
                  setIsSending(false);
                  setSubmitting(false);
                } else {
                  alert('erreur dans la creation du compte');
                  setIsSending(false);
                  setSubmitting(false);
                }
              });
            } else {
              alert('Ce mail exist deja');
              resetForm();
              setIsSending(false);
              setSubmitting(false);
            }
          });
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
                value={values.pseudo}
                name="Pseudo"
                placeholder="myPseudo"
                type="none"
                isWrong={touched.pseudo && errors.pseudo}
                errorText={errors.email}
                onChangeText={handleChange('pseudo')}
              />
              <FormInput
                value={values.password}
                name="Mot de passe"
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
                name="Confirmation de mot de passe"
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
            <Button
              text={'enregistrer'}
              isSending={isSending}
              onPress={handleSubmit}
              disabled={isSending}
            />
          </>
        )}
      </Formik>
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  formContainer: {
    marginTop: 30,
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
