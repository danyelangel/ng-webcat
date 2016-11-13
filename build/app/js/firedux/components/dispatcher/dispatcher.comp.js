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
        if (changes.fdDispatcherAction) {
          this.dispatch(this.fdDispatcherAction);
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(action) {
        if (angular.isObject(action) && angular.isString(action.type)) {
          this.$firedux.dispatch(action);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdDispatcher', []).component('fdDispatcher', {
    controller: Controller,
    bindings: {
      fdDispatcherAction: '<'
    }
  });
})();
//# sourceMappingURL=dispatcher.comp.js.map
