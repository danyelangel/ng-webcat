(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (changes.fdDispatcherAction) {
        if (angular.isUndefined(this.fdClick)) {
          this.dispatch(this.fdDispatcherAction);
        } else {
          this.$class = 'hidden-input';
        }
      }
    }
    dispatch(action) {
      if (
        angular.isObject(action) &&
        angular.isString(action.type)
      ) {
        this.$firedux
          .dispatch(action);
      }
    }
    $run() {
      if (this.fdClick) {
        this.dispatch(this.fdDispatcherAction);
      }
    }
  }
  angular
    .module('firedux.fdDispatcher', [])
    .component('fdDispatcher', {
      controller: Controller,
      template: '<div ng-if="$ctrl.$class" ng-class="$ctrl.$class" ng-click="$ctrl.$run()"/>',
      bindings: {
        fdClick: '<',
        fdDispatcherAction: '<'
      }
    });
}());
