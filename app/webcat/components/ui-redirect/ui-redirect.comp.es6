(function () {
  'use strict';
  class Controller {
    constructor($state, $firedux, $window) {
      this.$state = $state;
      this.$firedux = $firedux;
      this.$window = $window;
    }
    $onChanges(changes) {
      if (this.wcUiRedirectBack) {
        this.$window.history.back();
      } else if (
        changes.wcUiRedirectSref ||
        changes.wcUiRedirectParams
      ) {
        this.redirect(
          this.wcUiRedirectSref,
          this.wcUiRedirectParams,
          this.wcUiReload
        );
      } else if (changes.wcUiReload) {
        this.$state.reload();
      }
    }
    redirect(state, params) {
      if (angular.isString(state)) {
        this.$state.go(state, params, {
          location: this.wcUiReplace ? 'replace' : true,
          reload: this.wcUiReload ? true : false
        });
      }
    }
  }
  angular
    .module('webcat.wcUiRedirect', [])
    .component('wcUiRedirect', {
      controller: Controller,
      bindings: {
        wcUiRedirectBack: '@',
        wcUiRedirectSref: '@',
        wcUiRedirectParams: '<',
        wcUiReplace: '@',
        wcUiReload: '@'
      }
    });
}());
