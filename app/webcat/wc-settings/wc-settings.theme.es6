(function () {
  'use strict';

  angular
    .module('webcat.settings')
    .config(config);

  function config($mdThemingProvider) {
    $mdThemingProvider.theme('wc-settings')
      .primaryPalette('grey', {
        default: '900'
      })
      .dark();
  }
}());
