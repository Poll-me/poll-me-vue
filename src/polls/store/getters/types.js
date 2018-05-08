export default {
  typesList(state) {
    return Object.keys(state.types).map(typeId => ({
      id: parseInt(typeId, 10),
      ...state.types[typeId]
    }));
  }
};
