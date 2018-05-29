import fbApp from '@/setup/firebase';

import fillActions from './fill';

let fetchedPoll = {};
let fetchedAnswers = {};

export default {
  ...fillActions,

  async fetchPoll({ commit, dispatch }, { key }) {
    const db = (await fbApp()).database();
    if (fetchedPoll.key !== key) {
      if (fetchedPoll.key) {
        fetchedPoll.ref.off();
      }
      commit('setKey', { key });

      const pollRef = db.ref('/polls').child(key);
      pollRef.on('value', async (snapshot) => {
        let pollData = snapshot.val();
        const user = await dispatch('getUserProfile', pollData.user, { root: true });
        if (user) {
          pollData = { ...pollData, author: user.displayName };
        }
        commit('setEntity', { poll: pollData });
      });

      fetchedPoll = { key, ref: pollRef };
    }
  },

  async fetchAnswers({ commit, dispatch }, { key }) {
    const db = (await fbApp()).database();
    if (fetchedAnswers.key !== key) {
      if (fetchedAnswers.key) {
        fetchedAnswers.ref.off();
      }

      const answersRef = db.ref('/answers').child(key);
      answersRef.on('value', async (snapshot) => {
        const answers = snapshot.val() || {};
        const usersPromises = [];
        Object.keys(answers).forEach((uid) => {
          usersPromises.push(
            dispatch('getUserProfile', uid, { root: true }).then((user) => {
              if (user) {
                answers[uid] = { ...answers[uid], author: user.displayName };
              }
            })
          );
        });
        await Promise.all(usersPromises);
        commit('setAnswers', { answers });
      });

      fetchedAnswers = { key, ref: answersRef };
    }
  }
};
