export default {
  votes(state) {
    return Object.keys(state.votesEntities)
      .map(key => ({ ...state.votesEntities[key], key }))
      .reverse();
  }
};
