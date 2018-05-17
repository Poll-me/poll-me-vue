import fb from '@/setup/firebase';

const auth = fb.auth();
const db = fb.database();

function getProfileData(authUser) {
  const { displayName, uid, phoneNumber, photoURL, email } = authUser;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {

  createUserProfile({ commit }) {
    return new Promise((resolve, reject) => {
      const authUser = auth.currentUser;
      const { uid, ...profileData } = getProfileData(authUser);
      db.ref('/users/')
        .child(authUser.uid)
        .set(profileData)
        .then(() => {
          const profile = { uid, ...profileData };
          commit('setUserProfile', { profile });
          resolve(profile);
        })
        .catch(reject);
    });
  },

  updateUserProfile({ commit, state }, { profile: newData }) {
    return new Promise((resolve, reject) => {
      const authUser = auth.currentUser;
      db.ref('/users/')
        .child(authUser.uid)
        .update(newData)
        .then(() => {
          commit('setUserProfile', { profile: { ...state.user.profile, ...newData } });
          resolve(newData);
        })
        .catch(reject);
    });
  },

  fetchUserProfile({ commit }) {
    const authUser = auth.currentUser;
    return new Promise((resolve, reject) => {
      if (!authUser.isAnonymous) {
        db.ref('/users/')
          .child(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const profile = snapshot.val();
            commit('setUserProfile', { profile: { uid: authUser.uid, ...profile } });
            resolve(profile);
          })
          .catch(reject);
      } else {
        commit('setUserProfile', { profile: { uid: authUser.uid } });
        resolve({ uid: authUser.uid });
      }
    });
  }
};
