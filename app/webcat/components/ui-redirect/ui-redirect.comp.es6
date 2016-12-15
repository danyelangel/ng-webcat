(function () {
  'use strict';
  class Controller {
    constructor($state, $firedux) {
      this.$state = $state;
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
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
        if (params) {
          this.$firedux.setParams(params);
        } else {
          this.$firedux.setParams(null);
        }
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
        wcUiRedirectSref: '@',
        wcUiRedirectParams: '<',
        wcUiReplace: '@',
        wcUiReload: '@'
      }
    });
}());
