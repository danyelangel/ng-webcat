(function () {
  'use strict';

  class Service {
    constructor($firebaseAuth, Dialog, $state) {
      this.$firebaseAuth = $firebaseAuth;
      this.$dialog = Dialog.$dialog();
      this.$state = $state;
      this.$firebaseAuth().$onAuthStateChanged(authData => {
        this.getAuthData = authData;
      });
    }
    get getAuthData() {
      return this.$firebaseAuth().$getAuth();
    }
    get authData() {
      return this.getAuthData;
//      return true;
    }
    auth() {
      this.$dialog.login()().then(credentials => {
        this.login(credentials);
        this.$state.go('root');
      }).catch(() => {
        this.$state.go('root');
      });
    }
    updatePassword() {
      this.$dialog.login()().then(credentials => {
        this.login(credentials).then(() => {
          this.$dialog.newPassword()().then(password => {
            return this.$firebaseAuth()
              .$updatePassword(password).then(() => {
                credentials.password = password;
                this.login(credentials);
                console.log('Success');
              })
              .catch(error => {
                console.log(error);
              });
          });
        });
      }).catch(() => {
        this.$state.go('root');
      });
    }
    login(credentials) {
      return this.$firebaseAuth()
        .$signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) => {
          this.getAuthData = authData;
          console.log('User Logged In');
        });
    }
    onAuth(callback) {
      this.$firebaseAuth().$onAuthStateChanged(callback);
    }
    logout() {
      this.$firebaseAuth().$signOut();
    }
  }
  angular
    .module('firedux.auth', [])
    .service('Auth', Service);
}());
