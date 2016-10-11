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
          this.$wcAuth
            .auth()
            .then(this.onLoginSuccess)
            .catch(this.onLoginFail);
        }
      });
    }
    get authData() {
      return this.Auth.authData;
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
        wcAuthLayout: '@',
        wcOnLoginSuccess: '&',
        wcOnLoginFailure: '&'
      }
    });
}());
