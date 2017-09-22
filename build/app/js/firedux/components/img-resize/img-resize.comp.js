'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        this.$ready = this.$error = false;
        if (changes.fdImgUrl || changes.fdImgSize) {
          this.getUrl();
        } else {
          this.$error = true;
        }
      }
    }, {
      key: 'getUrl',
      value: function getUrl() {
        if (angular.isString(this.fdImgUrl) && angular.isNumber(this.fdImgSize)) {
          var url = this.fdImgUrl,
              size = this.fdImgSize;
          this.then({
            $data: this.$firedux.storage().getResizeableUrl(url, size)
          });
          this.$ready = true;
        }
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdImgResize', []).component('fdImgResize', {
    controller: Controller,
    templateUrl: 'firedux/components/img-resize/img-resize.html',
    transclude: {
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdImgUrl: '@',
      fdImgSize: '<',
      then: '&'
    }
  });
})();
//# sourceMappingURL=img-resize.comp.js.map
