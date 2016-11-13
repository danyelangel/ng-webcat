'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.stateParams = $firedux.stateParams;
    }

    _createClass(Controller, [{
      key: '$onInit',
      value: function $onInit() {
        this.then({
          $data: this.stateParams
        });
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcUiParams', []).component('wcUiParams', {
    controller: Controller,
    bindings: {
      then: '&'
    }
  });
})();
//# sourceMappingURL=ui-params.comp.js.map
