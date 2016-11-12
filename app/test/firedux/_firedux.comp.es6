(function () {
  'use strict';
  angular
    .module('test.firedux', [
      'test.firedux.env',
      'test.firedux.ref'
    ])
    .component('testFiredux', {
      templateUrl: 'test/firedux/_firedux.html'
    });
}());
