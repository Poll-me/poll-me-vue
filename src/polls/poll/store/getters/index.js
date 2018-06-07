export default {
  answers(state) {
    return Object.keys(state.answersEntities)
      .map(user => ({
        ...state.answersEntities[user],
        user
      }))
      .sort((a, b) => b.lastModified - a.lastModified);
  },

  poll(state, { answers }) {
    return {
      ...state.entity,
      key: state.key,
      answers
    };
  }
};
