(function () {
  'use strict';
  class Controller {}
  angular
    .module('webcat.wcLayout', [])
    .component('wcLayout', {
      controller: Controller,
      templateUrl: 'webcat/components/layout/layout.html',
      transclude: {
        sidenav: '?sidenav',
        toolbar: '?toolbar',
        content: '?content'
      },
      bindings: {
        wcOpen: '<',
        wcSidenavId: '<'
      }
    });
}());
