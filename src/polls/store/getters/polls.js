export default {
  polls(state) {
    return Object.keys(state.entities)
      .map(key => ({ ...state.entities[key], key }))
      .sort((a, b) => b.timestamp - a.timestamp);
  }
};
