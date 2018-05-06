export default {
  typesList(state) {
    return Object.keys(state.types).map(typeId => ({ id: typeId, ...state.types[typeId] }));
  }
};
