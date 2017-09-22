'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($timeout, $element, $window) {
      var _this = this;

      _classCallCheck(this, Controller);

      this.$element = $element;
      this.$timeout = $timeout;
      this._ = $window._;
      this.$then = this._.throttle(function (data) {
        _this.then(data);
      }, 1000, {
        leading: true
      });
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges() {
        var _this2 = this;

        if (this.wcRich) {
          console.warn('wcRich is being deprecated!');
        }
        this.show = false;
        this.wcDisabled = !!this.wcDisabled;
        this.settings = {
          targetBlank: true,

          // Config
          toolbar: this.wcDisabled ? false : this.buildButtons(this.wcControls),

          // State
          disableEditing: this.wcDisabled
        };
        this.settings.disableReturn = !!this.wcInline;
        this.$timeout(function () {
          _this2.show = true;
        });
      }
    }, {
      key: 'buildButtons',
      value: function buildButtons() {
        var controls = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        var buttonDefinitions = {
          b: 'bold',
          i: 'italic',
          a: 'anchor',
          h2: 'h2',
          h3: 'h3'
        };
        var buttons = [];
        angular.forEach(buttonDefinitions, function (def, key) {
          if (controls.indexOf(key) >= 0) {
            buttons.push(def);
          }
        });
        return buttons.length > 0 ? {
          buttons: buttons
        } : false;
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcText', ['angular-medium-editor', 'ngSanitize']).component('wcText', {
    controller: Controller,
    templateUrl: 'webcat/components/text/text.html',
    bindings: {
      wcData: '<',
      wcControls: '@',
      wcInline: '<',
      wcRich: '@',
      wcPlaceholder: '@',
      wcDisabled: '<',
      wcHref: '@',
      then: '&'
    }
  });
})();
//# sourceMappingURL=text.comp.js.map
