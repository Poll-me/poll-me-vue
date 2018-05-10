export default {
  isAnonymous(state) {
    return !state.user.isLogged && typeof state.user.profile.uid === 'string';
  }
};
