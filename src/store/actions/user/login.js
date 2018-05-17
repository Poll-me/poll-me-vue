import firebase from 'firebase';
import fb from '@/setup/firebase';

const auth = fb.auth();

function createEmailUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function linkEmailToUser(email, password) {
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return new Promise((resolve, reject) => {
    auth.currentUser.linkAndRetrieveDataWithCredential(credential)
      .then(userCredential => resolve(userCredential.user))
      .catch(reject);
  });
}

export default {

  registerEmail({ commit, dispatch }, { name, email, password }) {
    return new Promise((resolve, reject) => {
      const prevUser = auth.currentUser;
      const registerFunction = prevUser !== null ?
        linkEmailToUser :
        createEmailUser;
      registerFunction(email, password)
        .then((user) => {
          user.updateProfile({ displayName: name })
            .then(() => {
              commit('setLoggedState', { isLogged: true, uid: user.uid });
              dispatch('createUserProfile').then(() => resolve(user));
            })
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
        commit('setUserState', { isLogged: false });
      });
    }
    return Promise.resolve(true);
  }
};
