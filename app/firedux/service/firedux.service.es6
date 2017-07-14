(function () {
  'use strict';
  class ValueObserver {
    constructor() {
      this.callbacks = [];
    }
    set(data) {
      this.data = data;
      angular.forEach(this.callbacks, callback => {
        callback(this.data);
      });
    }
    watch(callback) {
      this.callbacks.push(callback);
      callback(this.data);
      return () => {
        let index = this.callbacks.indexOf(callback);
        this.callbacks.splice(index, 1);
      };
    }
  }

  class Service {
    constructor(
      $window,
      $document,
      $fireduxAuth,
      $fireduxAnalytics,
      $fireduxStorage,
      $timeout,
      $rootScope
    ) {
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
    init(params, analytics, pixel) {
      this.onlyRedirect = params.redirect;
      if (
        angular.isObject(params) &&
        angular.isObject(params.config) &&
        angular.isString(params.config.apiKey)
      ) {
        this.firebase.initializeApp(params.config);
        this.initialize(params.config, params.base);
        this.$fireduxAnalytics
          .init(params.analytics, params.pixel);
        this.val('PROJECT_ID').set(params.config.authDomain.split('.')[0]);
      } else if (
        angular.isObject(params) &&
        angular.isString(params.apiKey)
      ) {
        console.warn('$firedux.initialize(firebaseConfig) is being deprecated. Please use $firedux.initialize({config: firebaseConfig})');
        this.firebase.initializeApp(params);
        this.initialize(params);
        this.$fireduxAnalytics
          .init(analytics, pixel);
      }
    }
    initialize(params, base = '/') {
      this.refBase = base;
      this.val('PROJECT_ID').set(params.authDomain.split('.')[0]);
      this.hasInitialized = true;
      this.$fireduxAuth
        .init(this.firebase);
      this.database = this.firebase.database;
      this.projectUrl = params.storageBucket;
      this.waitForAuth((authData) => {
        if (authData) {
          this
            .ref('users')
            .child(authData.uid)
            .on('value', snap => {
              this.user = snap.val();
            });
        }
      });
    }
    // Constants
    var(variable) {
      switch (variable) {
        case 'UID':
          return this.UID;
        case 'TIMESTAMP':
          return this.TIMESTAMP;
        default:
          return null;
      }
    }
    get auth() {
      return this.$fireduxAuth.auth || {};
    }
    get TIMESTAMP() {
      return this.firebase.database.ServerValue.TIMESTAMP;
    }
    get UID() {
      return this.firebase
        .database()
        .ref('api')
        .push()
        .key;
    }
    // ValueObserver
    val(valId) {
      if (!this.vals[valId]) {
        this.vals[valId] = new ValueObserver();
      }
      return this.vals[valId];
    }
    // Analytics
    analytics() {
      return this.$fireduxAnalytics;
    }
    // Database
    ref(path = '/') {
      return this.database().ref(this.refBase).child(path);
    }
    api(endpoint) {
      return {
        call: request => {
          let UID = this.UID;
          return this.ref('api')
            .child(endpoint)
            .child(UID)
            .set({
              request,
              timestamp: this.TIMESTAMP
            })
            .then(() => {
              return new Promise((resolve, reject) => {
                this.ref('api')
                  .child(endpoint)
                  .child(UID)
                  .child('response')
                  .on('value', response => {
                    this.$timeout(() => {
                      reject('API timed out');
                    }, 10000);
                    if (response) {
                      this.ref('api')
                        .child(endpoint)
                        .child(UID)
                        .child('response')
                        .off();
                      this.ref('api')
                        .child(endpoint)
                        .child(UID)
                        .set(null);
                      resolve(response.val());
                    }
                  });
              });
            });
        }
      };
    }
    parseArray(array) {
      let returnable = {};
      if (angular.isArray(array)) {
        angular.forEach(array, item => {
          returnable[this.UID] = item;
        });
      }
      return returnable;
    }
    // Storage
    storage() {
      return this.$fireduxStorage;
    }
    storageRef(path) {
      return this.storage().ref(path);
    }
    // Redux
    reducer(params) {
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
    registerReducer(params) {
      this.reducers[params.trigger] = params.reducer;
    }
    dispatch(action, log = true) {
      return new Promise((resolve, reject) => {
        if (!this.isDispatching[action.type]) {
          this.isDispatching[action.type] = true;
          if (angular.isDefined(this.reducers[action.type])) {
            if (log) {
              console.groupCollapsed(`${action.type}`);
              console.log(action);
            }
            try {
              this.reducers[action.type](action, this)
                .then(payload => {
                  if (log) {
                    console.log(`Reducer resolved`);
                    console.groupEnd();
                  }
                  this.$scope.$emit('fd:action', action.type);
                  this.isDispatching[action.type] = false;
                  resolve(payload);
                })
                .catch(err => {
                  err = err || 'UNDEFINED ERROR';
                  if (log) {
                    console.groupEnd();
                    console.warn(`Reducer ${action.type} threw this error: `, err);
                  }
                  this.isDispatching[action.type] = false;
                  this.$scope.$emit('fd:error', `${action.type}: ${err}`);
                  reject(err);
                });
            } catch (err) {
              this.isDispatching[action.type] = false;
              if (log) {
                console.groupEnd();
              }
              this.$scope.$emit('fd:error', `${action.type}: ${err}`);
              if (log) {
                console.warn(`Reducer ${action.type} threw this synchronous error: `, err);
              }
              reject(err);
            }
          } else {
            this.isDispatching[action.type] = false;
            if (log) {
              console.warn('Reducer ' + action.type + ' is not registered');
            }
            reject('Reducer ' + action.type + ' is not registered');
          }
        } else {
          this.isDispatching[action.type] = false;
          if (log) {
            console.warn('Firedux is already dispatching this action: ' + action.type);
          }
          reject('Firedux is already dispatching this action: ' + action.type);
        }
      });
    }
    dispatchGroup(actions, log = true) {
      let promises = [],
          promiseTypes = '';
      angular.forEach(actions, action => {
        promiseTypes = promiseTypes + ', ' + action.type;
        promises.push(this.dispatch(action, false));
      });
      if (log) {
        console.groupCollapsed(`${promiseTypes}`);
        angular.forEach(actions, action => {
          console.log(action);
        });
      }
      return Promise
        .all(promises)
        .then(() => {
          if (log) {
            console.log(`All reducers resolved`);
            console.groupEnd();
          }
        })
        .catch(err => {
          err = err || 'UNDEFINED ERROR';
          if (log) {
            console.groupEnd();
            console.warn(`One reducer threw this error: `, err);
          }
        });
    }
    // Auth
    waitForAuth(success, error) {
      return this.$fireduxAuth.waitForAuth(success, error);
    }
    register(credentials) {
      return this.$fireduxAuth.register(credentials).then(() => {
        return this.login('email', credentials);
      });
    }
    login(provider, credentials, method) {
      let loginPromise,
          providerService;
      switch (provider) {
        case 'email':
          loginPromise = this.$fireduxAuth
            .signInWithEmailAndPassword(credentials);
          break;
        case 'anonymous':
          loginPromise = this.$fireduxAuth
            .signInAnonymously();
          break;
        case 'facebook':
          providerService = this.$fireduxAuth
            .getProvider('facebook');
          break;
        case 'google':
          providerService = this.$fireduxAuth
            .getProvider('google');
          break;
        case 'twitter':
          providerService = this.$fireduxAuth
            .getProvider('twitter');
          break;
        default:
          loginPromise = Promise.reject();
          break;
      }
      if (providerService) {
        switch (this.onlyRedirect ? 'redirect' : method) {
          case 'popup':
            loginPromise = this.$fireduxAuth
              .signInWithPopup(providerService);
            break;
          case 'redirect':
            loginPromise = this.$fireduxAuth
              .signInWithRedirect(providerService);
            break;
          default:
            break;
        }
      }
      return loginPromise;
    }
    link(provider, credentials, method) {
      let linkPromise,
          providerService;
      switch (provider) {
        case 'email':
          providerService = this.$fireduxAuth
            .getProvider('email', credentials);
          break;
        case 'facebook':
          providerService = this.$fireduxAuth
            .getProvider('facebook');
          break;
        case 'google':
          providerService = this.$fireduxAuth
            .getProvider('google');
          break;
        case 'twitter':
          providerService = this.$fireduxAuth
            .getProvider('twitter');
          break;
        default:
          linkPromise = Promise.reject();
          break;
      }
      if (providerService) {
        switch (method) {
          case 'redirect':
            linkPromise = this.$fireduxAuth
              .linkWithRedirect(providerService);
            break;
          default:
            break;
        }
        if (provider === 'email') {
          linkPromise = this.$fireduxAuth
              .link(providerService);
        }
      }
      return linkPromise;
    }
    updatePassword(oldPassword, newPassword) {
      return this
        .$fireduxAuth
        .updatePassword(
          oldPassword,
          newPassword);
    }
    updateProfile(profile) {
      return this
        .$fireduxAuth
        .updateProfile(profile);
    }
    logout() {
      this.$fireduxAuth.logout();
    }
    // For deprecation
    setParams(params) {
      console.error('$firedux.setParams is being deprecated. Please update your code accordingly.');
      this.stateParams = params;
    }
    // Util
    $apply() {
      this.$timeout(() => {
        this.$scope.$apply();
      });
    }
  }
  angular
    .module('firedux.service', [
      'firedux.auth',
      'firedux.analytics',
      'firedux.storage'
    ])
    .service('$firedux', Service);
}());
