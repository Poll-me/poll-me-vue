export default {
  setVotes(state, votesEntities) {
    state.votesEntities = votesEntities;
  },

  addVote(state, { key, value }) {
    state.votesEntities = { ...state.votesEntities, [key]: value };
  },

  updateVote(state, { key, value }) {
    state.votesEntities = { ...state.votesEntities, [key]: value };
  },

  removeVote(state, key) {
    const { [key]: asd, ...restEntities } = state.votesEntities;
    state.votesEntities = restEntities;
  }
};
