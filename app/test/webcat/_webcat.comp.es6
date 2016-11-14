(function () {
  'use strict';
  angular
    .module('test.webcat', [
      'test.webcat.dialog',
      'test.webcat.progress',
      'test.webcat.toggle',
      'test.webcat.upload'
    ])
    .component('testWebcat', {
      templateUrl: 'test/webcat/_webcat.html'
    });
}());
