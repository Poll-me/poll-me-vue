export default {
  poll(state) {
    const answers = Object.values(state.answers);
    return {
      ...state.entity,
      key: state.key,
      answers: answers.sort((a, b) => a.timestamp - b.timestamp)
    };
  },

  voteActionPayload: (state, getters) => ({ author }) => {
    const timestamp = new Date().getTime();
    let actionPayload = { timestamp, poll: getters.poll.key };

    switch (getters.poll.type) {
      default:
        actionPayload = { ...actionPayload, author };
    }

    return actionPayload;
  }
};
