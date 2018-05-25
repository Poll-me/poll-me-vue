import fbApp, { fbAsync } from '@/setup/firebase';

const avatarFileName = 'avatar-image';

function getProfileData(authUser) {
  const { displayName, phoneNumber, photoURL, email } = authUser;
  return { displayName, phoneNumber, photoUrl: photoURL, email };
}

export default {

  async getUserProfile(context, uid) {
    const db = (await fbApp()).database();
    const snapshot = await db.ref('/users/')
      .child(uid)
      .once('value');
    return snapshot.val();
  },

  async createUserProfile({ commit }) {
    const authUser = (await fbApp()).auth().currentUser;
    const db = (await fbAsync()).database();
    const profile = getProfileData(authUser);
    await db.ref('/users/').child(authUser.uid).set(profile);
    commit('setUserProfile', { profile });
    return profile;
  },

  async fetchUserProfile({ commit, dispatch }) {
    const authUser = (await fbApp()).auth().currentUser;
    let profile = {};

    if (!authUser.isAnonymous) {
      profile = await dispatch('getUserProfile', authUser.uid);
    }

    commit('setUserProfile', { profile });
    return profile;
  },

  async updateUserProfile({ commit, state }, { profile: newData }) {
    const authUser = (await fbApp()).auth().currentUser;
    const db = (await fbApp()).database();

    await db.ref('/users/')
      .child(authUser.uid)
      .update(newData);
    commit('setUserProfile', { profile: { ...state.user.profile, ...newData } });

    if (typeof newData.displayName !== 'undefined' || typeof newData.photoUrl !== 'undefined') {
      await authUser.updateProfile({
        displayName: newData.displayName,
        photoURL: newData.photoUrl
      });
    }

    return newData;
  },

  async updateUserPassword(context, { password, newPassword }) {
    const fbAuth = (await fbAsync()).auth;
    const authUser = (await fbApp()).auth().currentUser;
    const credential = fbAuth.EmailAuthProvider.credential(authUser.email, password);
    await authUser.reauthenticateAndRetrieveDataWithCredential(credential);
    return authUser.updatePassword(newPassword);
  },

  async updateUserAvatar({ dispatch }, { image }) {
    const authUser = (await fbApp()).auth().currentUser;
    const st = (await fbApp()).storage();
    const userRef = st.ref().child('users').child(authUser.uid).child('avatar');

    if (authUser.photoURL) {
      await st.refFromURL(authUser.photoURL).delete();
    }

    let url = null;

    if (image instanceof File) {
      const cacheAge = 60 * 60 * 24 * 14; // 14 days
      const fileExt = image.name.split('.').pop();
      const fileName = `${avatarFileName}-${Date.now()}.${fileExt}`;
      const metadata = { contentType: image.type, cacheControl: `public, max-age=${cacheAge}` };
      const avatarRef = userRef.child(fileName);
      await avatarRef.put(image, metadata);
      url = await avatarRef.getDownloadURL();
    }

    return dispatch('updateUserProfile', {
      profile: {
        photoUrl: url
      }
    });
  }
};
