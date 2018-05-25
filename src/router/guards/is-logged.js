import { fbUser } from '@/setup/firebase';

export default async function (to, from, next) {
  const authUser = await fbUser();
  if (authUser && !authUser.isAnonymous) {
    next();
  } else {
    const { path, params, query } = to;
    next({ name: 'login', params: { redirectRoute: { path, params, query } } });
  }
}
