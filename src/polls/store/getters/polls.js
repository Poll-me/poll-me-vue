export default {
  items(state) {
    return Object.keys(state.entities)
      .map(key => ({ ...state.entities[key], key }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }
};
