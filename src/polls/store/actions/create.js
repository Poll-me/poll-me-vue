import fb from '@/setup/firebase';

const db = fb.database();

export default {
  createPoll(context, data) {
    const pollData = { ...data, timestamp: new Date().getTime() };
    return new Promise((resolve, reject) => {
      const newPollRef = db.ref('/polls').push();
      newPollRef.set(pollData).then(() => resolve(newPollRef.key)).catch(reject);
    });
  }
};
