import fb from '@/setup/firebase';

const auth = fb.auth();
const db = fb.database();

function getProfileData(authUser) {
  const { displayName, phoneNumber, photoURL, email } = authUser;
  return { displayName, phoneNumber, photoURL, email };
}

export default {

  createUserProfile({ commit }) {
    return new Promise((resolve, reject) => {
      const authUser = auth.currentUser;
      const profile = getProfileData(authUser);
      db.ref('/users/')
        .child(authUser.uid)
        .set(profile)
        .then(() => {
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
          if (newData.displayName || newData.photoUrl) {
            authUser.updateProfile({
              displayName: newData.displayName,
              photoURL: newData.photoUrl
            })
              .then(() => resolve(newData))
              .catch(reject);
          } else {
            resolve(newData);
          }
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
            commit('setUserProfile', { profile });
            resolve(profile);
          })
          .catch(reject);
      } else {
        commit('setUserProfile', { profile: {} });
        resolve({});
      }
    });
  }
};
