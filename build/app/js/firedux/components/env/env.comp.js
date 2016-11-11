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
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.fdEnvConstant) {
          this.getConstant(this.fdEnvConstant, this.fdEnvArray);
        }
      }
    }, {
      key: 'getConstant',
      value: function getConstant(constant, array) {
        if (angular.isString(constant)) {
          this.$ref = 'app/constants/' + constant;
        }
        if (angular.isDefined(array)) {
          this.$array = true;
        }
      }
    }, {
      key: '$then',
      value: function $then($data) {
        this.then({
          $data: $data
        });
      }
    }, {
      key: '$catch',
      value: function $catch($errors) {
        this.then({
          $errors: $errors
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdEnv', []).component('fdEnv', {
    controller: Controller,
    templateUrl: 'firedux/components/env/env.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdEnvConstant: '<',
      fdEnvArray: '@',
      before: '&',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=env.comp.js.map
