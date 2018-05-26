import fbApp, { fbUser } from '@/setup/firebase';

export default {
  async createPoll(context, data) {
    const db = (await fbApp()).database();
    const authUser = await fbUser();
    const pollData = { ...data, timestamp: new Date().getTime(), user: authUser.uid };

    const newPollRef = db.ref('/polls').push();
    await newPollRef.set(pollData);
    return newPollRef.key;
  }
};
