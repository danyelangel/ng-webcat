'use strict';

(function () {
  'use strict';
  angular.module('webcat.wcMenu', []).component('wcMenu', {
    templateUrl: 'webcat/components/menu/menu.html',
    transclude: true,
    bindings: {
      wcWidth: '@',
      wcIcon: '@',
      wcPosition: '@',
      wcMarginTop: '@',
      wcAlign: '@'
    }
  });
})();
//# sourceMappingURL=menu.comp.js.map
