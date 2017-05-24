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
        changes.fdRefPaths ||
        changes.fdRefQuery ||
        changes.fdRefArray
      ) {
        this.$ready =
        this.$error =
        this.$before = undefined;
        if (this.fdRefPath) {
          this.updateRef(
            this.fdRefPath,
            this.fdRefQuery,
            this.fdRefArray
          );
        } else if (this.fdRefPaths) {
          this.updateRefs(this.fdRefPaths);
        }
      }
    }
    // UPDATE REFS
    updateRef(path, query, isArray) {
      this.$before = true;
      this.watchRef(path, query, snapshot => {
        this.resolveChanges(isArray ? this.getArray(snapshot, isArray) : snapshot.val());
      }, err => {
        this.error(err);
      });
    }
    updateRefs(paths) {
      if (angular.isArray(paths)) {
        Promise
          .all(
            this.getRefPromises(
              this.getRefDefinitions(paths)
            ))
          .then(results => {
            this.resolveChanges(results);
          });
      }
    }
    // CREATE REFS
    getRefDefinitions(paths) {
      let refs = [];
      angular.forEach(paths, path => {
        if (angular.isString(path)) {
          refs.push({
            ref: this.getRef(path),
            array: false
          });
        } else if (
          angular.isObject(path) &&
          angular.isString(path.path)
        ) {
          refs.push({
            ref: this.getRef(path.path),
            array: path.array
          });
        } else {
          console.error('The path object was incorrectly formatted: ', path);
        }
      });
      return refs;
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
          .orderByKey();
      } else if (query.orderByValue) {
        returnable = ref
          .orderByValue();
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
    // GET DATA
    getRefPromises(refs) {
      let promises;
      angular.forEach(refs, item => {
        promises.push(item
          .once('value')
          .then(snap => {
            return item.array ? this.getArray(snap, item.array) : snap.val();
          }));
      });
      return promises;
    }
    watchRef(path, query, then, err) {
      if (
        angular.isObject(this.ref) &&
        angular.isFunction(this.ref.off)
      ) {
        this.ref.off();
      }
      this.ref = this.getRef(path, query);
      this.ref.on('value', then, err);
    }
    // TRANSFORM DATA
    getArray(snapshot, arrayType) {
      let array = [];
      snapshot.forEach(childSnapshot => {
        if (arrayType === 'rich' && angular.isObject(childSnapshot.val())) {
          array.push(Object.assign({
            key: childSnapshot.key
          }, childSnapshot.val()));
        } else {
          array.push(childSnapshot.val());
        }
      });
      return array;
    }
    // HANDLE ERRORS
    error(err) {
      console.warn(err);
      this.$before = undefined;
      this.$error = err;
      this.catch({
        $error: err
      });
      this.$scope.$apply();
    }
    // FINAL OUTPUT
    resolveChanges($data) {
      this.$before = undefined;
      this.$ready = true;
      this.then({
        $data
      });
      this.$timeout(() => {
        this.$scope.$apply();
      });
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
        fdRefPaths: '<',
        fdRefQuery: '<',
        fdRefArray: '<',
        then: '&',
        catch: '&'
      }
    });
}());
