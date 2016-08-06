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
  function config($stateProvider) {
    $stateProvider
      .state('auth', {
        url: `/login`,
        template: '',
        controller: AuthController,
        controllerAs: 'vm'
      });
  }
}());
