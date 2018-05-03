import fb from '@/firebase';

const db = fb.database();

export default (to, from, next) => {
  const pollKey = to.params.key;
  db.ref('/polls').child(pollKey).once('value')
    .then((snapshot) => {
      if (snapshot.val() !== null) {
        next();
      } else {
        next({ name: 'user-polls' });
      }
    });
};
