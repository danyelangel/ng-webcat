'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ValueObserver = (function () {
    function ValueObserver() {
      _classCallCheck(this, ValueObserver);

      this.callbacks = [];
    }

    _createClass(ValueObserver, [{
      key: 'set',
      value: function set(data) {
        var _this = this;

        this.data = data;
        angular.forEach(this.callbacks, function (callback) {
          callback(_this.data);
        });
      }
    }, {
      key: 'get',
      value: function get() {
        return this.data;
      }
    }, {
      key: 'watch',
      value: function watch(callback) {
        var _this2 = this;

        this.callbacks.push(callback);
        callback(this.data);
        return function () {
          var index = _this2.callbacks.indexOf(callback);
          _this2.callbacks.splice(index, 1);
        };
      }
    }]);

    return ValueObserver;
  })();

  var Service = (function () {
    function Service($window, $document, $fireduxAuth, $fireduxAnalytics, $fireduxStorage, $timeout, $rootScope) {
      _classCallCheck(this, Service);

      this.$window = $window;
      this.$document = $document;
      this.firebase = $window.firebase;
      this.$fireduxAuth = $fireduxAuth;
      this.$fireduxAnalytics = $fireduxAnalytics;
      this.$fireduxStorage = $fireduxStorage;
      this.reducers = [];
      this.$scope = $rootScope;
      this.$timeout = $timeout;
      this.isDispatching = {};
      this.vals = {};
    }

    // Initialization

    _createClass(Service, [{
      key: 'init',
      value: function init(params, analytics, pixel) {
        this.onlyRedirect = params.redirect;
        if (angular.isObject(params) && angular.isObject(params.config) && angular.isString(params.config.apiKey)) {
          this.firebase.initializeApp(params.config);
          this.initialize(params.config, params.base);
          this.$fireduxAnalytics.init(params.analytics, params.pixel);
          this.val('PROJECT_ID').set(params.config.authDomain.split('.')[0]);
        } else if (angular.isObject(params) && angular.isString(params.apiKey)) {
          console.warn('$firedux.initialize(firebaseConfig) is being deprecated. Please use $firedux.initialize({config: firebaseConfig})');
          this.firebase.initializeApp(params);
          this.initialize(params);
          this.$fireduxAnalytics.init(analytics, pixel);
        }
      }
    }, {
      key: 'initialize',
      value: function initialize(params) {
        var _this3 = this;

        var base = arguments.length <= 1 || arguments[1] === undefined ? '/' : arguments[1];

        this.refBase = base;
        this.val('PROJECT_ID').set(params.authDomain.split('.')[0]);
        this.hasInitialized = true;
        this.$fireduxAuth.init(this.firebase);
        this.database = this.firebase.database;
        this.projectUrl = params.storageBucket;
        this.waitForAuth(function (authData) {
          if (authData) {
            _this3.ref('users').child(authData.uid).on('value', function (snap) {
              _this3.user = snap.val();
            });
          }
        });
      }

      // Constants
    }, {
      key: 'var',
      value: function _var(variable) {
        switch (variable) {
          case 'UID':
            return this.UID;
          case 'TIMESTAMP':
            return this.TIMESTAMP;
          default:
            return null;
        }
      }
    }, {
      key: 'val',

      // ValueObserver
      value: function val(valId) {
        if (!this.vals[valId]) {
          this.vals[valId] = new ValueObserver();
        }
        return this.vals[valId];
      }

      // Analytics
    }, {
      key: 'analytics',
      value: function analytics() {
        return this.$fireduxAnalytics;
      }

      // Database
    }, {
      key: 'ref',
      value: function ref() {
        var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

        return this.database().ref(this.refBase).child(path);
      }
    }, {
      key: 'api',
      value: function api(endpoint) {
        var _this4 = this;

        return {
          call: function call(request) {
            var UID = _this4.UID;
            return _this4.ref('api').child(endpoint).child(UID).set({
              request: request,
              timestamp: _this4.TIMESTAMP
            }).then(function () {
              return new Promise(function (resolve, reject) {
                _this4.ref('api').child(endpoint).child(UID).child('response').on('value', function (response) {
                  _this4.$timeout(function () {
                    reject('API timed out');
                  }, 10000);
                  if (response) {
                    _this4.ref('api').child(endpoint).child(UID).child('response').off();
                    _this4.ref('api').child(endpoint).child(UID).set(null);
                    resolve(response.val());
                  }
                });
              });
            });
          }
        };
      }
    }, {
      key: 'parseArray',
      value: function parseArray(array) {
        var _this5 = this;

        var returnable = {};
        if (angular.isArray(array)) {
          angular.forEach(array, function (item) {
            returnable[_this5.UID] = item;
          });
        }
        return returnable;
      }

      // Storage
    }, {
      key: 'storage',
      value: function storage() {
        return this.$fireduxStorage;
      }
    }, {
      key: 'storageRef',
      value: function storageRef(path) {
        return this.storage().ref(path);
      }

      // Redux
    }, {
      key: 'reducer',
      value: function reducer(params) {
        if (angular.isString(params.trigger) && angular.isFunction(params.reducer)) {
          if (this.reducers[params.trigger]) {
            throw new Error('Couldn\'t register reducer. Make sure all params are set up correctly.');
          } else {
            return this.registerReducer(params);
          }
          this.registerReducer(params);
        } else {
          throw new Error('Couldn\'t register reducer. Make sure all params are set up correctly.');
        }
      }
    }, {
      key: 'registerReducer',
      value: function registerReducer(params) {
        this.reducers[params.trigger] = params.reducer;
      }
    }, {
      key: 'dispatch',
      value: function dispatch(action) {
        var _this6 = this;

        var log = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        return new Promise(function (resolve, reject) {
          if (!_this6.isDispatching[action.type]) {
            _this6.isDispatching[action.type] = true;
            if (angular.isDefined(_this6.reducers[action.type])) {
              if (log) {
                console.groupCollapsed('' + action.type);
                console.log(action);
              }
              try {
                _this6.reducers[action.type](action, _this6).then(function (payload) {
                  if (log) {
                    console.log('Reducer resolved');
                    console.groupEnd();
                  }
                  _this6.$scope.$emit('fd:action', action.type);
                  _this6.isDispatching[action.type] = false;
                  resolve(payload);
                })['catch'](function (err) {
                  err = err || 'UNDEFINED ERROR';
                  if (log) {
                    console.groupEnd();
                    console.warn('Reducer ' + action.type + ' threw this error: ', err);
                  }
                  _this6.isDispatching[action.type] = false;
                  _this6.$scope.$emit('fd:error', action.type + ': ' + err);
                  reject(err);
                });
              } catch (err) {
                _this6.isDispatching[action.type] = false;
                if (log) {
                  console.groupEnd();
                }
                _this6.$scope.$emit('fd:error', action.type + ': ' + err);
                if (log) {
                  console.warn('Reducer ' + action.type + ' threw this synchronous error: ', err);
                }
                reject(err);
              }
            } else {
              _this6.isDispatching[action.type] = false;
              if (log) {
                console.warn('Reducer ' + action.type + ' is not registered');
              }
              reject('Reducer ' + action.type + ' is not registered');
            }
          } else {
            _this6.isDispatching[action.type] = false;
            if (log) {
              console.warn('Firedux is already dispatching this action: ' + action.type);
            }
            reject('Firedux is already dispatching this action: ' + action.type);
          }
        });
      }
    }, {
      key: 'dispatchGroup',
      value: function dispatchGroup(actions) {
        var _this7 = this;

        var log = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var promises = [],
            promiseTypes = '';
        angular.forEach(actions, function (action) {
          promiseTypes = promiseTypes + ', ' + action.type;
          promises.push(_this7.dispatch(action, false));
        });
        if (log) {
          console.groupCollapsed('' + promiseTypes);
          angular.forEach(actions, function (action) {
            console.log(action);
          });
        }
        return Promise.all(promises).then(function () {
          if (log) {
            console.log('All reducers resolved');
            console.groupEnd();
          }
        })['catch'](function (err) {
          err = err || 'UNDEFINED ERROR';
          if (log) {
            console.groupEnd();
            console.warn('One reducer threw this error: ', err);
          }
        });
      }

      // Auth
    }, {
      key: 'waitForAuth',
      value: function waitForAuth(success, error) {
        return this.$fireduxAuth.waitForAuth(success, error);
      }
    }, {
      key: 'register',
      value: function register(credentials) {
        var _this8 = this;

        return this.$fireduxAuth.register(credentials).then(function () {
          return _this8.login('email', credentials);
        });
      }
    }, {
      key: 'login',
      value: function login(provider, credentials, method) {
        var loginPromise = undefined,
            providerService = undefined;
        switch (provider) {
          case 'email':
            loginPromise = this.$fireduxAuth.signInWithEmailAndPassword(credentials);
            break;
          case 'anonymous':
            loginPromise = this.$fireduxAuth.signInAnonymously();
            break;
          case 'facebook':
            providerService = this.$fireduxAuth.getProvider('facebook');
            break;
          case 'google':
            providerService = this.$fireduxAuth.getProvider('google');
            break;
          case 'twitter':
            providerService = this.$fireduxAuth.getProvider('twitter');
            break;
          default:
            loginPromise = Promise.reject();
            break;
        }
        if (providerService) {
          switch (this.onlyRedirect ? 'redirect' : method) {
            case 'popup':
              loginPromise = this.$fireduxAuth.signInWithPopup(providerService);
              break;
            case 'redirect':
              loginPromise = this.$fireduxAuth.signInWithRedirect(providerService);
              break;
            default:
              break;
          }
        }
        return loginPromise;
      }
    }, {
      key: 'link',
      value: function link(provider, credentials, method) {
        var linkPromise = undefined,
            providerService = undefined;
        switch (provider) {
          case 'email':
            providerService = this.$fireduxAuth.getProvider('email', credentials);
            break;
          case 'facebook':
            providerService = this.$fireduxAuth.getProvider('facebook');
            break;
          case 'google':
            providerService = this.$fireduxAuth.getProvider('google');
            break;
          case 'twitter':
            providerService = this.$fireduxAuth.getProvider('twitter');
            break;
          default:
            linkPromise = Promise.reject();
            break;
        }
        if (providerService) {
          switch (method) {
            case 'redirect':
              linkPromise = this.$fireduxAuth.linkWithRedirect(providerService);
              break;
            default:
              break;
          }
          if (provider === 'email') {
            linkPromise = this.$fireduxAuth.link(providerService);
          }
        }
        return linkPromise;
      }
    }, {
      key: 'updatePassword',
      value: function updatePassword(oldPassword, newPassword) {
        return this.$fireduxAuth.updatePassword(oldPassword, newPassword);
      }
    }, {
      key: 'updateProfile',
      value: function updateProfile(profile) {
        return this.$fireduxAuth.updateProfile(profile);
      }
    }, {
      key: 'logout',
      value: function logout() {
        this.$fireduxAuth.logout();
      }

      // For deprecation
    }, {
      key: 'setParams',
      value: function setParams(params) {
        console.error('$firedux.setParams is being deprecated. Please update your code accordingly.');
        this.stateParams = params;
      }

      // Util
    }, {
      key: '$apply',
      value: function $apply() {
        var _this9 = this;

        this.$timeout(function () {
          _this9.$scope.$apply();
        });
      }
    }, {
      key: 'auth',
      get: function get() {
        return this.$fireduxAuth.auth || {};
      }
    }, {
      key: 'TIMESTAMP',
      get: function get() {
        return this.firebase.database.ServerValue.TIMESTAMP;
      }
    }, {
      key: 'UID',
      get: function get() {
        return this.firebase.database().ref('api').push().key;
      }
    }]);

    return Service;
  })();

  angular.module('firedux.service', ['firedux.auth', 'firedux.analytics', 'firedux.storage']).service('$firedux', Service);
})();
//# sourceMappingURL=firedux.service.js.map
