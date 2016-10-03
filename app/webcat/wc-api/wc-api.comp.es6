  (function () {
    'use strict';
    class Controller {
      constructor(Auth) {
        this.Auth = Auth;
      }
      $onInit() {
        this.Auth.onAuth(authData => {
          if (authData) {
            this.userId = authData.uid;
          }
        });
      }
    }
    angular
      .module('webcat.api', [
        'debounce'
      ])
      .component('wcApi', {
        templateUrl: 'webcat/wc-api/wc-api.html',
        controller: Controller,
        bindings: {
          // Data
          method: '@',
          parameters: '<',
          debounce: '@',
          onReady: '&',
          onData: '&'
          // onAuthError:  '&',
          // onError: '&'
          // For future error implementation
        }
      });
  }());
