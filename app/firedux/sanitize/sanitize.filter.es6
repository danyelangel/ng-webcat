(function () {
  'use strict';

  function filter($sce) {
    return (input) => {
      return $sce.trustAsHtml(input);
    };
  }
  angular
    .module('firedux.sanitize', [])
    .filter('sanitize', filter);
}());
