(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (changes.fdRegisterCredentials) {
        if (angular.isUndefined(this.fdClick)) {
          this.dispatch(this.fdRegisterCredentials);
        } else {
          this.$class = 'hidden-input';
        }
      }
    }
    dispatch(credentials) {
      if (
        angular.isObject(credentials)
      ) {
        this.$firedux
          .register(credentials);
      }
    }
    $run() {
      if (this.fdClick) {
        this.dispatch(this.fdRegisterCredentials);
      }
    }
  }
  angular
    .module('firedux.fdRegister', [])
    .component('fdRegister', {
      controller: Controller,
      template: '<div ng-if="$ctrl.$class" ng-class="$ctrl.$class" ng-click="$ctrl.$run()"/>',
      bindings: {
        fdClick: '<',
        fdRegisterCredentials: '<'
      }
    });
}());
