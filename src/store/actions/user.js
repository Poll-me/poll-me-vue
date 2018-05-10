import fb from '@/setup/firebase';

const auth = fb.auth();

export default {
  checkAuth({ commit }) {
    return new Promise((resolve, reject) => {
      if (auth.currentUser === null) {
        auth.onAuthStateChanged((user) => {
          if (user === null) {
            auth.signInAnonymously().catch(error => reject(error));
          } else {
            commit('setLoggedState', { isLogged: !user.isAnonymous });

            const { displayName, uid, phoneNumber, photoURL, email } = user;
            commit('setUserProfile', {
              profile: { displayName, uid, phoneNumber, photoURL, email }
            });

            resolve(true);
          }
        });
      } else {
        resolve(true);
      }
    });
  }
};
