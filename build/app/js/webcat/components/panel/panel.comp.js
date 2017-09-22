'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($mdPanel, $document, $firedux) {
      _classCallCheck(this, Controller);

      this.$mdPanel = $mdPanel;
      this.$firedux = $firedux;
      this.$document = $document;
    }

    _createClass(Controller, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$firedux.$timeout(function () {
          var position = _this.getPosition(),
              animation = _this.getAnimation();
          _this.openPanel(position, animation);
        }, 100);
      }
    }, {
      key: 'parseAlign',
      value: function parseAlign() {
        var axes = (this.wcPanelAlign || '').split(' ');
        return {
          x: axes[0],
          y: axes[1]
        };
      }
    }, {
      key: 'getPosition',
      value: function getPosition() {
        var position = this.$mdPanel.newPanelPosition();
        if (this.wcPanelTrigger) {
          position = position.relativeTo(this.wcPanelTrigger);
          position = this.getRelativeAlignment(position);
        } else {
          position = position.absolute();
          position = this.getAbsoluteAlignment(position);
        }
        return position;
      }
    }, {
      key: 'getAnimation',
      value: function getAnimation() {
        var animation = this.$mdPanel.newPanelAnimation();
        animation = animation.openFrom(this.wcPanelTrigger || 'body');
        if (this.wcPanelTrigger) {
          switch (this.wcPanelAnimation) {
            case 'scale':
              animation = animation.withAnimation(this.$mdPanel.animation.SCALE);
              break;
            case 'fade':
              animation = animation.withAnimation(this.$mdPanel.animation.FADE);
              break;
            case 'slide':
              animation = animation.withAnimation(this.$mdPanel.animation.SLIDE);
              break;
            default:
              break;
          }
        } else {
          animation = animation.withAnimation(this.$mdPanel.animation.FADE);
        }
        if (angular.isNumber(this.wcPanelDuration)) {
          animation = animation.duration(this.wcPanelDuration);
        } else {
          animation = animation.duration(0);
        }
        animation = animation.closeTo(this.wcPanelTrigger || 'body');
        return animation;
      }
    }, {
      key: 'getRelativeAlignment',
      value: function getRelativeAlignment(position) {
        var xAlign = this.parseAlign().x,
            xPosition = undefined,
            yAlign = this.parseAlign().y,
            yPosition = undefined,
            returnable = position;
        switch (xAlign) {
          case 'before':
            xPosition = this.$mdPanel.xPosition.OFFSET_START;
            break;
          case 'start':
            xPosition = this.$mdPanel.xPosition.ALIGN_START;
            break;
          case 'center':
            xPosition = this.$mdPanel.xPosition.CENTER;
            break;
          case 'end':
            xPosition = this.$mdPanel.xPosition.ALIGN_END;
            break;
          case 'after':
            xPosition = this.$mdPanel.xPosition.OFFSET_END;
            break;
          default:
            xPosition = this.$mdPanel.xPosition.CENTER;
            break;
        }
        switch (yAlign) {
          case 'before':
            yPosition = this.$mdPanel.yPosition.ABOVE;
            break;
          case 'start':
            yPosition = this.$mdPanel.yPosition.ALIGN_TOPS;
            break;
          case 'center':
            yPosition = this.$mdPanel.yPosition.CENTER;
            break;
          case 'end':
            yPosition = this.$mdPanel.yPosition.ALIGN_BOTTOMS;
            break;
          case 'after':
            yPosition = this.$mdPanel.yPosition.BELOW;
            break;
          default:
            break;
        }
        returnable = returnable.addPanelPosition(xPosition, yPosition);
        return returnable;
      }
    }, {
      key: 'getAbsoluteAlignment',
      value: function getAbsoluteAlignment(position) {
        var xAlign = this.parseAlign().x,
            yAlign = this.parseAlign().y,
            returnable = position;
        switch (xAlign) {
          case 'start':
            returnable = returnable.start();
            break;
          case 'center':
            returnable = returnable.centerHorizontally();
            break;
          case 'end':
            returnable = returnable.end();
            break;
          default:
            returnable = returnable.centerHorizontally();
            break;
        }
        switch (yAlign) {
          case 'start':
            returnable = returnable.top();
            break;
          case 'center':
            returnable = returnable.centerVertically();
            break;
          case 'end':
            returnable = returnable.bottom();
            break;
          default:
            returnable = returnable.centerVertically();
            break;
        }
        return returnable;
      }
    }, {
      key: 'openPanel',
      value: function openPanel(position, animation) {
        var _this2 = this;

        var panel = {
          parent: angular.element(this.$document[0].body),
          contentElement: '#webcatPanelTemplate',
          propagateContainerEvents: !this.wcPanelBackdrop && !this.wcPanelModal,
          clickOutsideToClose: this.wcPanelBackdrop ? !this.wcPanelModal : false,
          escapeToClose: !this.wcPanelModal,
          trapFocus: !!this.wcPanelModal,
          hasBackdrop: !!this.wcPanelBackdrop,
          disableParentScroll: !!this.wcPanelScroll,
          position: position,
          animation: animation,
          onDomAdded: function onDomAdded() {
            this.$domAdded = true;
            this.$firedux.$apply();
          },
          onCloseSuccess: function onCloseSuccess() {
            this.$closed = true;
            this.$firedux.$apply();
            this['catch']();
          }
        };

        this.$firedux.$timeout(function () {
          _this2.panel = _this2.$mdPanel.create(panel);
          _this2.panel.open();
        });
      }
    }, {
      key: '$onDestroy',
      value: function $onDestroy() {
        var _this3 = this;

        if (this.panel && this.panel.hide) {
          return this.panel.hide().then(function () {
            return _this3.panel.destroy();
          });
        }
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcPanel', []).component('wcPanel', {
    controller: Controller,
    templateUrl: 'webcat/components/panel/panel.html',
    transclude: {
      wcPanelTemplate: '?wcPanelTemplate'
    },
    bindings: {
      // Panel position
      wcPanelTrigger: '@',
      wcPanelAlign: '@',
      // Panel animation
      wcPanelAnimation: '@',
      wcPanelDuration: '<',
      // Panel properties
      wcPanelModal: '<',
      wcPanelBackdrop: '<',
      // Events
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=panel.comp.js.map
