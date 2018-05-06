export default {
  poll(state) {
    const answers = Object.values(state.answers);
    return {
      ...state.entity,
      key: state.key,
      answers: answers.sort((a, b) => a.timestamp - b.timestamp)
    };
  }
};
