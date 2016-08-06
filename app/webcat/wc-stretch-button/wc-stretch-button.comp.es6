(function () {
  'use strict';
  class Controller {
    constructor(Auth) {
      this.Auth = Auth;
    }
    get authData() {
      return this.Auth.authData;
    }
  }
  angular
    .module('webcat.stretch-button', [])
    .component('wcStretchButton', {
      templateUrl: 'webcat/wc-stretch-button/wc-stretch-button.html',
      controller: Controller,
      bindings: {
        icon: '@'
      }
    });
}());
