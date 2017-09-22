'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
      this.uid = $firedux['var']('UID');
    }

    _createClass(Controller, [{
      key: '$onInit',
      value: function $onInit() {
        if (this.wcProgressGroup) {
          var current = this.$firedux.val(this.wcProgressGroup).get();
          if (angular.isArray(current)) {
            current.push(this.uid);
          } else {
            current = [this.uid];
          }
          this.$firedux.val(this.wcProgressGroup).set(current);
        }
      }
    }, {
      key: '$onDestroy',
      value: function $onDestroy() {
        if (this.wcProgressGroup) {
          var current = this.$firedux.val(this.wcProgressGroup).get();
          current.splice(current.indexOf(this.uid), 1);
          this.$firedux.val(this.wcProgressGroup).set(current);
        }
      }
    }, {
      key: '$onChanges',
      value: function $onChanges(changes) {
        this.$percentage = this.$type = undefined;
        if (changes.wcProgressPercentage) {
          this.$percentage = this.wcProgressPercentage;
        }
        if (changes.wcProgressType) {
          switch (this.wcProgressType) {
            case 'circular':
              this.$type = 'circular';
              break;
            case 'linear':
              this.$type = 'linear';
              break;
            default:
              this.$type = 'linear';
              break;
          }
        }
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcProgress', []).component('wcProgress', {
    controller: Controller,
    templateUrl: 'webcat/components/progress/progress.html',
    bindings: {
      wcProgressType: '@',
      wcProgressPercentage: '@',
      wcProgressGroup: '@'
    }
  });
})();
//# sourceMappingURL=progress.comp.js.map
