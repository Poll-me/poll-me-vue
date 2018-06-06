import fbApp, { fbUser, fbAsync } from '@/setup/firebase';

export default {
  async submitVote({ getters }, payload) {
    const authUser = await fbUser();
    const db = (await fbApp()).database();
    const timestamp = (await fbAsync()).database.ServerValue.TIMESTAMP;
    const vote = { ...payload, lastModified: timestamp };
    await db.ref('answers').child(getters.poll.key).child(authUser.uid).set(vote);
    await db.ref('userVotes').child(authUser.uid).child(getters.poll.key).set({
      name: getters.poll.name,
      lastModified: timestamp
    });
  },

  async removeVote({ getters }, user) {
    const db = (await fbApp()).database();
    await db.ref('answers').child(getters.poll.key).child(user).remove();
    return db.ref('userVotes').child(user).child(getters.poll.key).remove();
  }
};
