'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux, $timeout) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
      this.$timeout = $timeout;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        var _this = this;

        if (changes.fdTimeoutTime) {
          this.$before = true;
          this.$ready = false;
          this.timer = this.$timeout(function () {
            _this.$before = false;
            _this.$ready = true;
          }, this.fdTimeoutTime);
        }
      }
    }, {
      key: '$onDestroy',
      value: function $onDestroy() {
        this.$timeout.cancel(this.timer);
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdTimeout', []).component('fdTimeout', {
    controller: Controller,
    templateUrl: 'firedux/components/timeout/timeout.html',
    transclude: {
      then: '?then',
      before: '?before'
    },
    bindings: {
      fdTimeoutTime: '<',
      then: '&'
    }
  });
})();
//# sourceMappingURL=timeout.comp.js.map
