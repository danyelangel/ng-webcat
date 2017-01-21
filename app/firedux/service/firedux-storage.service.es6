(function () {
  'use strict';
  class Service {
    constructor($window) {
      this.firebase = $window.firebase;
    }
    ref(path) {
      return this.firebase.storage().ref(path);
    }
    refFromURL(url) {
      return this.firebase.storage().refFromURL(url);
    }
    getResizeableUrl(url, size) {
      let ref = this.refFromURL(url),
          project = ref.bucket.split('.')[0],
          image = ref.fullPath;
      return `https://${project}.appspot.com/?project=${project}&image=${image}&size=${size}`;
    }
  }
  angular
    .module('firedux.storage', [])
    .service('$fireduxStorage', Service);
}());
