(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.stateParams = $firedux.stateParams;
    }
    $onInit() {
      this.then({
        $data: this.stateParams
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
