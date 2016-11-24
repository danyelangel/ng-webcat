(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      $firedux.reducer({
        trigger: 'DIALOG.DISPATCHER',
        reducer: (action) => {
          console.log(action);
        }
      });
    }
    $isPloplLife() {
      console.log('Plop is life');
    }
  }
  angular
    .module('test.webcat.dialog', [])
    .component('testWebcatDialog', {
      templateUrl: 'test/webcat/dialog/dialog.test.html',
      controller: Controller
    });
}());
