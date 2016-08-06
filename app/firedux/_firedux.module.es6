(function () {
  'use strict';

  angular
    .module('webcat.firedux', [
      'firebase',
      'firedux.auth',
      'firedux.dialog',
      'firedux.lang',
      'firedux.sanitize',
      'firedux.storage'
    ]);
}());
