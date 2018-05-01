import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';

Vue.use(VueFire);

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MSG_SENDER_ID
});

export default firebaseApp;
