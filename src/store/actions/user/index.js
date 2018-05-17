import fb from '@/setup/firebase';

import login from './login';

const auth = fb.auth();
let authUnsubscribe;

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {
  ...login,

  checkAuth() {
    return new Promise((resolve, reject) => {
      if (auth.currentUser === null) {
        auth.signInAnonymously().then(() => resolve(true)).catch(reject);
      } else {
        resolve(!auth.currentUser.isAnonymous);
      }
    });
  },

  initAuthListener({ commit }) {
    return new Promise((resolve, reject) => {
      if (typeof authUnsubscribe !== 'function') {
        authUnsubscribe = auth.onAuthStateChanged((user) => {
          if (user !== null) {
            commit('updateUserState', {
              isLogged: !user.isAnonymous,
              profile: getProfileData(user)
            });
          }
          resolve(true);
        }, reject);
      } else {
        resolve(true);
      }
    });
  }
};
