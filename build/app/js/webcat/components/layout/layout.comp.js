'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = function Controller() {
    _classCallCheck(this, Controller);
  };

  angular.module('webcat.wcLayout', []).component('wcLayout', {
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
})();
//# sourceMappingURL=layout.comp.js.map
