<template>
  <div id="firebaseui-container" class="sm:py-4"></div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

@Component()
export default class FirebaseUIForm extends Vue {
  ui;

  mounted() {
    this.initFirebaseUI();
  }

  initFirebaseUI() {
    if (!this.ui) {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start('#firebaseui-container', {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
          },
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      });
    }
  }
}
</script>
