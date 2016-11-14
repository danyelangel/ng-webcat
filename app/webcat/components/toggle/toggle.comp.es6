(function () {
  'use strict';
  class Controller {
    changeItem($index) {
      this.wcToggleSelected = $index;
      this.then({
        $index,
        $data: this.wcToggleItems[$index]
      });
    }
  }
  angular
    .module('webcat.wcToggle', [])
    .component('wcToggle', {
      controller: Controller,
      templateUrl: 'webcat/components/toggle/toggle.html',
      bindings: {
        wcToggleSelected: '<',
        wcToggleItems: '<',
        then: '&'
      }
    });
}());
