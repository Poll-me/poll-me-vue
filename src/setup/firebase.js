import Vue from 'vue';
import VueFire from 'vuefire';

Vue.use(VueFire);

let fbAppInstance;

export async function fbAsync() {
  const fb = await import(/* webpackChunkName: 'firebase' */ 'firebase/app');
  await import(/* webpackChunkName: 'firebase' */ 'firebase/auth');

  if (!fbAppInstance) {
    fbAppInstance = fb.initializeApp({
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      databaseURL: process.env.FB_DB_URL,
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MSG_SENDER_ID
    });
  }

  return fb;
}

export async function stAsync() {
  await import(/* webpackChunkName: 'firebase-storage' */ 'firebase/storage');
  return (await fbAsync()).storage();
}

export default async function () {
  await import(/* webpackChunkName: 'firebase' */ 'firebase/database');

  return (await fbAsync()).app();
}
