import fb from '@/firebase';

const db = fb.database();

export default {
  fetchPoll({ commit, state }, { key }) {
    if (state.key) {
      db.ref('/polls').child(state.key).off();
    }
    commit('setKey', { key });

    db.ref('/polls').child(key).on('value', (snapshot) => {
      commit('setEntity', { poll: snapshot.val() });
    });
  }
};
