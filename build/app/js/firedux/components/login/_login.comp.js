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
        var method = 'popup';
        this.$ready = this.$error = undefined;
        if (changes.fdLoginProvider || changes.fdLoginCredentials) {
          if (this.fdLoginRedirect) {
            method = 'redirect';
          }
          this.login(this.fdLoginProvider, this.fdLoginCredentials, method);
        }
      }
    }, {
      key: 'login',
      value: function login(provider, credentials, method) {
        var _this = this;

        this.$before = true;
        this.$firedux.login(provider, credentials, method).then(function (authData) {
          _this.$ready = true;
          _this.$before = undefined;
          _this.$firedux.$apply();
          _this.then({
            $data: authData
          });
        })['catch'](function (error) {
          _this.$error = error;
          _this.$before = undefined;
          _this.$firedux.$apply();
          _this['catch']({
            $error: error
          });
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdLogin', []).component('fdLogin', {
    controller: Controller,
    templateUrl: 'firedux/components/login/_login.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdLoginProvider: '@',
      fdLoginCredentials: '<',
      fdLoginRedirect: '<',
      fdLoginPopup: '<',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=_login.comp.js.map
