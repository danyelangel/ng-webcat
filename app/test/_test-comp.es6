(function () {
  'use strict';
  angular
    .module('test.comp', [
      'test.firedux',
      'test.webcat'
    ])
    .component('testComp', {
      templateUrl: 'test/_test-comp.html'
    });
}());
