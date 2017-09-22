'use strict';

(function () {
  'use strict';
  angular.module('webcat.wcMenu').component('wcMenuItem', {
    templateUrl: 'webcat/components/menu/item/item-menu.html',
    transclude: true,
    bindings: {
      wcIcon: '@',
      wcText: '@',
      onClick: '&'
    }
  });
})();
//# sourceMappingURL=item-menu.js.map
