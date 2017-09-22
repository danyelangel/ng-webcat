'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($window, $firedux, $document, md5) {
      _classCallCheck(this, Controller);

      this.$window = $window;
      this.$firedux = $firedux;
      this.$document = $document;
      this.md5 = md5;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges() {
        var _this = this;

        var $data = undefined;
        this.$hash = this.md5.createHash(this.wcIdenticonEmail || null);
        this.$firedux.$apply();
        this.$firedux.$timeout(function () {
          _this.$window.jdenticon();
          $data = _this.$document[0].getElementById('webcat-identicon-canvas').toDataURL();
          _this.then({
            $data: $data
          });
          _this.$hash = undefined;
          _this.$firedux.$apply();
        });
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcIdenticon', ['angular-md5']).component('wcIdenticon', {
    controller: Controller,
    templateUrl: 'webcat/components/identicon/identicon.html',
    transclude: {
      then: '?then',
      'catch': '?catch',
      before: '?before'
    },
    bindings: {
      wcIdenticonEmail: '@',
      then: '&'
    }
  });
})();
//# sourceMappingURL=identicon.comp.js.map
