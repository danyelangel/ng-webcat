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

        this.$before = true;
        this.$firedux.waitForAuth().then(function (authData) {
          _this.$ready = true;
          _this.$before = undefined;
          _this.then({
            $data: authData
          });
        })['catch'](function () {
          _this.$error = true;
          _this.$before = undefined;
          _this['catch']();
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdAuth', []).component('fdAuth', {
    controller: Controller,
    templateUrl: 'firedux/components/auth/auth.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=auth.comp.js.map
