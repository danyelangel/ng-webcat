'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = function Controller($stateParams, $scope) {
    var _this = this;

    _classCallCheck(this, Controller);

    this.$stateParams = $stateParams;
    $scope.$watch(function () {
      return _this.$stateParams;
    }, function ($data) {
      _this.then({ $data: $data });
    });
  };

  angular.module('webcat.wcUiParams', []).component('wcUiParams', {
    controller: Controller,
    bindings: {
      then: '&'
    }
  });
})();
//# sourceMappingURL=ui-params.comp.js.map
