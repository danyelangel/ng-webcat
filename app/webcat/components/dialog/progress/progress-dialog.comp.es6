(function () {
  'use strict';
  class Controller {
    $catch() {
      this.bindings.catch();
    }
  }
  angular
    .module('webcat.wcDialog.progress', [])
    .component('wcDialogProgress', {
      controller: Controller,
      templateUrl: 'webcat/components/dialog/progress/progress-dialog.html',
      bindings: {
        bindings: '<'
      }
    });
}());
