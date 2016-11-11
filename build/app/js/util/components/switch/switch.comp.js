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
        this.$then = this.$catch = this.$before = undefined;
        if (changes.promise) {
          this.unwrap(this.promise);
        } else if (changes['if']) {
          this.validate(this['if']);
        }
      }
    }, {
      key: 'validate',
      value: function validate(condition) {
        if (condition) {
          this.$then = true;
        } else {
          this.$catch = true;
        }
      }
    }, {
      key: 'unwrap',
      value: function unwrap(promise) {
        var _this = this;

        this.$before = true;
        promise.then(function ($data) {
          _this.$then = true;
          _this.then({
            $data: $data
          });
        })['catch'](function ($error) {
          _this.$catch = true;
          _this['catch']({
            $error: $error
          });
        });
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.utilSwitch', ['webcat.utilSwitch.item']).component('fdUtilSwitch', {
    controller: Controller,
    templateUrl: 'util/components/switch/switch.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch',
      array: '?array'
    },
    bindings: {
      promise: '<',
      'if': '<',
      current: '@',
      before: '&',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=switch.comp.js.map
