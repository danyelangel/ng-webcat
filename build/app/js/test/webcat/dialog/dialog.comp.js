'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      $firedux.reducer({
        trigger: 'DIALOG.DISPATCHER',
        reducer: function reducer(action) {
          console.log(action);
        }
      });
    }

    _createClass(Controller, [{
      key: '$isPloplLife',
      value: function $isPloplLife() {
        console.log('Plop is life');
      }
    }]);

    return Controller;
  })();

  angular.module('test.webcat.dialog', []).component('testWebcatDialog', {
    templateUrl: 'test/webcat/dialog/dialog.test.html',
    controller: Controller
  });
})();
//# sourceMappingURL=dialog.comp.js.map
