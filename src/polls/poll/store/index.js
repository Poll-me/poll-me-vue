import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    entity: {},
    key: '',
    answers: {}
  },
  getters: {
    poll(state) {
      const answers = Object.values(state.answers);
      return { ...state.entity, answers: answers.sort((a, b) => a.timestamp - b.timestamp) };
    }
  },
  mutations,
  actions
};
