import fb from '@/setup/firebase';

import login from './login';
import profile from './profile';

const auth = fb.auth();
let authUnsubscribe;

export default {
  ...login,
  ...profile,

  checkAuth() {
    return new Promise((resolve, reject) => {
      if (auth.currentUser === null) {
        auth.signInAnonymously().then(() => resolve(true)).catch(reject);
      } else {
        resolve(!auth.currentUser.isAnonymous);
      }
    });
  },

  initAuthListener({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      if (typeof authUnsubscribe !== 'function') {
        authUnsubscribe = auth.onAuthStateChanged((user) => {
          if (user !== null) {
            commit('setLoggedState', { isLogged: !user.isAnonymous });
            dispatch('fetchUserProfile').then(() => resolve(true));
          } else {
            resolve(true);
          }
        }, reject);
      } else {
        resolve(true);
      }
    });
  }
};
