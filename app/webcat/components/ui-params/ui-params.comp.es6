(function () {
  'use strict';
  class Controller {
    constructor($firedux, $stateParams) {
      this.stateParams = Object.assign($firedux.stateParams, $stateParams);
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
