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
      $onChanges(changes) {
        if (changes.parameters && this.request) {
          this.request.parameters = this.parameters;
          this.request.$save();
        }
      }
      requestReady(request) {
        this.request = request;
        request.parameters = this.parameters;
        request.$save();
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
          reducer: '@',
          action: '@',
          parameters: '<',
          onReady: '&',
          onData: '&'
          // onAuthError:  '&',
          // onError: '&'
          // For future error implementation
        }
      });
  }());
