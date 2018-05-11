import fb from '@/setup/firebase';

const auth = fb.auth();

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {
  login({ commit }, { user }) {
    commit('setLoggedState', { isLogged: true });
    commit('setUserProfile', { profile: getProfileData(user) });
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
