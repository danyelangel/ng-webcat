(function () {
  'use strict';

  class Service {
    constructor($firebaseAuth, Dialog, $state) {
      this.$firebaseAuth = $firebaseAuth();
      this.$dialog = Dialog.$dialog();
      this.$state = $state;
      this.$firebaseAuth.$onAuthStateChanged(authData => {
        this.getAuthData = authData;
      });
      this.getAuthData = this.$firebaseAuth.$getAuth();
      if (!this.getAuthData) {
        this.$firebaseAuth.$signInAnonymously();
      }
    }
    get authData() {
      return this.getAuthData;
    }
    auth() {
      this.$dialog.login()().then(credentials => {
        this.login(credentials);
      }).catch(() => {
        // To do error notification
      });
    }
    updatePassword() {
      this.$dialog.login()().then(credentials => {
        this.login(credentials).then(() => {
          this.$dialog.newPassword()().then(password => {
            return this.$firebaseAuth
              .$updatePassword(password).then(() => {
                credentials.password = password;
                this.login(credentials);
                // To do success notification
              })
              .catch(() => {
                // To do error notification
              });
          });
        });
      }).catch(() => {
        // To do error notification
      });
    }
    login(credentials) {
      return this.$firebaseAuth
        .$signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) => {
          this.getAuthData = authData;
        });
    }
    onAuth(callback) {
      this.$firebaseAuth.$onAuthStateChanged(callback);
    }
    logout() {
      this.$firebaseAuth.$signOut();
    }
  }
  angular
    .module('firedux.auth', [])
    .service('Auth', Service);
}());
