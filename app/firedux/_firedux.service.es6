(function () {
  'use strict';

  class Service {
    constructor($window, $firebaseArray, Auth, Dialog, Lang, Storage) {
      this.firebase = $window.firebase;
      this.auth = () => {
        return Auth;
      };
      this.dialog = () => {
        return Dialog;
      };
      this.lang = () => {
        return Lang;
      };
      this.storage = () => {
        return Storage;
      };
    }
    init(config) {
      this.firebase.initializeApp(config);
      this.hasInitialized = true;
      this.database = this.firebase.database();
      this.projectUrl = config.storageBucket;
    }
  }
  angular
    .module('webcat.firedux')
    .service('$firedux', Service);
}());
