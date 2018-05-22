import fb from '@/setup/firebase';

const db = fb.database();
const auth = fb.auth();

export default {
  submitVote({ getters }, payload) {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      const timestamp = new Date().getTime();
      const vote = { ...payload, lastModified: timestamp };
      db.ref('answers').child(getters.poll.key).child(user.uid).set(vote)
        .then(() => {
          db.ref('userVotes').child(user.uid).child(getters.poll.key).set({
            name: getters.poll.name,
            lastModified: timestamp
          })
            .then(() => resolve(), reject);
        }, reject);
    });
  },

  removeVote({ getters }) {
    return new Promise((resolve, reject) => {
      const user = auth.currentUser;
      db.ref('answers').child(getters.poll.key).child(user.uid).remove()
        .then(() => {
          db.ref('userVotes').child(user.uid).child(getters.poll.key).remove()
            .then(() => resolve(), reject);
        }, reject);
    });
  }
};
