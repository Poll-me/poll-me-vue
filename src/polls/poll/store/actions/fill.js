import fb from '@/setup/firebase';

const db = fb.database();

export default {
  submitVote(context, payload) {
    db.ref('answers').push(payload);
  }
};
