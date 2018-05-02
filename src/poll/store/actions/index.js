import fb from '../../../firebase';

const db = fb.database();

export default {
  fetchPoll({ commit }, { key }) {
    commit('setKey', { key });

    const ref = db.ref('/polls').child(key);
    ref.off();
    ref.on('value', (snapshot) => {
      commit('setEntity', { poll: snapshot.val() });
    });
  }
};
