(function () {
  'use strict';

  class Service {
    constructor($firebaseAuth, Dialog) {
      this.$firebaseAuth = $firebaseAuth();
      this.$dialog = Dialog.$dialog();
      this.$firebaseAuth.$onAuthStateChanged(authData => {
        this.getAuthData = authData;
      });
      this.getAuthData = this.$firebaseAuth.$getAuth();
    }
    $requireSignIn() {
      return this.$firebaseAuth.$requireSignIn();
    }
    get authData() {
      return this.getAuthData;
    }
    anonymusAuth() {
      return this.$firebaseAuth.signInAnonymously();
    }
    auth() {
      let returnable;
      if (!this.isAuthing) {
        this.isAuthing = true;
        returnable = new Promise((resolve, reject) => {
          this.$dialog.login()()
            .then(credentials => {
              this.login(credentials)
                .then(authdata => {
                  resolve(authdata);
                })
                .catch(() => {
                  this.auth();
                });
            })
            .catch(() => {
              reject();
            });
        });
      } else {
        returnable = Promise.resolve();
      }
      return returnable;
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
        .$signInWithEmailAndPassword(credentials.email, credentials.password);
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
    .service('$wcAuth', Service);
}());
