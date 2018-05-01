import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    entities: {}
  },
  getters: {
    items(state) {
      return Object.values(state.entities);
    }
  },
  mutations,
  actions
};
