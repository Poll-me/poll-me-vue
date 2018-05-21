import fb from '@/setup/firebase';

const db = fb.database();

export default (to, from, next) => {
  const pollKey = to.params.key;
  db.ref('/polls').child(pollKey).once('value', (snapshot) => {
    if (snapshot.exists()) {
      next();
    } else {
      next({ replace: true, name: 'poll-not-found', params: { pollKey } });
    }
  }, () => next(false));
};
