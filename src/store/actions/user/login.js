import firebase from 'firebase';
import fb from '@/setup/firebase';

const auth = fb.auth();

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

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

  registerEmail({ commit }, { name, email, password }) {
    return new Promise((resolve, reject) => {
      const prevUser = auth.currentUser;
      const registerFunction = prevUser !== null ?
        linkEmailToUser :
        createEmailUser;
      registerFunction(email, password)
        .then((user) => {
          user.updateProfile({ displayName: name })
            .then(() => {
              commit('updateUserState', {
                isLogged: true,
                profile: getProfileData(user)
              });
              resolve(user);
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
        commit('updateUserState', { isLogged: false });
      });
    }
    return Promise.resolve(true);
  }
};
