(function () {
  'use strict';
  class Controller {
    constructor($wcAuth) {
      this.$wcAuth = $wcAuth;
    }
    init() {
      if (!this.authWatcher) {
        this.authWatcher = this.$wcAuth.onAuth(authData => {
          if (authData) {
            this.wcOnAuth({
              $data: authData
            });
          } else if (this.wcForceAuth) {
            console.log('ploasx');
            this.$wcAuth
              .auth()
              .then(this.onLoginSuccess)
              .catch(this.onLoginFail);
          }
        });
      }
    }
    get authData() {
      return this.$wcAuth.authData;
    }
  }
  angular
    .module('webcat.auth', [])
    .component('wcAuth', {
      templateUrl: 'webcat/wc-auth/wc-auth.html',
      controller: Controller,
      transclude: true,
      bindings: {
        wcOnAuth: '&',
        wcCredentials: '@',
        wcForceAuth: '@',
        wcOnLoginSuccess: '&',
        wcOnLoginFailure: '&'
      }
    });
}());
