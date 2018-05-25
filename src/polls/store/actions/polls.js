import fbApp, { fbUser } from '@/setup/firebase';

let pollsFetched = {};

export default {
  async fetchPolls({ commit }) {
    const db = (await fbApp()).database();
    const authUser = await fbUser();
    if (pollsFetched.user !== authUser.uid) {
      if (pollsFetched.ref) {
        pollsFetched.ref.off();
        commit('setEntities', {});
      }
      const pollsRef = db.ref('polls').orderByChild('user').equalTo(authUser.uid);

      pollsRef.on('child_added', (snapshot) => {
        commit('addEntity', { key: snapshot.key, value: snapshot.val() });
      });

      pollsRef.on('child_changed', (snapshot) => {
        commit('updateEntity', { key: snapshot.key, value: snapshot.val() });
      });

      pollsRef.on('child_removed', (snapshot) => {
        commit('removeEntity', snapshot.key);
      });

      pollsFetched = { ref: pollsRef, user: authUser.uid };
    }
  }
};
