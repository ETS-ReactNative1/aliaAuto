import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const basicToken =
  'YXV0b2FsaWFDbGllbnRJZFBhc3N3b3JkOkgjZFZmQ2txNFB2UTM3S0pAOEJQ';

class AuthApi {
  signIn(userData) {
    const formData = new FormData();
    formData.append('username', userData.email);
    formData.append('password', userData.password);
    formData.append('grant_type', 'password');
    axios
      .post('oauthservice/oauth/token', formData, {
        headers: {
          Authorization: 'Basic ' + basicToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((resp) => resp.data)
      .then((resp) => {
        this.StoreToken(resp.access_token, resp.refresh_token);
        // save it to redux store
        //redirect to home page
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  async StoreToken(access_token, refresh_token) {
    await AsyncStorage.setItem('user_token', access_token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
  }

  async Logout() {
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('refresh_token');
  }
}

export default AuthApi;
