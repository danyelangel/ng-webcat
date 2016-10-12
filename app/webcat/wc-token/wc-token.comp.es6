(function () {
  'use strict';
  angular
    .module('webcat.token', [])
    .component('wcToken', {
      templateUrl: 'webcat/wc-token/wc-token.html',
      transclude: true,
      bindings: {
        token: '<'
      }
    });
}());
