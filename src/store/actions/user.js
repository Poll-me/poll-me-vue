import firebase from 'firebase';
import fb from '@/setup/firebase';

const auth = fb.auth();

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {
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

  checkAuth({ commit }) {
    return new Promise((resolve, reject) => {
      if (auth.currentUser === null) {
        auth.onAuthStateChanged((user) => {
          if (user === null) {
            auth.signInAnonymously().catch(reject);
          } else {
            commit('setLoggedState', { isLogged: !user.isAnonymous });
            commit('setUserProfile', { profile: getProfileData(user) });
            resolve(!user.isAnonymous);
          }
        }, reject);
      } else {
        resolve(!auth.currentUser.isAnonymous);
      }
    });
  }
};
