import fb from '@/setup/firebase';

const auth = fb.auth();

function getProfileData(user) {
  const { displayName, uid, phoneNumber, photoURL, email } = user;
  return { displayName, uid, phoneNumber, photoURL, email };
}

export default {
  linkUser({ commit }, { provider, data }) {
    const { displayName, photoURL } = getProfileData(auth.currentUser);
    let newProfile;

    switch (provider) {
      case 'google.com':
        newProfile = {
          displayName: displayName || data.profile.name,
          photoURL: photoURL || data.profile.picture
        };
        break;
      default:
        newProfile = { displayName, photoURL };
    }

    if (newProfile.displayName !== displayName || newProfile.photoURL !== photoURL) {
      auth.currentUser.updateProfile(newProfile)
        .then(() => commit('setUserProfile', {
          profile: {
            ...getProfileData(auth.currentUser),
            ...newProfile
          }
        }));
    }
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
