import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Colors from '../../constants/Colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('email Required'),
  password: Yup.string().min(2).max(60).required('le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), 'confirmation must be the same as password'])
    .required('confirmation of password is required'),
  siret: Yup.string()
    .min(2)
    .max(60)
    .required('ce champ est obligatoire entre 2 et 60'),
  entreprise: Yup.string()
    .min(2)
    .max(60)
    .required('ce champ est obligatoire entre 2 et 60'),
});

const SignUpPro1 = ({state, saveState}) => {
  return (
    <View style={styles.scene}>
      <Formik
        initialValues={{
          email: state.email || '',
          password: state.password || '',
          confirmPassword: state.confirmPassword || '',
          siret: state.siret || '',
          entreprise: state.entreprise || '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          saveState(values, 1);
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
            <FormInput
              value={values.email}
              name="email"
              placeholder="testmail@gmail.com"
              type={'emailAddress'}
              small
              onChangeText={handleChange('email')}
              isWrong={touched.email && errors.email}
              errorText={errors.email}
            />
            <FormInput
              value={values.password}
              name="mot de passe"
              placeholder="*********"
              type="password"
              icon="eye"
              iconOff="eye-off"
              small
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              isWrong={touched.password && errors.password}
              errorText={errors.password}
            />
            <FormInput
              value={values.confirmPassword}
              name="confirmation de mot de passe"
              placeholder="*********"
              type="password"
              icon="eye"
              iconOff="eye-off"
              small
              secureTextEntry={true}
              onChangeText={handleChange('confirmPassword')}
              isWrong={touched.confirmPassword && errors.confirmPassword}
              errorText={errors.confirmPassword}
            />
            <FormInput
              value={values.siret}
              name="SIRET"
              small
              placeholder="votre Siret ici"
              type="none"
              onChangeText={handleChange('siret')}
              isWrong={touched.siret && errors.siret}
              errorText={errors.siret}
            />
            <FormInput
              value={values.entreprise}
              name="nom de l'entreprise"
              placeholder="entreprise"
              type="none"
              small
              isWrong={touched.entreprise && errors.entreprise}
              errorText={errors.entreprise}
              onChangeText={handleChange('entreprise')}
            />
            <View style={{alignItems: 'flex-end', marginTop: 3}}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>suivant</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
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
});

export default SignUpPro1;
