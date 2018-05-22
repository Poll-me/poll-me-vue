import fb from '@/setup/firebase';

const db = fb.database();
const auth = fb.auth();

let pollsFetched = {};

export default {
  fetchPolls({ commit }) {
    const user = auth.currentUser;
    if (pollsFetched.user !== user.uid) {
      if (pollsFetched.ref) {
        pollsFetched.ref.off();
        commit('setEntities', {});
      }
      const pollsRef = db.ref('polls').orderByChild('user').equalTo(user.uid);

      pollsRef.on('child_added', (snapshot) => {
        commit('addEntity', { key: snapshot.key, value: snapshot.val() });
      });

      pollsRef.on('child_changed', (snapshot) => {
        commit('updateEntity', { key: snapshot.key, value: snapshot.val() });
      });

      pollsRef.on('child_removed', (snapshot) => {
        commit('removeEntity', snapshot.key);
      });

      pollsFetched = { ref: pollsRef, user: user.uid };
    }
  }
};
