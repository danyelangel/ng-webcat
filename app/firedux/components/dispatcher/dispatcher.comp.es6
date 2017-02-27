(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges() {
      if (this.fdDispatcherAction) {
        if (angular.isUndefined(this.fdClick)) {
          this.dispatch(this.fdDispatcherAction);
        } else {
          this.$class = 'hidden-input';
          console.error('fd-dispatcher:fd-click is being deprecated. Please make sure to change your implementation.');
        }
      } else if (this.fdDispatcherActions) {
        this.dispatchAll(this.fdDispatcherActions);
      }
    }
    dispatch(action) {
      if (
        angular.isObject(action) &&
        angular.isString(action.type)
      ) {
        if (!this.$before) {
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
    }
    dispatchAll(actions) {
      if (
        angular.isArray(actions)
      ) {
        let valid = true;
        angular.forEach(actions, action => {
          if (!(
            angular.isObject(action) && angular.isString(action.type)
          )) {
            valid = false;
          }
        });
        if (!this.$before && valid) {
          this.$before = true;
          this.$ready = this.$error = undefined;
          this.$firedux.$apply();
          this.$firedux.dispatchGroup(actions)
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
        fdDispatcherActions: '<',
        then: '&',
        catch: '&'
      }
    });
}());
