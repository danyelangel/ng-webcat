(function () {
  'use strict';
  class Controller {
    constructor($firedux, $stateParams) {
      this.$stateParams = $stateParams;
      this.$firedux = $firedux;
    }
    $onChanges() {
      let stateParams = Object.assign(this.$firedux.stateParams || {}, this.$stateParams || {});
      this.then({
        $data: stateParams
      });
    }
  }
  angular
    .module('webcat.wcUiParams', [])
    .component('wcUiParams', {
      controller: Controller,
      bindings: {
        then: '&'
      }
    });
}());
