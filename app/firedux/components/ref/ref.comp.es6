(function () {
  'use strict';
  class Controller {
    constructor($scope, $firedux) {
      this.$scope = $scope;
      this.$firedux = $firedux;
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
      if (isArray !== 'false') {
        isArray = false;
      }
      this.ref.on('value', snapshot => {
        this.updateChanges(snapshot, isArray);
        this.$scope.$apply();
      }, err => {
        this.$before = undefined;
        this.$error = err;
        this.catch({
          $error: err
        });
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
        returnable = ref
          .limitToFirst(query.limitToFirst);
      } else if (query.limitToLast) {
        returnable = ref
          .limitToLast(query.limitToLast);
      } else if (query.startAt) {
        returnable = ref
          .startAt(query.startAt);
      } else if (query.endAt) {
        returnable = ref
          .endAt(query.endAt);
      } else if (query.equalTo) {
        returnable = ref
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
        fdRefArray: '@',
        then: '&',
        catch: '&'
      }
    });
}());
