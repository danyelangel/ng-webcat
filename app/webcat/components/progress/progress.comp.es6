(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
      this.uid = $firedux.var('UID');
    }
    $onInit() {
      if (this.wcProgressGroup) {
        let current = this.$firedux.val(this.wcProgressGroup).get();
        if (angular.isArray(current)) {
          current.push(this.uid);
          this.uidIndex = current.length - 1;
        } else {
          current = [this.uid];
        }
        this.$firedux.val(this.wcProgressGroup).set(current);
      }
    }
    $onDestroy() {
      if (this.wcProgressGroup) {
        let current = this.$firedux.val(this.wcProgressGroup).get();
        current.splice(this.uidIndex, 1);
        this.$firedux.val(this.wcProgressGroup).set(current);
      }
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
        wcProgressPercentage: '@',
        wcProgressGroup: '@'
      }
    });
}());
