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
        this.$ready = false;
        this.timer = this.$timeout(() => {
          this.$before = false;
          this.$ready = true;
        }, this.fdTimeoutTime);
      }
    }
    $onDestroy() {
      this.$timeout.cancel(this.timer);
    }
  }
  angular
    .module('firedux.fdTimeout', [])
    .component('fdTimeout', {
      controller: Controller,
      templateUrl: 'firedux/components/timeout/timeout.html',
      transclude: {
        then: '?then',
        before: '?before'
      },
      bindings: {
        fdTimeoutTime: '<',
        then: '&'
      }
    });
}());
