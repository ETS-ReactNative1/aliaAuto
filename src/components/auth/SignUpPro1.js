import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../FormInput';
import Button from '../Button';
import Colors from '../../constants/Colors';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('email invalide').required('email Required'),
  password: Yup.string()
    .max(60, 'mot de passe ne doit pas depasser 60')
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'le mot de passe ne correspond pas')
    .required('champ obligatoire'),
  siret: Yup.string()
    .required('ce champ est obligatoire entre 2 et 60')
    .test('test siret', "le numero siret n'est pas valide", function (value) {
      if (value === undefined) return false;
      if (value.length !== 14 || isNaN(value)) return false;
      console.log(value);
      let somme = 0;
      let tmp;
      value.split('').map((char, index) => {
        if (index % 2 === 0) {
          console.log(char * 2);

          tmp = char * 2;
          if (tmp > 9) tmp -= 9;
        } else {
          tmp = char;
        }
        somme += parseInt(tmp);
      });
      console.log(somme);

      if (somme % 10 === 0) return true;
      return false;
    }),
  entreprise: Yup.string()
    .min(2, "nom de l'entreprise doit etre plus que 2")
    .max(60, "nom de l'entreprise doit etre moins que 60")
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
              name="Email"
              placeholder="Email"
              type={'emailAddress'}
              small
              onChangeText={handleChange('email')}
              isWrong={touched.email && errors.email}
              errorText={errors.email}
            />
            <FormInput
              value={values.password}
              name="Mot de passe"
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
              name="Confirmation de mot de passe"
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
              name="Nom de l'entreprise"
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
    marginTop: 30,
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
