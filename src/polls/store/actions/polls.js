import fb from '../../../firebase';

const db = fb.database();

export default {
  fetchPolls({ commit }) {
    const pollsRef = db.ref('/polls');
    pollsRef.once('value').then(snapshot => commit('setEntities', snapshot.val()));
  }
};
