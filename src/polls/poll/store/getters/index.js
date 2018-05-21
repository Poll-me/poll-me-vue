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
