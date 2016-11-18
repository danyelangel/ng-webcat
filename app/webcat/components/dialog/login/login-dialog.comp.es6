(function () {
  'use strict';
  class Controller {
    $onInit() {
      if (angular.isString(this.bindings.login)) {
        this.$providers = this.bindings.login.split(' ');
        this.$title = this.bindings.title;
        this.$body = this.bindings.body;
        this.$cancel = this.bindings.cancel;
      }
    }
    $then(provider, credentials) {
      this.bindings.then({
        provider,
        credentials
      });
    }
    $catch() {
      this.bindings.catch();
    }
  }
  angular
    .module('webcat.wcDialog.login', [])
    .component('wcDialogLogin', {
      controller: Controller,
      templateUrl: 'webcat/components/dialog/login/login-dialog.html',
      bindings: {
        bindings: '<'
      }
    });
}());
