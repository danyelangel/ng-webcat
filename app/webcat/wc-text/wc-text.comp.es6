(function () {
  'use strict';
  class Controller {
    constructor($timeout, $element, Auth) {
      this.$element = $element;
      this.$timeout = $timeout;
      this.Auth = Auth;
    }
    get authData() {
      return this.Auth.authData;
    }
    $onChanges() {
      this.show = false;
      this.disableEditing = this.authData ? this.disableEditing : true;
      this.richSettings = {
        targetBlank: true,

        // Config
        disableExtraSpaces: true,
        disableReturn: false,
        toolbar: this.disableEditing ? false : {
          buttons: ['bold', 'italic', 'anchor', 'h2', 'h3']
        },

        // State
        disableEditing: this.disableEditing
      };
      this.inlineSettings = {
        disableReturn: true,
        disableExtraSpaces: true,
        toolbar: false,
        // State
        disableEditing: this.disableEditing
      };
      this.settings = this.isRich ? this.richSettings : this.inlineSettings;
      this.$timeout(() => {
        this.show = true;
      });
    }
  }
  angular
    .module('webcat.text', [
      'angular-medium-editor'
    ])
    .component('wcText', {
      templateUrl: '_components/_webcat/wc-text/wc-text.html',
      controller: Controller,
      bindings: {
        data: '<',
        isRich: '<',
        placeholder: '@',
        onUpdate: '&',
        disableEditing: '<',
        wcHref: '@'
      }
    });
}());
