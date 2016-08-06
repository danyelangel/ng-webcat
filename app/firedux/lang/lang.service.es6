(function () {
  'use strict';

  class Service {
    constructor($stateParams) {
      this.$stateParams = $stateParams;
    }
    get lang() {
      return this.$stateParams.lang;
    }
  }
  angular
    .module('firedux.lang')
    .service('Lang', Service);
}());
