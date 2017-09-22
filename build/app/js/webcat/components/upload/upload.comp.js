'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller() {
      _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
      key: '$then',
      value: function $then(file) {
        this.$ready = true;
        this.then({
          $file: file
        });
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcUpload', ['ngFileUpload']).component('wcUpload', {
    controller: Controller,
    templateUrl: 'webcat/components/upload/upload.html',
    transclude: {
      then: '?then'
    },
    bindings: {
      wcUploadMultiple: '<',
      wcUploadDimensions: '<',
      then: '&'
    }
  });
})();
//# sourceMappingURL=upload.comp.js.map
