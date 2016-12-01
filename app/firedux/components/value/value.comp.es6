(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$firedux
        .val(this.fdValueId)
        .watch(newVal => {
          if (newVal) {
            this.then({
              $data: newVal
            });
          }
          this.isInitialized = true;
        });
    }
    $onChanges(changes) {
      if (changes.fdValueData && this.isInitialized) {
        this.$firedux
          .val(this.fdValueId)
          .set(this.fdValueData);
      }
    }
  }
  angular
    .module('firedux.fdValue', [])
    .component('fdValue', {
      controller: Controller,
      bindings: {
        fdValueId: '@',
        fdValueData: '<',
        then: '&'
      }
    });
}());
