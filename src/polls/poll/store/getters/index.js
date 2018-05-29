export default {
  answers(state) {
    return Object.keys(state.answersEntities)
      .map(user => ({
        ...state.answersEntities[user],
        user
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  },

  poll(state, { answers }) {
    return {
      ...state.entity,
      key: state.key,
      answers
    };
  }
};
