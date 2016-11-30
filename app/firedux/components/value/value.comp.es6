(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
      this.$firedux
        .val(this.fdValueId)
        .watch(newVal => {
          this.isInitialized = true;
          this.fdValueData = newVal;
          this.then({
            $data: this.fdValueData
          });
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
