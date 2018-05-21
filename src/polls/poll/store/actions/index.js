import fb from '@/setup/firebase';

import fillActions from './fill';

const db = fb.database();

let fetchedPoll = {};
let fetchedAnswers = {};

export default {
  ...fillActions,

  fetchPoll({ commit }, { key }) {
    if (fetchedPoll.key !== key) {
      if (fetchedPoll.key) {
        fetchedPoll.ref.off();
      }
      commit('setKey', { key });

      const pollRef = db.ref('/polls').child(key);
      pollRef.on('value', snapshot => commit('setEntity', { poll: snapshot.val() }));

      fetchedPoll = { key, ref: pollRef };
    }
  },

  fetchAnswers({ commit }, { key }) {
    if (fetchedAnswers.key !== key) {
      if (fetchedAnswers.key) {
        fetchedAnswers.ref.off();
      }

      const answersRef = db.ref('/answers').child(key);
      answersRef.on('value', (snapshot) => {
        const answers = snapshot.val() || {};
        commit('setAnswers', { answers });
      });

      fetchedAnswers = { key, ref: answersRef };
    }
  }
};
