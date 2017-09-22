'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = function Controller() {
    _classCallCheck(this, Controller);

    if (this.parentCtrl.current && this.item === this.parentCtrl.current) {
      this.display = true;
    } else {
      this.display = false;
    }
  };

  angular.module('util.fdUtilSwitch.item', []).directive('fdUtilSwitchItem', {
    controller: Controller,
    controllerAs: '$ctrl',
    templateUrl: 'util/component/switch/switch.html',
    transclude: true,
    require: '^?fdSwitch',
    scope: {
      item: '@'
    },
    link: function link(scope, element, attrs, controllers) {
      scope.parentCtrl = controllers[0];
    }
  });
})();
//# sourceMappingURL=switch-item.comp.js.map
