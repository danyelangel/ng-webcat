(function () {
  'use strict';
  class Controller {
    constructor($mdPanel, $document, $firedux) {
      this.$mdPanel = $mdPanel;
      this.$firedux = $firedux;
      this.$document = $document;
    }
    $onInit() {
      this.$firedux.$timeout(() => {
        let position = this.getPosition(),
            animation = this.getAnimation();
        this.openPanel(position, animation);
      }, 100);
    }
    parseAlign() {
      let axes = (this.wcPanelAlign || '').split(' ');
      return {
        x: axes[0],
        y: axes[1]
      };
    }
    getPosition() {
      let position = this.$mdPanel.newPanelPosition();
      if (this.wcPanelTrigger) {
        position = position.relativeTo(this.wcPanelTrigger);
        position = this.getRelativeAlignment(position);
      } else {
        position = position.absolute();
        position = this.getAbsoluteAlignment(position);
      }
      return position;
    }
    getAnimation() {
      let animation = this.$mdPanel.newPanelAnimation();
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
            animation = animation.withAnimation(this.$mdPanel.animation.FADE);
            break;
        }
      } else {
        animation = animation.withAnimation(this.$mdPanel.animation.FADE);
      }
      if (
        angular.isNumber(this.wcPanelDuration)
      ) {
        animation = animation.duration(this.wcPanelDuration);
      }
      animation = animation.closeTo(this.wcPanelTrigger || 'body');
      return animation;
    }
    getRelativeAlignment(position) {
      let xAlign = this.parseAlign().x,
          xPosition,
          yAlign = this.parseAlign().y,
          yPosition,
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
    getAbsoluteAlignment(position) {
      let xAlign = this.parseAlign().x,
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
    openPanel(position, animation) {
      let panel = {
        parent: angular.element(this.$document[0].body),
        contentElement: '#webcatPanelTemplate',
        clickOutsideToClose: this.wcPanelBackdrop ? !this.wcPanelModal : false,
        escapeToClose: !this.wcPanelModal,
        trapFocus: !!this.wcPanelModal,
        hasBackdrop: !!this.wcPanelBackdrop,
        disableParentScroll: !!this.wcPanelScroll,
        position,
        animation,
        onDomAdded: () => {
          this.$domAdded = true;
          this.$firedux.$apply();
        },
        onCloseSuccess: () => {
          this.$closed = true;
          this.$firedux.$apply();
          this.catch();
        }
      };

      this.$firedux.$timeout(() => {
        this.panel = this.$mdPanel
          .create(panel);
        this.panel
          .open();
      });
    }
    $onDestroy() {
      if (this.panel && this.panel.hide) {
        return this.panel.hide().then(() => {
          return this.panel.destroy();
        });
      }
    }
  }
  angular
    .module('webcat.wcPanel', [])
    .component('wcPanel', {
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
        // Panel properties
        wcPanelModal: '<',
        wcPanelBackdrop: '<',
        // Events
        catch: '&'
      }
    });
}());
