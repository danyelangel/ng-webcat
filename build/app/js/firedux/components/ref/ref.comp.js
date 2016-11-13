'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($scope, $firedux, $timeout) {
      _classCallCheck(this, Controller);

      this.$scope = $scope;
      this.$firedux = $firedux;
      this.$timeout = $timeout;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.fdRefPath || changes.fdRefQuery || changes.fdRefArray) {
          this.$ready = this.$error = this.$before = undefined;
          this.updateRef(this.fdRefPath, this.fdRefQuery, this.fdRefArray);
        }
      }
    }, {
      key: 'updateRef',
      value: function updateRef(path, query, isArray) {
        var _this = this;

        this.$before = true;
        if (angular.isObject(this.ref) && angular.isFunction(this.ref.off)) {
          this.ref.off();
        }
        this.ref = this.getRef(path, query);
        if (isArray === 'false') {
          isArray = false;
        }
        this.ref.on('value', function (snapshot) {
          _this.updateChanges(snapshot, isArray);
          _this.$timeout(function () {
            _this.$scope.$apply();
          });
        }, function (err) {
          _this.$before = undefined;
          _this.$error = err;
          _this['catch']({
            $error: err
          });
        });
      }
    }, {
      key: 'getRef',
      value: function getRef(path, query) {
        var ref = this.$firedux.ref(path);
        if (angular.isObject(query)) {
          ref = this.getSortedRef(query, ref);
          ref = this.getFilteredRef(query, ref);
        }
        return ref;
      }
    }, {
      key: 'getSortedRef',
      value: function getSortedRef() {
        var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var returnable = ref;
        if (query.orderByChild) {
          returnable = ref.orderByChild(query.orderByChild);
        } else if (query.orderByKey) {
          returnable = ref.orderByKey(query.orderByKey);
        } else if (query.orderByValue) {
          returnable = ref.orderByValue(query.orderByValue);
        }
        return returnable;
      }
    }, {
      key: 'getFilteredRef',
      value: function getFilteredRef() {
        var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var returnable = ref;
        if (query.limitToFirst) {
          returnable = ref.limitToFirst(query.limitToFirst);
        } else if (query.limitToLast) {
          returnable = ref.limitToLast(query.limitToLast);
        } else if (query.startAt) {
          returnable = ref.startAt(query.startAt);
        } else if (query.endAt) {
          returnable = ref.endAt(query.endAt);
        } else if (query.equalTo) {
          returnable = ref.equalTo(query.equalTo);
        }
        return returnable;
      }
    }, {
      key: 'updateChanges',
      value: function updateChanges(snapshot, isArray) {
        var array = [],
            $index = 0;
        if (isArray) {
          snapshot.forEach(function (childSnapshot) {
            array[$index] = childSnapshot.val();
            $index++;
          });
          this.$before = undefined;
          this.$ready = true;
          this.then({
            $data: array
          });
        } else {
          this.$before = undefined;
          this.$ready = true;
          this.then({
            $data: snapshot.val()
          });
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdRef', []).component('fdRef', {
    controller: Controller,
    templateUrl: 'firedux/components/ref/ref.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdRefPath: '@',
      fdRefQuery: '<',
      fdRefArray: '@',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=ref.comp.js.map
