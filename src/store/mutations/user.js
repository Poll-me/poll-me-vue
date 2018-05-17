export default {
  setLoggedState(state, { isLogged }) {
    state.user.isLogged = isLogged;
  },

  setUserProfile(state, { profile }) {
    state.user = { ...state.user, profile };
  },

  updateUserState(state, { isLogged, profile }) {
    state.user = {
      ...state.user,
      isLogged,
      profile: profile || {}
    };
  }
};
