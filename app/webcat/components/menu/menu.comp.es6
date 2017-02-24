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
    .module('webcat.wcMenu', [])
    .component('wcMenu', {
      templateUrl: 'webcat/components/menu/menu.html',
      controller: Controller,
      transclude: true,
      bindings: {
        wcWidth: '@',
        wcIcon: '@',
        wcPosition: '@',
        wcMarginTop: '@',
        wcAlign: '@'
      }
    });
}());
