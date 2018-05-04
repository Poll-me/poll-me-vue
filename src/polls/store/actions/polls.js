import fb from '@/firebase';

const db = fb.database();

export default {
  fetchPolls({ commit }) {
    const pollsRef = db.ref('/polls');

    pollsRef.on('child_added', (snapshot) => {
      commit('addEntity', { key: snapshot.key, value: snapshot.val() });
    });

    pollsRef.on('child_changed', (snapshot) => {
      commit('updateEntity', { key: snapshot.key, value: snapshot.val() });
    });

    pollsRef.on('child_removed', (snapshot) => {
      commit('removeEntity', { key: snapshot.key });
    });
  }
};
