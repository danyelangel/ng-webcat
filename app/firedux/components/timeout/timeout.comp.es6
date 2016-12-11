(function () {
  'use strict';
  class Controller {
    constructor($firedux, $timeout) {
      this.$firedux = $firedux;
      this.$timeout = $timeout;
    }
    $onChanges(changes) {
      if (changes.fdTimeoutTime) {
        this.$before = true;
        this.$then = false;
        this.$timeout(() => {
          this.$before = false;
          this.$then = true;
        }, parseInt(this.fdTimeoutTime, 10));
      }
    }
  }
  angular
    .module('firedux.fdTimeout', [])
    .component('fdTimeout', {
      controller: Controller,
      templateUrl: 'firedux/components/timeout/timeout.html',
      transclude: {
        then: '?then'
      },
      bindings: {
        fdTimeoutTime: '<',
        then: '&'
      }
    });
}());
