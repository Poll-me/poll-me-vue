import firebase from 'firebase';
import fb from '@/setup/firebase';

const auth = fb.auth();
const db = fb.database();
const st = fb.storage();
const avatarFileName = 'avatar-image';

function getProfileData(authUser) {
  const { displayName, phoneNumber, photoURL, email } = authUser;
  return { displayName, phoneNumber, photoUrl: photoURL, email };
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
  },

  updateUserProfile({ commit, state }, { profile: newData }) {
    return new Promise((resolve, reject) => {
      const authUser = auth.currentUser;
      db.ref('/users/')
        .child(authUser.uid)
        .update(newData)
        .then(() => {
          commit('setUserProfile', { profile: { ...state.user.profile, ...newData } });
          if (
            typeof newData.displayName !== 'undefined' ||
            typeof newData.photoUrl !== 'undefined'
          ) {
            authUser.updateProfile({
              displayName: newData.displayName,
              photoURL: newData.photoUrl
            }).then(() => resolve(newData), reject);
          } else {
            resolve(newData);
          }
        }, reject);
    });
  },

  updateUserPassword(context, { password, newPassword }) {
    const authUser = auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(authUser.email, password);
    return new Promise((resolve, reject) => {
      authUser.reauthenticateAndRetrieveDataWithCredential(credential)
        .then(() => {
          authUser.updatePassword(newPassword)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  },

  updateUserAvatar({ dispatch }, { image }) {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      const userRef = st.ref().child('users').child(user.uid);

      const cleanBeforeAvatarPromise = user.photoURL ?
        st.refFromURL(user.photoURL).delete() :
        Promise.resolve(true);

      cleanBeforeAvatarPromise.then(() => {
        if (image instanceof File) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${avatarFileName}-${Date.now()}.${fileExt}`;
          const metadata = { contentType: image.type };
          const avatarRef = userRef.child(fileName);
          avatarRef.put(image, metadata).then(() => {
            avatarRef.getDownloadURL().then((url) => {
              dispatch('updateUserProfile', {
                profile: {
                  photoUrl: url
                }
              }).then(() => resolve(url), reject);
            }, reject);
          }, reject);
        } else {
          dispatch('updateUserProfile', {
            profile: {
              photoUrl: null
            }
          }).then(() => resolve(), reject);
        }
      }, reject);
    });
  }
};
