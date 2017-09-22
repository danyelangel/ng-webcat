'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($state, $firedux, $window) {
      _classCallCheck(this, Controller);

      this.$state = $state;
      this.$firedux = $firedux;
      this.$window = $window;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (this.wcUiRedirectBack) {
          this.$window.history.back();
        } else if (changes.wcUiRedirectSref || changes.wcUiRedirectParams) {
          this.redirect(this.wcUiRedirectSref, this.wcUiRedirectParams, this.wcUiReload);
        } else if (changes.wcUiReload) {
          this.$state.reload();
        }
      }
    }, {
      key: 'redirect',
      value: function redirect(state, params) {
        if (angular.isString(state)) {
          this.$state.go(state, params, {
            location: this.wcUiReplace ? 'replace' : this.getLocation(),
            reload: this.wcUiReload ? true : false
          });
        }
      }
    }, {
      key: 'getLocation',
      value: function getLocation() {
        return angular.isUndefined(this.wcUiLocation) ? true : this.wcUiLocation;
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcUiRedirect', []).component('wcUiRedirect', {
    controller: Controller,
    bindings: {
      wcUiRedirectBack: '@',
      wcUiRedirectSref: '@',
      wcUiRedirectParams: '<',
      wcUiLocation: '<',
      wcUiReplace: '@',
      wcUiReload: '@'
    }
  });
})();
//# sourceMappingURL=ui-redirect.comp.js.map
