(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.stateParams = $firedux.stateParams;
    }
    $onInit() {
      this.onUiParams({
        $data: this.stateParams
      });
    }
  }
  angular
    .module('webcat.wcUiParams', [])
    .component('wcUiParams', {
      controller: Controller,
      bindings: {
        onUiParams: '&'
      }
    });
}());
