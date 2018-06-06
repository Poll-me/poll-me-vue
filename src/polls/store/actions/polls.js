import fbApp, { fbUser } from '@/setup/firebase';

let pollsFetched = {};

async function removePollUserVotes(key) {
  const db = (await fbApp()).database();
  const answersRef = db.ref('answers').child(key);
  const usersVotes = (await answersRef.once('value')).val();
  const deletionPromises = [];

  if (usersVotes) {
    const participants = Object.keys(usersVotes);

    participants.forEach((user) => {
      deletionPromises.push(db.ref('userVotes').child(user).child(key).remove());
    });
  }

  return Promise.all(deletionPromises);
}

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
  },

  async removePoll(context, key) {
    const db = (await fbApp()).database();

    await removePollUserVotes(key);
    await db.ref('answers').child(key).remove();
    return db.ref('polls').child(key).remove();
  }
};
