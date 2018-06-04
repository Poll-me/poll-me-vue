import fbApp, { fbUser, fbAsync } from '@/setup/firebase';

export default {
  async createPoll(context, data) {
    const db = (await fbApp()).database();
    const authUser = await fbUser();
    const timestamp = (await fbAsync()).database.ServerValue.TIMESTAMP;
    const pollData = { ...data, timestamp, user: authUser.uid };

    const newPollRef = db.ref('/polls').push();
    await newPollRef.set(pollData);
    return newPollRef.key;
  }
};
