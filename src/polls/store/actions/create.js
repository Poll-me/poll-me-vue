import fb from '@/setup/firebase';

const db = fb.database();
const auth = fb.auth();

export default {
  createPoll(context, data) {
    const user = auth.currentUser;
    const pollData = { ...data, timestamp: new Date().getTime(), user: user.uid };
    return new Promise((resolve, reject) => {
      const newPollRef = db.ref('/polls').push();
      newPollRef.set(pollData).then(() => resolve(newPollRef.key)).catch(reject);
    });
  }
};
