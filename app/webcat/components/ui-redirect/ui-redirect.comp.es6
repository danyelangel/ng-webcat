(function () {
  'use strict';
  class Controller {
    constructor($state, $firedux) {
      this.$state = $state;
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
        changes.wcUiRedirectSref &&
        changes.wcUiRedirectParams
      ) {
        this.redirect(
          this.wcUiRedirectSref,
          this.wcUiRedirectParams
        );
      }
    }
    redirect(state, params) {
      if (angular.isDefined(params)) {
        this.$firedux.setParams(params);
      }
      if (angular.isString(state)) {
        this.$state.go(state);
      }
    }
  }
  angular
    .module('webcat.wcUiRedirect', [])
    .component('wcUiRedirect', {
      controller: Controller,
      bindings: {
        wcUiRedirectSref: '@',
        wcUiRedirectParams: '<'
      }
    });
}());
