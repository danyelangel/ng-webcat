(function () {
  'use strict';
  class Controller {
    constructor(Auth, debounce) {
      this.Auth = Auth;
      this.debounceServ = debounce;
    }
    $onInit() {
      this.Auth.onAuth(authData => {
        this.userId = authData.uid;
      });
    }
    $onChanges(changes) {
      if (changes.parameters && this.requests) {
        this.requests.$addWithTimestamp(this.parameters);
        this.onRequestSent();
      }
    }
    onFireduxReady(ready) {
      if (ready) {
        this.onReady();
      }
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
        onData: '&',
        onRequestSent: '&'
        // onAuthError: '&',
        // onError: '&'
        // For future error implementation
      }
    });
}());
