import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import appConfig from '../config/appConfig.json';

const basicToken =
  'YXV0b2FsaWFDbGllbnRJZFBhc3N3b3JkOkgjZFZmQ2txNFB2UTM3S0pAOEJQ';

class AuthApi {
  signIn(userData, saveTokenToStore) {
    const formData = new FormData();
    formData.append('username', userData.email);
    formData.append('password', userData.password);
    formData.append('grant_type', 'password');
    return axios
      .post('oauthservice/oauth/token', formData, {
        headers: {
          Authorization: 'Basic ' + basicToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((resp) => resp.data)
      .then((resp) => {
        this.StoreToken(resp.access_token, resp.refresh_token);
        saveTokenToStore(resp);
        return resp;
        //redirect to home page
      })
      .catch((err) => {
        console.log(err.response);
        return false;
      });
  }

  resetPassword(email) {
    return axios
      .post('oauthservice/user/reset-password', {username: email})
      .then((resp) => resp.data)
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  verifyEmailExist(email) {
    let emailparts = email.split('@');
    let emailsecond = emailparts[1].split('.');
    return axios
      .post(
        'backservice/user/exist/' +
          emailparts[0] +
          '%40' +
          emailsecond[0] +
          '/' +
          emailsecond[1],
        {
          page: 0,
          size: 25,
          sort: 'DATEDESC',
          searchDetails: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  signUp(user) {
    let userToSend = {
      id: null,
      isPro: false,
      username: user.email,
      pseudo: user.pseudo,
      password: user.password,
      confirmPassword: user.confirmation,
      siret: '',
      company: null,
      address: null,
      firstname: null,
      lastname: null,
      gender: 'H',
      phone: null,
      ville: null,
      location: null,
      logo: null,
    };

    return axios
      .post('backservice/user/save?cGGToken=empty', userToSend, {
        headers: {
          'Content-Type': 'application/json',
          Origin: appConfig.globalUri,
          Referer: appConfig.globalUri + 'nouveau-utilisateur',
          Accept: 'application/json, text/plain, */*',
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  getVille(ville) {
    return axios
      .get('backservice/location/' + ville, {
        headers: {
          'Content-Type': 'application/json',
          Referer: appConfig.globalUri + 'nouveau-utilisateur',
          Accept: 'application/json, text/plain, */*',
        },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  signUpPro(userstate1, userstate2) {
    let user = {
      id: null,
      isPro: true,
      username: userstate1.email,
      pseudo: null,
      password: userstate1.password,
      confirmPassword: userstate1.confirmPassword,
      siret: userstate1.siret,
      company: userstate1.entreprise,
      address: userstate2.adresse,
      firstname: userstate2.nom,
      lastname: userstate2.prenom,
      gender: userstate2.checked === 'M' ? 'H' : 'F',
      phone: userstate2.tel,
      ville: null,
      location: userstate2.selectedVille,
      logo: {},
    };
    console.log(user);
    return axios
      .post('backservice/user/save?cGGToken=empty', user, {
        headers: {
          'Content-Type': 'application/json',
          Referer: appConfig.globalUri + 'nouveau-utilisateur',
          Accept: 'application/json, text/plain, */*',
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async StoreToken(access_token, refresh_token) {
    await AsyncStorage.setItem('user_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
  }

  getTokens() {
    return new Promise(async (res, rej) => {
      let tokens = {};
      tokens.token = await AsyncStorage.getItem('user_token');
      tokens.refreshToken = await AsyncStorage.getItem('refresh_token');
      console.log(tokens);
      res(tokens);
    });
  }

  async Logout() {
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('refresh_token');
  }
}

export default AuthApi;
