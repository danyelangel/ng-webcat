'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($state, $firedux) {
      _classCallCheck(this, Controller);

      this.$state = $state;
      this.$firedux = $firedux;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.wcUiRedirectSref || changes.wcUiRedirectParams) {
          this.redirect(this.wcUiRedirectSref, this.wcUiRedirectParams);
        }
      }
    }, {
      key: 'redirect',
      value: function redirect(state, params) {
        if (angular.isString(state)) {
          if (params) {
            this.$firedux.setParams(params);
          }
          this.$state.go(state);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcUiRedirect', []).component('wcUiRedirect', {
    controller: Controller,
    bindings: {
      wcUiRedirectSref: '@',
      wcUiRedirectParams: '<'
    }
  });
})();
//# sourceMappingURL=ui-redirect.comp.js.map
