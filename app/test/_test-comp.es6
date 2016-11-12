(function () {
  'use strict';
  angular
    .module('test.comp', [
      'test.firedux'
    ])
    .component('testComp', {
      templateUrl: 'test/_test.html'
    });
}());
