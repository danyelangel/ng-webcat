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
      value: function $onChanges() {
        if (this.fdDispatcherAction) {
          if (angular.isUndefined(this.fdClick)) {
            this.dispatch(this.fdDispatcherAction);
          } else {
            this.$class = 'hidden-input';
            console.error('fd-dispatcher:fd-click is being deprecated. Please make sure to change your implementation.');
          }
        } else if (this.fdDispatcherActions) {
          this.dispatchAll(this.fdDispatcherActions);
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(action) {
        var _this = this;

        if (angular.isObject(action) && angular.isString(action.type)) {
          if (!this.$before) {
            this.$before = true;
            this.$ready = this.$error = undefined;
            this.$firedux.$apply();
            this.$firedux.dispatch(action).then(function ($data) {
              _this.$ready = true;
              _this.$before = undefined;
              _this.$firedux.$apply();
              _this.then({ $data: $data });
            })['catch'](function ($error) {
              _this.$error = $error;
              _this.$before = undefined;
              _this.$firedux.$apply();
              _this['catch']({ $error: $error });
            });
          }
        }
      }
    }, {
      key: 'dispatchAll',
      value: function dispatchAll(actions) {
        var _this2 = this;

        if (angular.isArray(actions)) {
          var valid = true;
          angular.forEach(actions, function (action) {
            if (!(angular.isObject(action) && angular.isString(action.type))) {
              valid = false;
            }
          });
          if (!this.$before && valid) {
            this.$before = true;
            this.$ready = this.$error = undefined;
            this.$firedux.$apply();
            this.$firedux.dispatchGroup(actions).then(function ($data) {
              _this2.$ready = true;
              _this2.$before = undefined;
              _this2.$firedux.$apply();
              _this2.then({ $data: $data });
            })['catch'](function ($error) {
              _this2.$error = $error;
              _this2.$before = undefined;
              _this2.$firedux.$apply();
              _this2['catch']({ $error: $error });
            });
          }
        }
      }
    }, {
      key: '$run',
      value: function $run() {
        if (this.fdClick) {
          this.dispatch(this.fdDispatcherAction);
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdDispatcher', []).component('fdDispatcher', {
    controller: Controller,
    templateUrl: 'firedux/components/dispatcher/dispatcher.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdClick: '<',
      fdDispatcherAction: '<',
      fdDispatcherActions: '<',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=dispatcher.comp.js.map
