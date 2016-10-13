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
          if (authData.isAnonymous && this.wcForceAuth) {
            if (this.wcForceAuth !== 'anonymous') {
              this.$wcAuth
                .auth()
                .then(this.onLoginSuccess)
                .catch(this.onLoginFail);
            }
          }
        } else if (this.wcForceAuth) {
          switch (this.wcForceAuth) {
            case 'anonymous':
              this.$wcAuth
                .anonymousAuth()
                .then(this.onLoginSuccess)
                .catch(this.onLoginFail);
              break;
            default:
              this.$wcAuth
                .auth()
                .then(this.onLoginSuccess)
                .catch(this.onLoginFail);
              break;
          }
        }
      });
    }
    get credentialsArray() {
      if (angular.isString(this.wcCredentials)) {
        return this.wcCredentials.split(',');
      }
    }
    get isAnonymous() {
      return this.authData && this.authData.isAnonymous;
    }
    get showTransclude() {
      let returnable = false;
      // NO AUTH
      if (!this.authData) {
        returnable = false;
      // NO CREDENTIALS
      } else if (!this.wcCredentials) {
        returnable = true;
      // NO USER
      } else if (!this.user) {
        returnable = false;
      // CREDENTIALS MATCH
      } else if (this.user.credentials === this.wcCredentials) {
        returnable = true;
      } else {
        angular.forEach(this.credentialsArray, credential => {
          if (credential === this.user.credentials) {
            returnable = true;
          }
        });
      }
      return returnable;
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
