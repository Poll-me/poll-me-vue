export default {
  setLoggedState(state, { isLogged, uid }) {
    state.user.isLogged = isLogged;
    state.user.uid = uid || undefined;
  },

  setUserProfile(state, { profile }) {
    state.user = { ...state.user, profile };
  },

  setUserState(state, { isLogged, uid, profile }) {
    state.user = {
      ...state.user,
      isLogged,
      uid,
      profile: profile || {}
    };
  }
};
