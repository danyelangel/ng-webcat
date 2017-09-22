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
        if (changes.fdRegisterCredentials) {
          if (angular.isUndefined(this.fdClick)) {
            this.dispatch(this.fdRegisterCredentials);
          } else {
            this.$class = 'hidden-input';
          }
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(credentials) {
        if (angular.isObject(credentials)) {
          this.$firedux.register(credentials);
        }
      }
    }, {
      key: '$run',
      value: function $run() {
        if (this.fdClick) {
          this.dispatch(this.fdRegisterCredentials);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdRegister', []).component('fdRegister', {
    controller: Controller,
    template: '<div ng-if="$ctrl.$class" ng-class="$ctrl.$class" ng-click="$ctrl.$run()"/>',
    bindings: {
      fdClick: '<',
      fdRegisterCredentials: '<'
    }
  });
})();
//# sourceMappingURL=register.comp.js.map
