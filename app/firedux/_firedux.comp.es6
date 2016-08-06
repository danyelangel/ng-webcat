(function () {
  'use strict';
  class Controller {
    constructor($firebaseObject, $fireduxArray, $window, $timeout, Auth) {
      this.$firebaseObject = $firebaseObject;
      this.$fireduxArray = $fireduxArray;
      this.firebase = $window.firebase.database();
      this.$timeout = $timeout;
      this.Auth = Auth;
    }
    $onChanges(changes) {
      angular.forEach(changes, (value, key) => {
        switch (key) {
          case 'objectRef':
          case 'limitToLast':
          case 'equalTo':
          case 'orderBy':
          case 'arrayRef':
            this.createFb();
            break;
          default:
            break;
        }
      });
    }
    createFb() {
      let ref;
      if (angular.isString(this.arrayRef)) {
        ref = this.firebase.ref(this.arrayRef);
        if (angular.isString(this.orderBy) && this.orderBy.length > 0) {
          ref = ref.orderByChild(this.orderBy);
          if (angular.isString(this.equalTo)) {
            ref = ref.equalTo(this.equalTo);
          }
        }
        if (angular.isNumber(this.limitToLast)) {
          ref = ref.limitToLast(this.limitToLast);
        }
        this.destroyFb();
        this.ngfire = this.$fireduxArray(ref);
        this.watch();
      } else if (angular.isString(this.objectRef)) {
        ref = this.firebase.ref(this.objectRef);
        this.destroyFb();
        this.ngfire = this.$firebaseObject(ref);
        this.watch();
      }
    }
    watch() {
      this.ngfire.$loaded(() => {
        this.onReady({
          $data: this.ngfire
        });
        this.$timeout(() => {
          if (this.ngfire && this.ngfire.length === 0 && this.arrayRef && this.Auth.authData && !this.equalTo) {
            this.ngfire.$add({exists: true, $priority: 0}).then(ref => {
              this.ngfire.$remove(this.ngfire.$indexFor(ref.key));
            });
          }
        });
      });
      this.ngfire.$watch(() => {
        this.onData({
          $data: this.ngfire
        });
      });
    }
    destroyFb() {
      if (this.ngfire && this.ngfire.$destroy) {
        this.ngfire = undefined;
      }
    }
    $onDestroy() {
      if (this.removeOnDestroy && this.Auth.authData) {
        this.ngfire.$remove().then(() => {
          this.destroyFb();
        });
      } else {
        this.destroyFb();
      }
    }
  }
  angular
    .module('webcat.firedux')
    .component('firedux', {
      template: '<ng-transclude></ng-transclude>',
      transclude: true,
      controller: Controller,
      bindings: {
        // Firebase reference
        objectRef: '@',
        arrayRef: '@',
        // Data management
        onData: '&',
        onReady: '&',
        removeOnDestroy: '<',
        // Filters
        limitToLast: '<',
        equalTo: '<',
        orderBy: '@'
      }
    });
}());
