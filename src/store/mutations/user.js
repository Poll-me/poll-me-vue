export default {
  setLoggedState(state, { isLogged }) {
    state.user.isLogged = isLogged;
  }
};
