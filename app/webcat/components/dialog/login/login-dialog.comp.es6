(function () {
  'use strict';
  class Controller {
    $ngInit() {
      if (angular.isString(
        this.bindings.wcDialogLogin
      )) {
        this.$providers = this.bindings.wcDialogLogin.split(' ');
        this.$title = this.bindings.title;
        this.$body = this.bindings.body;
        this.$cancel = this.bindings.cancel;
      }
    }
    $then(provider, credentials) {
      this.bindings.then(provider, credentials);
    }
    $catch() {
      this.bindings.catch();
    }
  }
  angular
    .module('webcat.wcDialog.login', [])
    .component('wcDialogLogin', {
      controller: Controller,
      templateUrl: 'webcat/components/dialog/login/login.html',
      bindings: {
        bindings: '<'
      }
    });
}());
