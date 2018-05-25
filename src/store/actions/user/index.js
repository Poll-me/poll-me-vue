import { fbAsync } from '@/setup/firebase';

import login from './login';
import profile from './profile';

let authUnsubscribe;

export default {
  ...login,
  ...profile,

  async checkAuth() {
    const auth = (await fbAsync()).auth();
    if (auth.currentUser === null) {
      await auth.signInAnonymously();
      return true;
    }
    return !auth.currentUser.isAnonymous;
  },

  async initAuthListener({ commit, dispatch }) {
    const auth = (await fbAsync()).auth();
    if (typeof authUnsubscribe !== 'function') {
      authUnsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user !== null) {
          commit('setLoggedState', { isLogged: !user.isAnonymous, uid: user.uid });
          await dispatch('fetchUserProfile');
          return true;
        }
        return true;
      });
    }
    return true;
  }
};
