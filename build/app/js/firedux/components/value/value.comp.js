'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
    }

    _createClass(Controller, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$firedux.val(this.fdValueId).watch(function (newVal) {
          if (angular.isDefined(newVal)) {
            _this.then({
              $data: newVal
            });
          }
          _this.isInitialized = true;
        });
      }
    }, {
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.fdValueData && this.isInitialized) {
          this.$firedux.val(this.fdValueId).set(this.fdValueData);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdValue', []).component('fdValue', {
    controller: Controller,
    bindings: {
      fdValueId: '@',
      fdValueData: '<',
      then: '&'
    }
  });
})();
//# sourceMappingURL=value.comp.js.map
