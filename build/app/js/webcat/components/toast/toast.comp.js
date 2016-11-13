'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($mdToast) {
      _classCallCheck(this, Controller);

      this.$mdToast = $mdToast;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.wcToastMessage) {
          this.showToast(this.wcToastMessage);
        }
      }
    }, {
      key: 'showToast',
      value: function showToast(message) {
        if (angular.isString(message)) {
          this.$mdToast.showSimple(message);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcToast', []).component('wcToast', {
    controller: Controller,
    bindings: {
      wcToastMessage: '@'
    }
  });
})();
//# sourceMappingURL=toast.comp.js.map
