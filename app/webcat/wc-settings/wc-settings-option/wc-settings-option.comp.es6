(function () {
  'use strict';
  angular
    .module('webcat.settings')
    .component('wcSettingsOption', {
      templateUrl: '_components/_webcat/wc-settings/wc-settings-option/wc-settings-option.html',
      bindings: {
        icon: '@',
        text: '@',
        onClick: '&'
      }
    });
}());
