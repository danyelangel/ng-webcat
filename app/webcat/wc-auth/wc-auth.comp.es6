(function () {
  'use strict';
  class Controller {
    constructor($wcAuth) {
      this.$wcAuth = $wcAuth;
      this.$wcAuth.onAuth(authData => {
        if (authData) {
          this.userId = authData.uid;
          this.wcOnAuth({
            $data: authData
          });
        } else if (this.wcForceAuth) {
          this.$wcAuth
            .auth()
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail);
        } else if (this.wcAnonymousAuth) {
          this.$wcAuth
            .anonymousAuth()
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail);
        }
      });
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
        wcAnonymousAuth: '@',
        wcOnLoginSuccess: '&',
        wcOnLoginFailure: '&'
      }
    });
}());
