import fbApp, { fbAsync } from '@/setup/firebase';

async function createEmailUser(email, password) {
  const auth = (await fbApp()).auth();
  return auth.createUserWithEmailAndPassword(email, password);
}

async function linkEmailToUser(email, password) {
  const fbAuth = (await fbAsync()).auth;
  const auth = (await fbApp()).auth();
  const credential = fbAuth.EmailAuthProvider.credential(email, password);
  const userCredential = await auth.currentUser.linkAndRetrieveDataWithCredential(credential);
  await userCredential.user.getIdToken(true);
  return userCredential.user;
}

export default {

  async registerEmail({ commit, dispatch }, { name, email, password }) {
    const prevUser = (await fbApp()).auth().currentUser;
    const registerFunction = prevUser !== null ?
      linkEmailToUser :
      createEmailUser;
    const user = await registerFunction(email, password);
    await user.updateProfile({ displayName: name });
    commit('setLoggedState', { isLogged: true, uid: user.uid });
    await dispatch('createUserProfile');
    return user;
  },

  async signIn(context, { email, password }) {
    const fbAuth = (await fbAsync()).auth;
    const auth = (await fbApp()).auth();
    const credential = fbAuth.EmailAuthProvider.credential(email, password);
    const prevUser = auth.currentUser;
    const user = await auth.signInAndRetrieveDataWithCredential(credential);

    if (prevUser && prevUser.isAnonymous) {
      await prevUser.delete();
    }

    return user;
  },

  async signOut({ commit }) {
    const auth = (await fbApp()).auth();
    if (!auth.currentUser.isAnonymous) {
      await auth.signOut();
      commit('setUserState', { isLogged: false });
    }
  }
};
