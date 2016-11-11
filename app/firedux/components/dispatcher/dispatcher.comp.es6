(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (changes.fdDispatcherAction) {
        this.dispatch(this.fdDispatcherAction);
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
  }
  angular
    .module('firedux.fdDispatcher', [])
    .component('fdDispatcher', {
      controller: Controller,
      bindings: {
        fdDispatcherAction: '<'
      }
    });
}());
