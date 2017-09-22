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
      key: '$catch',
      value: function $catch() {
        this.bindings['catch']();
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcDialog.progress', []).component('wcDialogProgress', {
    controller: Controller,
    templateUrl: 'webcat/components/dialog/progress/progress-dialog.html',
    bindings: {
      bindings: '<'
    }
  });
})();
//# sourceMappingURL=progress-dialog.comp.js.map
