import { fbUser } from '@/setup/firebase';

export default async function (to, from, next) {
  const authUser = await fbUser();
  if (!authUser || authUser.isAnonymous) {
    next();
  } else {
    next(from.matched.length > 0 ? false : { name: 'home', replace: true });
  }
}
