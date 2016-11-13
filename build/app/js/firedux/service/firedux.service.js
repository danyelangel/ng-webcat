'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Service = (function () {
    function Service($window, $fireduxAuth) {
      _classCallCheck(this, Service);

      this.firebase = $window.firebase;
      this.$fireduxAuth = $fireduxAuth;
      this.reducers = [];
    }

    _createClass(Service, [{
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
      key: 'ref',
      value: function ref(path) {
        return this.database().ref(path);
      }
    }, {
      key: 'storageRef',
      value: function storageRef(path) {
        return this.firebase.storage().ref(path);
      }
    }, {
      key: 'init',
      value: function init(config) {
        this.firebase.initializeApp(config);
        this.hasInitialized = true;
        this.$fireduxAuth.init(this.firebase);
        this.database = this.firebase.database;
        this.projectUrl = config.storageBucket;
      }
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
        return this.reducers[action.type](action, this);
      }
    }, {
      key: 'waitForAuth',
      value: function waitForAuth() {
        return this.$fireduxAuth.waitForAuth();
      }
    }, {
      key: 'login',
      value: function login(provider, credentials, method) {
        var loginPromise = Promise.reject(),
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
          case 'twitter':
            providerService = this.$fireduxAuth.getProvider('twitter');
            break;
          default:
            break;
        }
        switch (method) {
          case 'popup':
            loginPromise = this.$fireduxAuth.signInWithPopup(providerService);
            break;
          case 'redirect':
            loginPromise = this.$fireduxAuth.signInWithRedirect(providerService);
            break;
          default:
            break;
        }
        return loginPromise;
      }
    }, {
      key: 'setParams',
      value: function setParams(params) {
        this.stateParamsVar = params;
      }
    }, {
      key: 'auth',
      get: function get() {
        return this.$fireduxAuth.auth;
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
    }, {
      key: 'stateParams',
      get: function get() {
        return this.stateParamsVar;
      }
    }]);

    return Service;
  })();

  angular.module('firedux.service', ['firedux.$fireduxAuth']).service('$firedux', Service);
})();
//# sourceMappingURL=firedux.service.js.map
