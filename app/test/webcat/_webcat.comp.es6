(function () {
  'use strict';
  angular
    .module('test.webcat', [
      'test.webcat.dialog',
      'test.webcat.identicon',
      'test.webcat.panel',
      'test.webcat.progress',
      'test.webcat.rating',
      'test.webcat.toggle',
      'test.webcat.upload'
    ])
    .component('testWebcat', {
      templateUrl: 'test/webcat/_webcat.html'
    });
}());
