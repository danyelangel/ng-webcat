(function () {
  'use strict';
  class Controller {
    constructor($stateParams, $scope) {
      this.$stateParams = $stateParams;
      $scope.$watch(() => {
        return this.$stateParams;
      }, $data => {
        this.then({$data});
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
