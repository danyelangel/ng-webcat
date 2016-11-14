(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      this.$percentage = this.$type = undefined;
      if (changes.wcProgressPercentage) {
        this.$percentage = this.wcProgressPercentage;
      }
      if (changes.wcProgressType) {
        switch (this.wcProgressType) {
          case 'circular':
            this.$type = 'circular';
            break;
          case 'linear':
            this.$type = 'linear';
            break;
          default:
            this.$type = 'linear';
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
        wcProgressType: '@',
        wcProgressPercentage: '@'
      }
    });
}());
