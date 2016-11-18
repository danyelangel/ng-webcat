(function () {
  'use strict';
  angular
    .module('test.firedux', [
      'test.firedux.api',
      'test.firedux.env',
      'test.firedux.ref',
      'test.firedux.set'
    ])
    .component('testFiredux', {
      templateUrl: 'test/firedux/_firedux.html'
    });
}());
