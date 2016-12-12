(function () {
  'use strict';
  class Service {
    init(firebase) {
      this.$auth = firebase.auth;
      this.$auth()
          .onAuthStateChanged(authData => {
            this.auth = authData;
          });
    }
    waitForAuth(success, error) {
      return this.$auth()
          .onAuthStateChanged(success, error);
    }
    getProvider(provider) {
      let returnable;
      switch (provider) {
        case 'facebook':
          returnable = new this.$auth.FacebookAuthProvider();
          break;
        case 'twitter':
          returnable = new this.$auth.TwitterAuthProvider();
          break;
        case 'google':
          returnable = new this.$auth.GoogleAuthProvider();
          break;
        default:
          break;
      }
      return returnable;
    }
    signInAnonymously() {
      return this.$auth()
        .signInAnonymously();
    }
    signInWithEmailAndPassword(credentials = {}) {
      return this.$auth()
        .signInWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
    }
    signInWithPopup(provider) {
      return this.$auth()
        .signInWithPopup(
          provider
        );
    }
    signInWithRedirect(provider) {
      return this.$auth()
        .signInWithRedirect(
          provider
        );
    }
    register(credentials) {
      return this.$auth()
        .createUserWithEmailAndPassword(credentials.email, credentials.password);
    }
    updatePassword(oldPassword, newPassword) {
      let email = this.auth.email;
      return this.auth
        .reauthenticate(this.$auth.EmailAuthProvider.credential(
          email,
          oldPassword
        )).then(() => {
          return this.auth.updatePassword(newPassword);
        });
    }
    logout() {
      return this.$auth()
        .signOut();
    }
  }
  angular
    .module('firedux.$fireduxAuth', [])
    .service('$fireduxAuth', Service);
}());
