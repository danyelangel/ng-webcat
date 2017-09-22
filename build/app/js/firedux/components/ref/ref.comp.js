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
        if (changes.fdRefPath || changes.fdRefPaths || changes.fdRefQuery || changes.fdRefArray) {
          this.$ready = this.$error = this.$before = undefined;
          if (this.fdRefPath) {
            this.updateRef(this.fdRefPath, this.fdRefQuery, this.fdRefArray);
          } else if (this.fdRefPaths) {
            this.updateRefs(this.fdRefPaths);
          }
        }
      }

      // UPDATE REFS
    }, {
      key: 'updateRef',
      value: function updateRef(path, query, isArray) {
        var _this = this;

        this.$before = true;
        this.watchRef(path, query, function (snapshot) {
          _this.resolveChanges(isArray ? _this.getArray(snapshot, isArray) : snapshot.val());
        }, function (err) {
          _this.error(err);
        });
      }
    }, {
      key: 'updateRefs',
      value: function updateRefs(paths) {
        var _this2 = this;

        if (angular.isArray(paths)) {
          Promise.all(this.getRefPromises(this.getRefDefinitions(paths))).then(function (results) {
            _this2.resolveChanges(results);
          });
        }
      }

      // CREATE REFS
    }, {
      key: 'getRefDefinitions',
      value: function getRefDefinitions(paths) {
        var _this3 = this;

        var refs = [];
        angular.forEach(paths, function (path) {
          if (angular.isString(path)) {
            refs.push({
              ref: _this3.getRef(path),
              array: false
            });
          } else if (angular.isObject(path) && angular.isString(path.path)) {
            refs.push({
              ref: _this3.getRef(path.path),
              array: path.array
            });
          } else {
            console.error('The path object was incorrectly formatted: ', path);
          }
        });
        return refs;
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
          returnable = ref.orderByKey();
        } else if (query.orderByValue) {
          returnable = ref.orderByValue();
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
          returnable = returnable.limitToFirst(query.limitToFirst);
        }
        if (query.limitToLast) {
          returnable = returnable.limitToLast(query.limitToLast);
        }
        if (query.startAt) {
          returnable = returnable.startAt(query.startAt);
        }
        if (query.endAt) {
          returnable = returnable.endAt(query.endAt);
        }
        if (angular.isDefined(query.equalTo)) {
          returnable = returnable.equalTo(query.equalTo);
        }
        return returnable;
      }

      // GET DATA
    }, {
      key: 'getRefPromises',
      value: function getRefPromises(refs) {
        var _this4 = this;

        var promises = undefined;
        angular.forEach(refs, function (item) {
          promises.push(item.once('value').then(function (snap) {
            return item.array ? _this4.getArray(snap, item.array) : snap.val();
          }));
        });
        return promises;
      }
    }, {
      key: 'watchRef',
      value: function watchRef(path, query, then, err) {
        if (angular.isObject(this.ref) && angular.isFunction(this.ref.off)) {
          this.ref.off();
        }
        this.ref = this.getRef(path, query);
        this.ref.on('value', then, err);
      }

      // TRANSFORM DATA
    }, {
      key: 'getArray',
      value: function getArray(snapshot, arrayType) {
        var array = [];
        snapshot.forEach(function (childSnapshot) {
          if (arrayType === 'rich' && angular.isObject(childSnapshot.val())) {
            array.push(Object.assign({
              key: childSnapshot.key
            }, childSnapshot.val()));
          } else if (arrayType === 'rich' && !angular.isObject(childSnapshot.val())) {
            array.push({
              key: childSnapshot.key,
              value: childSnapshot.val()
            });
          } else {
            array.push(childSnapshot.val());
          }
        });
        return array;
      }

      // HANDLE ERRORS
    }, {
      key: 'error',
      value: function error(err) {
        console.warn(err);
        this.$before = undefined;
        this.$error = err;
        this['catch']({
          $error: err
        });
        this.$scope.$apply();
      }

      // FINAL OUTPUT
    }, {
      key: 'resolveChanges',
      value: function resolveChanges($data) {
        var _this5 = this;

        this.$before = undefined;
        this.$ready = true;
        this.then({
          $data: $data
        });
        this.$timeout(function () {
          _this5.$scope.$apply();
        });
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
      fdRefPaths: '<',
      fdRefQuery: '<',
      fdRefArray: '@',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=ref.comp.js.map
