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
    .module('webcat.auth', [])
    .component('wcAuth', {
      template: '<ng-transclude ng-if="$ctrl.authData"></ng-transclude>',
      controller: Controller,
      transclude: true
    });
}());
