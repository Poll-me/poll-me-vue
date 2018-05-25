import { fbAsync } from '@/setup/firebase';

import login from './login';
import profile from './profile';

export default {
  ...login,
  ...profile,

  async checkAuth() {
    const auth = (await fbAsync()).auth();
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        unsubscribe();
        if (user === null) {
          await auth.signInAnonymously();
        }
        resolve(!auth.currentUser.isAnonymous);
      }, reject);
    });
  },

  async initAuthListener({ commit, dispatch }) {
    const auth = (await fbAsync()).auth();
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        commit('setLoggedState', { isLogged: !user.isAnonymous, uid: user.uid });
        dispatch('fetchUserProfile');
      }
    });
    return true;
  }
};
