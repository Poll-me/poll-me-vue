import fbApp, { fbUser } from '@/setup/firebase';

export default async (to, from, next) => {
  await fbUser();
  const db = (await fbApp()).database();
  const pollKey = to.params.key;
  const snapshot = await db.ref('/polls').child(pollKey).once('value');
  if (snapshot.exists()) {
    next();
  } else {
    next({ replace: true, name: 'poll-not-found', params: { pollKey } });
  }
};
