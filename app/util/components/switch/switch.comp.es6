(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      this.$then =
      this.$catch =
      this.$before = undefined;
      if (changes.promise) {
        this.unwrap(this.promise);
      } else if (changes.if) {
        this.validate(this.if);
      }
    }
    validate(condition) {
      if (condition) {
        this.$then = true;
      } else {
        this.$catch = true;
      }
    }
    unwrap(promise) {
      this.$before = true;
      promise
        .then($data => {
          this.$then = true;
          this.then({
            $data: $data
          });
        })
        .catch($error => {
          this.$catch = true;
          this.catch({
            $error: $error
          });
        });
    }
  }
  angular
    .module('webcat.utilSwitch', [
      'webcat.utilSwitch.item'
    ])
    .component('fdUtilSwitch', {
      controller: Controller,
      templateUrl: 'util/components/switch/switch.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch',
        array: '?array'
      },
      bindings: {
        promise: '<',
        if: '<',
        current: '@',
        before: '&',
        then: '&',
        catch: '&'
      }
    });
}());
