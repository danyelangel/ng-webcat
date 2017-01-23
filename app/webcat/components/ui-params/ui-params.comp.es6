(function () {
  'use strict';
  class Controller {
    constructor($stateParams) {
      this.$stateParams = $stateParams;
    }
    $onChanges() {
      this.then({
        $data: this.$stateParams
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
