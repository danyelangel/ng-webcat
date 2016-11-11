(function () {
  'use strict';
  class Controller {
    $ngInit() {
      if (angular.isString(
        this.bindings.wcDialogLogin
      )) {
        this.$progress = this.bindings.progress;
        this.$title = this.bindings.title;
        this.$body = this.bindings.body;
        this.$cancelLabel = this.bindings.cancelLabel;
        this.$emailLabel = this.bindings.emailLabel;
        this.$passwordLabel = this.bindings.passwordLabel;
      }
    }
    $catch() {
      this.bindings.catch();
    }
  }
  angular
    .module('webcat.wcDialog.progress', [])
    .component('wcDialogProgress', {
      controller: Controller,
      templateUrl: 'wecat/components/dialog/progress/progress-dialog.html',
      bindings: {
        bindings: '<'
      }
    });
}());
