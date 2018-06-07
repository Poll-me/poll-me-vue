export default {
  answers(state) {
    return Object.keys(state.answersEntities)
      .map(user => ({
        ...state.answersEntities[user],
        user
      }))
      .reverse();
  },

  poll(state, { answers }) {
    return {
      ...state.entity,
      key: state.key,
      answers
    };
  }
};
