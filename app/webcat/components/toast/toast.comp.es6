(function () {
  'use strict';
  class Controller {
    constructor($mdToast) {
      this.$mdToast = $mdToast;
    }
    $onChanges(changes) {
      if (changes.wcToastMessage) {
        this.showToast(this.wcToastMessage);
      }
    }
    showToast(message) {
      if (angular.isString(message)) {
        this.$mdToast.show(
          this.$mdToast.simple({
            textContent: message,
            position: 'top right'
          }));
      }
    }
  }
  angular
    .module('webcat.wcToast', [])
    .component('wcToast', {
      controller: Controller,
      bindings: {
        wcToastMessage: '@'
      }
    });
}());
