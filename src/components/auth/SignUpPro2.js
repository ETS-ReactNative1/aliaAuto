import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Colors from '../../constants/Colors';
import MAterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {authApi} from '../../api';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import NavigationService from '../../routes/NavigationService';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  nom: Yup.string()
    .min(3)
    .max(30)
    .required('ce champ est obligatoire (entre 3 et 30)'),
  prenom: Yup.string()
    .min(3)
    .max(30)
    .required('ce champ est obligatoire (entre 3 et 30)'),
  adresse: Yup.string()
    .min(3)
    .max(100)
    .required('ce champ est obligatoire (entre 3 et 100)'),
  tel: Yup.string().matches(phoneRegExp, 'ce champs nest pas juste'),
});

const SignUpPro2 = (props) => {
  const [checked, setChecked] = useState(props.state.page2.checked);
  const [villes, setVilles] = useState([]);
  const [ville, setVille] = useState(
    props.state.page2.selectedVille.display_name !== undefined
      ? props.state.page2.selectedVille.display_name
      : '',
  );
  const [selectedVille, setSelectedVille] = useState(
    props.state.page2.selectedVille,
  );
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const data = villes.map((ville) => {
    return (
      <TouchableOpacity
        key={ville.id}
        style={styles.villeItem}
        onPress={() => {
          setSelectedVille(ville);
          setVisible(false);
          setVille(ville.display_name);
        }}>
        <Text>{ville.display_name}</Text>
      </TouchableOpacity>
    );
  });

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

          <View style={styles.buttonswrapperModal}>
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => {
                setModalVisible(false);
                NavigationService.navigate('signIn');
              }}>
              <Text style={styles.buttonTextModal}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const changeVille = (ville) => {
    console.log(ville);
    setVille(ville);
    if (ville !== '') {
      authApi.getVille(ville).then((res) => {
        if (res) {
          setVilles(res);
          setVisible(true);
          if (res.length === 0) setVisible(false);
        }
      });
    } else setVisible(false);
  };

  return (
    <View style={styles.scene}>
      <Formik
        initialValues={{
          nom: props.state.page2.nom || '',
          prenom: props.state.page2.prenom || '',
          adresse: props.state.page2.adresse || '',
          //ville:props.state.page2.nom || '',
          tel: props.state.page2.tel || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          if (checked !== '') {
            if (selectedVille) {
              let page1state = props.state.page1;
              let page2state = {
                ...values,
                checked,
                selectedVille,
              };
              authApi.verifyEmailExist(page1state.email).then((res) => {
                if (res && res.status === 200) {
                  authApi.signUpPro(page1state, page2state).then((res) => {
                    if (res) {
                      setModalVisible(true);
                    }
                  });
                } else alert('mail already exist');
              });
            } else {
              alert('choissiez une ville du dropdown');
            }
          } else {
            alert('choose your gender');
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
          <View style={styles.formContainer}>
            <View style={{flexDirection: 'row', marginVertical: 15}}>
              <TouchableOpacity
                style={{width: '33%'}}
                onPress={() => setChecked('M')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MAterialIcon
                    name={
                      checked === 'M'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={22}
                    color={
                      checked === 'M' ? Colors.$baseOrange : Colors.$iconGray
                    }
                  />
                  <Text style={styles.genderTitle}>M.</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '33%'}}
                onPress={() => setChecked('Mme')}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MAterialIcon
                    name={
                      checked === 'Mme'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={22}
                    color={
                      checked === 'Mme' ? Colors.$baseOrange : Colors.$iconGray
                    }
                  />
                  <Text style={styles.genderTitle}>Mme.</Text>
                </View>
              </TouchableOpacity>
            </View>
            <FormInput
              value={values.nom}
              name="nom"
              placeholder="nom"
              type={'name'}
              small
              isWrong={touched.nom && errors.nom}
              errorText={errors.nom}
              onChangeText={handleChange('nom')}
            />
            <FormInput
              value={values.prenom}
              name="prénom"
              placeholder="prénom"
              type="givenName"
              small
              isWrong={touched.prenom && errors.prenom}
              errorText={errors.prenom}
              onChangeText={handleChange('prenom')}
            />
            <FormInput
              value={values.adresse}
              name="adresse"
              placeholder="adresse"
              type="streetAddressLine1"
              small
              material
              icon="my-location"
              isWrong={touched.adresse && errors.adresse}
              errorText={errors.adresse}
              onChangeText={handleChange('adresse')}
            />
            <View style={styles.twoGridContainer}>
              <View style={{width: '50%', position: 'relative'}}>
                <FormInput
                  value={ville}
                  name="ville"
                  small
                  placeholder="ville"
                  type="addressCity"
                  icon="map-pin"
                  onChangeText={changeVille}
                />
                {visible && (
                  <View style={styles.villesWrapper}>
                    <ScrollView>{data}</ScrollView>
                  </View>
                )}
              </View>
              <View style={{width: '40%'}}>
                <FormInput
                  value={values.tel}
                  name="tél"
                  placeholder="0555555"
                  type="telephoneNumber"
                  small
                  keyboardType="phone-pad"
                  isWrong={touched.tel && errors.tel}
                  errorText={errors.tel}
                  onChangeText={handleChange('tel')}
                />
              </View>
            </View>

            <View style={styles.buttonswrapper}>
              <TouchableOpacity
                onPress={() => {
                  let state = {
                    ...values,
                    checked,
                    selectedVille,
                  };
                  props.saveState(state, 2);
                }}
                style={[styles.button, {backgroundColor: Colors.$iconGray}]}>
                <Text style={styles.buttonText}>precedant</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginTop: 10,
    marginHorizontal: 25,
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
  twoGridContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  genderTitle: {
    color: Colors.$black,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonswrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  villesWrapper: {
    position: 'absolute',
    width: '150%',
    height: 110,
    top: -100,
    borderRadius: 7,
    shadowOpacity: 0.8,
    shadowColor: Colors.$black,
    shadowRadius: 8,
    shadowOffset: {height: 3, width: 2},
    elevation: 2,
    zIndex: 99,
    backgroundColor: Colors.$white,
    padding: 5,
  },
  villeItem: {
    width: '100%',
    paddingVertical: 7,
    paddingLeft: 10,
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
  buttonModal: {
    backgroundColor: Colors.$baseOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: '40%',
  },
  buttonTextModal: {
    color: Colors.$white,
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  buttonswrapperModal: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default SignUpPro2;
