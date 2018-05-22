import fb from '@/setup/firebase';

const db = fb.database();
const auth = fb.auth();

let votesFetched = {};

export default {
  fetchVotes({ commit }) {
    const user = auth.currentUser;
    if (votesFetched.user !== user.uid) {
      if (votesFetched.ref) {
        votesFetched.ref.off();
        commit('setVotes', {});
      }
      const votesRef = db.ref('userVotes').child(user.uid);

      votesRef.on('child_added', (snapshot) => {
        commit('addVote', { key: snapshot.key, value: snapshot.val() });
      });

      votesRef.on('child_changed', (snapshot) => {
        commit('updateVote', { key: snapshot.key, value: snapshot.val() });
      });

      votesRef.on('child_removed', (snapshot) => {
        commit('removeVote', snapshot.key);
      });

      votesFetched = { ref: votesRef, user: user.uid };
    }
  }
};
