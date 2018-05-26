import fbApp, { fbUser } from '@/setup/firebase';

export default {
  async submitVote({ getters }, payload) {
    const db = (await fbApp()).database();
    const authUser = await fbUser();
    const timestamp = new Date().getTime();
    const vote = { ...payload, lastModified: timestamp };
    await db.ref('answers').child(getters.poll.key).child(authUser.uid).set(vote);
    await db.ref('userVotes').child(authUser.uid).child(getters.poll.key).set({
      name: getters.poll.name,
      lastModified: timestamp
    });
  },

  async removeVote({ getters }) {
    const db = (await fbApp()).database();
    const authUser = await fbUser();
    await db.ref('answers').child(getters.poll.key).child(authUser.uid).remove();
    await db.ref('userVotes').child(authUser.uid).child(getters.poll.key).remove();
  }
};
