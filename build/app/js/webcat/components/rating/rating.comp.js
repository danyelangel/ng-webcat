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
      key: '$onChanges',
      value: function $onChanges(changes) {
        this.wcMaxScore = 5;
        if (changes.wcTotalScore || changes.wcUserScore) {
          this.$stars = this.getStarsArray(this.wcUserScore || this.wcTotalScore);
        }
      }
    }, {
      key: '$then',
      value: function $then(index) {
        this.then({
          $data: index + 1
        });
      }
    }, {
      key: 'getStarsArray',
      value: function getStarsArray(score) {
        var returnable = [];
        if (angular.isNumber(score)) {
          var floor = Math.floor(score),
              decimal = score - floor,
              remainder = undefined;
          if (decimal === 0 && floor === this.wcMaxScore) {
            remainder = null;
          } else if (decimal < 0.25) {
            remainder = 'empty';
          } else if (decimal > 0.25 && decimal < 0.75) {
            remainder = 'half';
          } else {
            remainder = 'full';
          }
          for (var i = 0; i < floor; i++) {
            returnable[i] = 'full';
          }
          for (var j = floor; j < this.wcMaxScore; j++) {
            returnable[j] = 'empty';
          }
          returnable[floor] = remainder;
        }
        return returnable;
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcRating', []).component('wcRating', {
    controller: Controller,
    templateUrl: 'webcat/components/rating/rating.html',
    transclude: {
      full: '?full',
      half: '?half',
      empty: '?empty',
      'catch': '?catch'
    },
    bindings: {
      wcTotalScore: '<',
      wcUserScore: '<',
      wcMaxScore: '@',
      then: '&'
    }
  });
})();
//# sourceMappingURL=rating.comp.js.map
