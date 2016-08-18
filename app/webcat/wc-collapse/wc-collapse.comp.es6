(function () {
  'use strict';
  class Controller {
    constructor($element, $timeout) {
      this.$element = $element;
      this.$timeout = $timeout;
    }
    $onInit() {
      let targetHeight,
          targetWidth,
          targetOpacity;
      // Get target size
      this.getDimensions();
      // Define target size depending on isCollapsed
      targetHeight = this.isCollapsed ? 0 : this.targetHeight;
      targetWidth = this.isCollapsed ? 0 : this.targetWidth;
      targetOpacity = this.isCollapsed ? 0 : 1;
      // Add styles
      this.$element.addClass('no-transition');
      this.$element.css({
        height: targetHeight + 'px',
        width: targetWidth + 'px',
        opacity: targetOpacity
      });
    }
    $onChanges(changes) {
      let targetHeight,
          targetWidth,
          targetOpacity;
      if (this.verticalOnly) {
        this.$element.addClass('vertical-only');
      } else {
        this.$element.removeClass('vertical-only');
      }
      if (this.targetWidth === 0 || this.targetHeight === 0) {
        this.getDimensions();
      }
      if (changes.watcher) {
        this.$timeout(() => {
          // Define target size depending on isCollapsed
          targetHeight = this.isCollapsed ? 0 : this.targetHeight;
          targetWidth = this.isCollapsed ? 0 : this.targetWidth;
          targetOpacity = this.isCollapsed ? 0 : 1;
          // Add styles
          this.$element.addClass('no-transition');
          this.$element.css({
            height: targetHeight + 'px',
            width: targetWidth + 'px',
            opacity: targetOpacity
          });
        }, 10);
        this.$timeout(() => {
          this.$element.removeClass('no-transition');
        }, 50);
      } else {
        this.$timeout(() => {
          // Define target size depending on isCollapsed
          targetHeight = this.isCollapsed ? 0 : this.targetHeight;
          targetWidth = this.isCollapsed ? 0 : this.targetWidth + 1;
          targetOpacity = this.isCollapsed ? 0 : 1;
          // Add styles
          if (this.isCollapsed || this.verticalOnly) {
            this.$element.removeClass('open');
          } else {
            this.$element.addClass('open');
          }
          this.$element.css({
            height: targetHeight + 'px',
            width: targetWidth + 'px',
            opacity: targetOpacity
          });
        });
      }
    }
    getDimensions() {
      this.$element.addClass('no-transition');
      this.$element.css('width', '');
      this.$element.css('height', '');
      this.targetHeight = this.$element
        .prop('clientHeight');
      this.targetWidth = this.$element
        .prop('clientWidth');
      this.$element.css('width', 0);
      this.$element.css('height', 0);
      this.$element.removeClass('no-transition');
    }
  }
  angular
    .module('webcat.collapse', [])
    .component('wcCollapse', {
      transclude: true,
      controller: Controller,
      template: '<ng-transclude></ng-transclude>',
      bindings: {
        isCollapsed: '<',
        verticalOnly: '<',
        watcher: '<'
      }
    });
}());
