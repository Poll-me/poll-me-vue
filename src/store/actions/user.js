import firebase from 'firebase';
import fb from '@/setup/firebase';

const auth = fb.auth();
let authUnsubscribe;

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {
  registerEmail(context, { name, email, password }) {
    return new Promise((resolve, reject) => {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      auth.currentUser.linkAndRetrieveDataWithCredential(credential)
        .then((userCredential) => {
          userCredential.user.updateProfile({ displayName: name })
            .then(() => resolve(auth.currentUser))
            .catch(reject);
        })
        .catch(reject);
    });
  },

  signIn(context, { email, password }) {
    return new Promise((resolve, reject) => {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      const prevUser = auth.currentUser;
      auth.signInWithCredential(credential)
        .then((user) => {
          if (prevUser && prevUser.isAnonymous) {
            prevUser.delete();
          }
          resolve(user);
        })
        .catch(reject);
    });
  },

  signOut({ commit }) {
    if (!auth.currentUser.isAnonymous) {
      return auth.signOut().then(() => {
        commit('setLoggedState', { isLogged: false });
        commit('setUserProfile', { profile: {} });
      });
    }
    return Promise.resolve(true);
  },

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
            commit('setLoggedState', { isLogged: !user.isAnonymous });
            commit('setUserProfile', { profile: getProfileData(user) });
          }
          resolve(true);
        }, reject);
      } else {
        resolve(true);
      }
    });
  }
};
