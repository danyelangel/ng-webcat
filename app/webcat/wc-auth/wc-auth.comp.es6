(function () {
  'use strict';
  class Controller {
    constructor($wcAuth) {
      this.$wcAuth = $wcAuth;
      $wcAuth.onAuth(authData => {
        if (authData) {
          this.wcOnAuth({
            $data: authData
          });
        } else if (this.wcForceAuth) {
          if (this.wcCredentials === this.user.credentials) {
            this.$wcAuth
              .auth()
              .then(this.onLoginSuccess)
              .catch(this.onLoginFail);
          }
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
      template: '<ng-transclude ng-if="$ctrl.authData"></ng-transclude>',
      controller: Controller,
      transclude: true,
      bindings: {
        wcOnAuth: '&',
        wcForceAuth: '@',
        wcOnLoginSuccess: '&',
        wcOnLoginFailure: '&'
      }
    });
}());
