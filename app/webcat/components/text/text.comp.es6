(function () {
  'use strict';
  class Controller {
    constructor($timeout, $element) {
      this.$element = $element;
      this.$timeout = $timeout;
    }
    $onChanges() {
      this.show = false;
      this.wcDisabled = !!this.wcDisabled;
      this.richSettings = {
        targetBlank: true,

        // Config
        disableExtraSpaces: true,
        disableReturn: false,
        toolbar: this.wcDisabled ? false : {
          buttons: ['bold', 'italic', 'anchor', 'h2', 'h3']
        },

        // State
        disableEditing: this.wcDisabled
      };
      this.inlineSettings = {
        disableReturn: true,
        disableExtraSpaces: true,
        toolbar: false,
        // State
        disableEditing: this.wcDisabled
      };
      this.settings = this.wcRich ? this.richSettings : this.inlineSettings;
      this.$timeout(() => {
        this.show = true;
      });
    }
  }
  angular
    .module('webcat.wcText', [
      'angular-medium-editor'
    ])
    .component('wcText', {
      controller: Controller,
      templateUrl: 'webcat/components/text/text.html',
      bindings: {
        wcData: '<',
        wcRich: '<',
        wcPlaceholder: '@',
        wcDisabled: '<',
        wcHref: '@',
        then: '&'
      }
    });
}());
