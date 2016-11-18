(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
        changes.fdStatePath ||
        changes.fdStateQuery
      ) {
        this.getState(
          this.fdStatePath,
          this.fdStateQuery,
          this.fdStateArray
        );
      }
    }
    getState(path, query, isArray) {
      this.$path = this.$query = this.$isArray = undefined;
      if (angular.isString(path)) {
        this.$path = path;
      }
      if (angular.isObject(query)) {
        this.$query = query;
      }
      if (isArray) {
        this.$isArray = isArray;
      }
    }
    $then(data) {
      this.then({
        $data: data
      });
    }
    $catch(err) {
      this.catch({
        $error: err
      });
    }
  }
  angular
    .module('firedux.fdState', [])
    .component('fdState', {
      controller: Controller,
      templateUrl: 'firedux/components/state/state.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdStatePath: '@',
        fdStateQuery: '<',
        fdStateArray: '<',
        then: '&',
        catch: '&'
      }
    });
}());
