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
    .module('webcat.settings', [])
    .component('wcSettings', {
      templateUrl: 'webcat/wc-settings/wc-settings.html',
      controller: Controller,
      transclude: true,
      bindings: {
        width: '@',
        icon: '@',
        position: '@',
        marginTop: '@',
        align: '@'
      }
    });
}());
