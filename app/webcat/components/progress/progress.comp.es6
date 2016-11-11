(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      this.$percentage = this.$type = undefined;
      if (changes.wcLoaderType) {
        this.$percentage = this.wcLoaderPercentage;
      }
      if (changes.wcLoaderType) {
        switch (this.wcLoaderType) {
          case 'circular':
            this.$type = 'circular';
            break;
          case 'linear':
            this.$type = 'linear';
            break;
          default:
            break;
        }
      }
    }
  }
  angular
    .module('webcat.wcProgress', [])
    .component('wcProgress', {
      controller: Controller,
      templateUrl: 'webcat/components/progress/progress.html',
      bindings: {
        wcLoaderType: '@',
        wcLoaderPercentage: '@'
      }
    });
}());
