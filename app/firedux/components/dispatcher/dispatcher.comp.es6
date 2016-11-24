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
        this.$before = true;
        this.$ready = this.$error = undefined;
        this.$firedux.$apply();
        this.$firedux
          .dispatch(action)
          .then($data => {
            this.$ready = true;
            this.$before = undefined;
            this.$firedux.$apply();
            this.then({$data});
          })
          .catch($error => {
            this.$error = $error;
            this.$before = undefined;
            this.$firedux.$apply();
            this.catch({$error});
          });
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
      templateUrl: 'firedux/components/dispatcher/dispatcher.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdClick: '<',
        fdDispatcherAction: '<',
        then: '&',
        catch: '&'
      }
    });
}());
