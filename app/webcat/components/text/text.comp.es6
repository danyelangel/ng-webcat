(function () {
  'use strict';
  class Controller {
    constructor($timeout, $element, $window) {
      this.$element = $element;
      this.$timeout = $timeout;
      this._ = $window._;
      this.$then = this._.throttle(data => {
        this.then(data);
      }, 1000, {
        leading: true
      });
    }
    $onChanges() {
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
      this.$timeout(() => {
        this.show = true;
      });
    }
    buildButtons(controls = '') {
      const buttonDefinitions = {
        b: 'bold',
        i: 'italic',
        a: 'anchor',
        h2: 'h2',
        h3: 'h3'
      };
      let buttons = [];
      angular.forEach(buttonDefinitions, (def, key) => {
        if (controls.indexOf(key) >= 0) {
          buttons.push(def);
        }
      });
      return buttons.length > 0 ? {
        buttons
      } : false;
    }
  }
  angular
    .module('webcat.wcText', [
      'angular-medium-editor',
      'ngSanitize'
    ])
    .component('wcText', {
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
}());
