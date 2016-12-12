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
    constructor($window, $fireduxAuth, $timeout, $rootScope) {
      this.firebase = $window.firebase;
      this.$fireduxAuth = $fireduxAuth;
      this.reducers = [];
      this.$scope = $rootScope;
      this.$timeout = $timeout;
      this.isDispatching = {};
      this.vals = {};
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
    val(valId) {
      if (!this.vals[valId]) {
        this.vals[valId] = new ValueObserver();
      }
      return this.vals[valId];
    }
    ref(path) {
      return this.database().ref(path);
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
    storageRef(path) {
      return this.firebase.storage().ref(path);
    }
    init(config) {
      this.firebase.initializeApp(config);
      this.hasInitialized = true;
      this.$fireduxAuth.init(this.firebase);
      this.database = this.firebase.database;
      this.projectUrl = config.storageBucket;
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
    dispatch(action) {
      return new Promise((resolve, reject) => {
        if (!this.isDispatching[action.type]) {
          this.isDispatching[action.type] = true;
          if (angular.isDefined(this.reducers[action.type])) {
            this.reducers[action.type](action, this)
              .then((payload) => {
                this.isDispatching[action.type] = false;
                resolve(payload);
              })
              .catch((err) => {
                this.isDispatching[action.type] = false;
                console.warn(`Reducer ${action.type} threw this error: ` + err);
                reject(err);
              });
          } else {
            this.isDispatching[action.type] = false;
            reject('Reducer ' + action.type + ' is not registered');
          }
        } else {
          this.isDispatching[action.type] = false;
          reject('Firedux is already dispatching this action');
        }
      });
    }
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
        case 'twitter':
          providerService = this.$fireduxAuth
            .getProvider('twitter');
          break;
        default:
          loginPromise = Promise.reject();
          break;
      }
      if (providerService) {
        switch (method) {
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
    updatePassword(oldPassword, newPassword) {
      return this
        .$fireduxAuth(
          oldPassword,
          newPassword);
    }
    logout() {
      this.$fireduxAuth.logout();
    }
    setParams(params) {
      this.stateParams = params;
    }
    $apply() {
      this.$timeout(() => {
        this.$scope.$apply();
      });
    }
  }
  angular
    .module('firedux.service', [
      'firedux.$fireduxAuth'
    ])
    .service('$firedux', Service);
}());
