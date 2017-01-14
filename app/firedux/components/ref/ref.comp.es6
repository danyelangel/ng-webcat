(function () {
  'use strict';
  class Controller {
    constructor($scope, $firedux, $timeout) {
      this.$scope = $scope;
      this.$firedux = $firedux;
      this.$timeout = $timeout;
    }
    $onChanges(changes) {
      if (
        changes.fdRefPath ||
        changes.fdRefQuery ||
        changes.fdRefArray
      ) {
        this.$ready =
        this.$error =
        this.$before = undefined;
        this.updateRef(
          this.fdRefPath,
          this.fdRefQuery,
          this.fdRefArray
        );
      }
    }
    updateRef(path, query, isArray) {
      this.$before = true;
      if (
        angular.isObject(this.ref) &&
        angular.isFunction(this.ref.off)
      ) {
        this.ref.off();
      }
      this.ref = this.getRef(path, query);
      if (isArray === 'false') {
        isArray = false;
      }
      this.ref.on('value', snapshot => {
        this.updateChanges(snapshot, isArray);
        this.$timeout(() => {
          this.$scope.$apply();
        });
      }, err => {
        console.warn(err);
        this.$before = undefined;
        this.$error = err;
        this.catch({
          $error: err
        });
        this.$scope.$apply();
      });
    }
    getRef(path, query) {
      let ref = this.$firedux.ref(path);
      if (angular.isObject(query)) {
        ref = this.getSortedRef(query, ref);
        ref = this.getFilteredRef(query, ref);
      }
      return ref;
    }
    getSortedRef(query = {}, ref = {}) {
      let returnable = ref;
      if (query.orderByChild) {
        returnable = ref
          .orderByChild(query.orderByChild);
      } else if (query.orderByKey) {
        returnable = ref
          .orderByKey(query.orderByKey);
      } else if (query.orderByValue) {
        returnable = ref
          .orderByValue(query.orderByValue);
      }
      return returnable;
    }
    getFilteredRef(query = {}, ref = {}) {
      let returnable = ref;
      if (query.limitToFirst) {
        returnable = returnable
          .limitToFirst(query.limitToFirst);
      }
      if (query.limitToLast) {
        returnable = returnable
          .limitToLast(query.limitToLast);
      }
      if (query.startAt) {
        returnable = returnable
          .startAt(query.startAt);
      }
      if (query.endAt) {
        returnable = returnable
          .endAt(query.endAt);
      }
      if (angular.isDefined(query.equalTo)) {
        returnable = returnable
          .equalTo(query.equalTo);
      }
      return returnable;
    }
    updateChanges(snapshot, isArray) {
      let array = [],
          $index = 0;
      if (isArray) {
        snapshot.forEach(childSnapshot => {
          array[$index] = childSnapshot.val();
          $index++;
        });
        this.$before = undefined;
        this.$ready = true;
        this.then({
          $data: array
        });
      } else {
        this.$before = undefined;
        this.$ready = true;
        this.then({
          $data: snapshot.val()
        });
      }
    }
  }
  angular
    .module('firedux.fdRef', [])
    .component('fdRef', {
      controller: Controller,
      templateUrl: 'firedux/components/ref/ref.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdRefPath: '@',
        fdRefQuery: '<',
        fdRefArray: '<',
        then: '&',
        catch: '&'
      }
    });
}());
