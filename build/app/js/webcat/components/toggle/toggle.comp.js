'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller() {
      _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
      key: 'changeItem',
      value: function changeItem($index) {
        this.wcToggleSelected = $index;
        this.onToggleChange({
          $index: $index,
          $data: this.wcToggleItems[$index]
        });
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcToggle', []).component('wcToggle', {
    controller: Controller,
    templateUrl: 'webcat/components/toggle/toggle.html',
    bindings: {
      wcToggleSelected: '<',
      wcToggleItems: '<',
      onToggleChange: '&'
    }
  });
})();
//# sourceMappingURL=toggle.comp.js.map
