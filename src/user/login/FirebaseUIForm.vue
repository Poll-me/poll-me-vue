<template>
  <div id="firebaseui-container" class="sm:py-4"></div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

@Component({
  props: {
    tosUrl: {
      required: true,
      type: String
    }
  }
})
export default class FirebaseUIForm extends Vue {
  mounted() {
    this.initFirebaseUI();
  }

  onSuccess(auth) {
    this.$emit('success', auth);
    return false;
  }

  onError(error) {
    return new Promise((resolve) => {
      this.$emit('error', error);
      resolve();
    });
  }

  initFirebaseUI() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-container', {
      autoUpgradeAnonymousUsers: true,
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onSuccess.bind(this),
        signInFailure: this.onError.bind(this)
      },
      tosUrl: this.tosUrl
    });
  }
}
</script>
