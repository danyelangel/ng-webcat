(function () {
  'use strict';
  class Service {
    constructor($window) {
      this.$auth = $window.firebase.auth;
      this.waitForAuth()
        .then(authData => {
          this.auth = authData;
        });
    }
    waitForAuth() {
      return new Promise((resolve, reject) => {
        this.$auth()
          .onAuthStateChanged(authData => {
            if (authData) {
              resolve(authData);
            } else {
              reject();
            }
          });
      });
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
  }
  angular
    .module('firedux.$fireduxAuth', [])
    .service('$fireduxAuth', Service);
}());
