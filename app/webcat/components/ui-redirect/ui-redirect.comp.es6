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
          location: this.wcUiReplace ? 'replace' : this.getLocation(),
          reload: this.wcUiReload ? true : false
        });
      }
    }
    getLocation() {
      return angular.isUndefined(this.wcUiLocation) ? true : this.wcUiLocation;
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
        wcUiLocation: '<',
        wcUiReplace: '@',
        wcUiReload: '@'
      }
    });
}());
