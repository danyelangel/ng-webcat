(function () {
  'use strict';

  angular
    .module('webcat')
    .config(config);

  class AuthController {
    constructor(Auth) {
      Auth.logout();
      Auth.auth();
    }
  }
}());
