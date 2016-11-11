(function () {
  'use strict';

  class Service {
    constructor($window, $fireduxAuth) {
      this.firebase = $window.firebase;
      this.$fireduxAuth = $fireduxAuth;
    }
    get auth() {
      return this.$fireduxAuth.auth;
    }
    get TIMESTAMP() {
      return this.database.ServerValue.TIMESTAMP;
    }
    get UID() {
      return this.firebase
        .database()
        .ref('api')
        .push()
        .key;
    }
    get ref() {
      return this.database().ref;
    }
    init(config) {
      this.firebase.initializeApp(config);
      this.hasInitialized = true;
      this.database = this.firebase.database;
      this.projectUrl = config.storageBucket;
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
      return this.reducers[action.type](action, this);
    }
    waitForAuth() {
      return this.$fireduxAuth.waitForAuth();
    }
    login(provider, credentials, method) {
      let loginPromise = Promise.reject(),
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
          break;
      }
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
      return loginPromise;
    }
  }
  angular
    .module('webcat.$firedux', [])
    .service('$firedux', Service);
}());
