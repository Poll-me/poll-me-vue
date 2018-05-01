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
  mutations: {
    setEntities(state, entities) {
      state.entities = entities;
    }
  },
  actions
};
