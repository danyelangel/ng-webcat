(function () {
  'use strict';
  angular
    .module('test.webcat', [
      'test.webcat.toggle',
      'test.webcat.upload'
    ])
    .component('testWebcat', {
      templateUrl: 'test/webcat/_webcat.html'
    });
}());
