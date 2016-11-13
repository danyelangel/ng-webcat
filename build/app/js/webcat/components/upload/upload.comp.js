'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = function Controller() {
    _classCallCheck(this, Controller);
  };

  angular.module('webcat.wcUpload', ['ngFileUpload']).component('wcUpload', {
    controller: Controller,
    templateUrl: 'webcat/components/upload/upload.html',
    transclude: {
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      wcUploadMultiple: '<',
      wcUploadDimensions: '<',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=upload.comp.js.map
