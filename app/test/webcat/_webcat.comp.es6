(function () {
  'use strict';
  angular
    .module('test.webcat', [
      'test.webcat.toggle'
    ])
    .component('testWebcat', {
      templateUrl: 'test/webcat/_webcat.html'
    });
}());
