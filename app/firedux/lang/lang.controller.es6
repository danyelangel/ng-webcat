(function () {
  'use strict';

  class Controller {
    constructor($stateParams) {
      let vm = this;
      vm.$stateParams = $stateParams;
    }
    get lang() {
      let vm = this;
      return vm.$stateParams.lang;
    }
  }
  angular
    .module('firedux.lang', [])
    .controller('Lang.Ctrl', Controller);
}());
