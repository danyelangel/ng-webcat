(function () {
  'use strict';
  class Controller {
    constructor($state) {
      this.$state = $state;
    }
    $onChanges(changes) {
      if (
        changes.wcUiRedirectSref &&
        changes.wcUiRedirectSrefParams
      ) {
        this.redirect(
          this.wcUiRedirectSref,
          this.wcUiRedirectSrefParams
        );
      }
    }
    redirect(state, params) {
      if (angular.isString(state) && angular.isDefined(params)) {
        this.$state.go(state, params);
      } else if (angular.isString(state)) {
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
        wcUiRedirectSrefParams: '<'
      }
    });
}());
