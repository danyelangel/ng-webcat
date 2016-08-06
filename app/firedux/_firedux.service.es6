(function () {
  'use strict';

  class Service {
    constructor($window) {
      this.firebase = $window.firebase;
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
