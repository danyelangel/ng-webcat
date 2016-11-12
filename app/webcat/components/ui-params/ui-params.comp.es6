(function () {
  'use strict';
  class Controller {
    constructor($stateParams) {
      this.$stateParams = $stateParams;
    }
    $onInit() {
      this.onUiParams(this.$stateParams);
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
