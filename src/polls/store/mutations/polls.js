export default {
  setEntities(state, entities) {
    state.entities = entities;
  },

  addEntity(state, { key, value }) {
    state.entities = { ...state.entities, [key]: value };
  },

  updateEntity(state, { key, value }) {
    state.entities = { ...state.entities, [key]: value };
  },

  removeEntity(state, key) {
    const { [key]: asd, ...restEntities } = state.entities;
    state.entities = restEntities;
  }
};
