(function () {
  'use strict';
  class Controller {
    constructor() {
      if (
        this.parentCtrl.current &&
        this.item === this.parentCtrl.current
      ) {
        this.display = true;
      } else {
        this.display = false;
      }
    }
  }
  angular
    .module('util.fdUtilSwitch.item', [])
    .directive('fdUtilSwitchItem', {
      controller: Controller,
      controllerAs: '$ctrl',
      templateUrl: 'util/component/switch/switch.html',
      transclude: true,
      require: '^?fdSwitch',
      scope: {
        item: '@'
      },
      link: function (scope, element, attrs, controllers) {
        scope.parentCtrl = controllers[0];
      }
    });
}());
