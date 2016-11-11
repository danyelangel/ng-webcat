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
        if (changes.fdStatePath || changes.fdStateQuery) {
          this.getState(this.fdStatePath, this.fdStateQuery, this.fdStateArray);
        }
      }
    }, {
      key: 'getState',
      value: function getState(path, query, isArray) {
        this.$path = this.$query = this.$isArray = undefined;
        if (angular.isString(path)) {
          this.$path = path;
        }
        if (angular.isObject(query)) {
          this.$query = query;
        }
        if (isArray) {
          this.$isArray = isArray;
        }
      }
    }, {
      key: '$then',
      value: function $then(data) {
        this.then({
          $data: data
        });
      }
    }, {
      key: '$catch',
      value: function $catch(err) {
        this['catch']({
          $error: err
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdState', []).component('fdState', {
    controller: Controller,
    templateUrl: 'firedux/components/state/state.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdStatePath: '@',
      fdStateQuery: '<',
      fdStateArray: '@',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=state.comp.js.map
