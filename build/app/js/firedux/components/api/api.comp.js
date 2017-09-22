'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
      this.$uid = this.$firedux['var']('UID');
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.fdApiEndpoint || changes.fdApiRequest || changes.fdApiArray) {
          this.makeRequest();
        }
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest() {
        var _this = this;

        var endpoint = this.fdApiEndpoint,
            request = this.fdApiRequest,
            uid = this.$uid;
        if (angular.isString(endpoint) && angular.isDefined(request)) {
          this.$isArray = this.fdApiArray;
          this.$path = null;
          this.$firedux.$apply();
          this.$path = 'api/' + endpoint + '/' + uid;
          this.$request = {
            request: request,
            timestamp: this.$firedux['var']('TIMESTAMP')
          };
          this.$before = true;
          this.$ready = this.$error = undefined;
          this.before({
            $promise: new Promise(function (resolve, reject) {
              _this.resolve = resolve;
              _this.reject = reject;
            })
          });
        }
      }
    }, {
      key: '$then',
      value: function $then(data) {
        this.resolve(data);
        this.$ready = true;
        this.$before = false;
        this.then({
          $data: data
        });
      }
    }, {
      key: '$catch',
      value: function $catch(err) {
        this.reject(err);
        this.$error = true;
        this.$before = false;
        this['catch']({
          $error: err
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdApi', []).component('fdApi', {
    controller: Controller,
    templateUrl: 'firedux/components/api/api.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdApiEndpoint: '@',
      fdApiRequest: '<',
      fdApiArray: '<',
      then: '&',
      'catch': '&',
      before: '&'
    }
  });
})();
//# sourceMappingURL=api.comp.js.map
