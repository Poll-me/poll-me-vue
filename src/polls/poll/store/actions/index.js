import fb from '@/setup/firebase';

import fillActions from './fill';

const db = fb.database();

export default {
  ...fillActions,

  fetchPoll({ commit, state }, { key }) {
    if (state.key) {
      db
        .ref('/polls')
        .child(state.key)
        .off();
    }
    commit('setKey', { key });

    db
      .ref('/polls')
      .child(key)
      .on('value', snapshot => commit('setEntity', { poll: snapshot.val() }));
  },

  fetchAnswers({ commit, state }, { key }) {
    if (state.key) {
      db
        .ref('/answers')
        .orderByChild('poll')
        .equalTo(state.key)
        .off();
    }

    db
      .ref('/answers')
      .orderByChild('poll')
      .equalTo(key)
      .on('value', (snapshot) => {
        const answers = snapshot.val() || {};
        commit('setAnswers', { answers });
      });
  }
};
