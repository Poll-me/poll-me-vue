export default {
  setKey(state, { key }) {
    state.key = key;
  },

  setEntity(state, { poll }) {
    state.entity = poll;
  },

  setAnswers(state, { answers }) {
    state.answersEntities = answers;
  }
};
