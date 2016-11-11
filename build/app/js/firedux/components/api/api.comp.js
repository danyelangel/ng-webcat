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
        if (changes.fdApiEndpoint || changes.fdApiRequest || changes.fdApiQuery || changes.fdApiArray) {
          this.makeRequest();
        }
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest() {
        var endpoint = this.fdApiEndpoint,
            request = this.fdApiRequest,
            uid = this.$uid;
        if (angular.isString(endpoint) && angular.isDefined(request)) {
          if (angular.isObject(this.fdApiQuery)) {
            this.$query = this.fdApiQuery;
          }
          if (this.fdApiArray) {
            this.$isArray = true;
          }
          this.$path = 'api/' + uid + '/' + endpoint;
          this.$request = request;
          this.$before = true;
          this.$ready = this.$error = undefined;
        }
      }
    }, {
      key: '$then',
      value: function $then(data) {
        this.$ready = true;
        this.then({
          $data: data
        });
      }
    }, {
      key: '$catch',
      value: function $catch(err) {
        this.$error = true;
        this['catch']({
          $error: err
        });
      }
    }, {
      key: '$uid',
      get: function get() {
        return this.$firedux.UID;
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
      fdApiArray: '@',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=api.comp.js.map
