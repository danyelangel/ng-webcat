(function () {
  'use strict';
  class Service {
    constructor($window, $rootScope) {
      this.$window = $window.ga;
      this.$rootScope = $rootScope;
    }
    init(code) {
      if (
        angular.isFunction(this.ga) &&
        angular.isString(code)
      ) {
        this.$window.ga('create', code, 'auto');
        this.trackPageViews();
        this.trackDispatcher();
      } else {
        console.warn('Analytics is not loaded');
      }
    }
    sendHit(hitType, params = {}) {
      if (
        angular.isString(hitType) &&
        angular.isFunction(this.ga)
      ) {
        let hit = Object.assign({hitType}, params);
        console.log(hit);
        this.$window.ga(
          'send',
          hit
        );
      }
    }
    pageView(page) {
      if (angular.isString(page)) {
        this.sendHit('pageview', {page});
      }
    }
    trackPageViews() {
      function toUrl(state) {
        return state.split('.').join('/');
      }
      this.$rootScope.$on(
        '$stateChangeSuccess',
        (event, toState) => {
          this.pageView(toUrl(toState.name));
        });
    }
    trackDispatcher() {
      this.$rootScope.$on(
        'fd:action',
        (event, data) => {
          this.action(data);
        });
      this.$rootScope.$on(
        'fd:error',
        (event, data) => {
          this.error(data);
        });
    }
    error(exDescription) {
      if (angular.isString(exDescription)) {
        this.sendHit('exception', {exDescription});
      }
    }
    action(eventAction) {
      if (angular.isString(eventAction)) {
        this.sendHit('event', {
          eventCategory: 'Action',
          eventAction
        });
      }
    }
  }
  angular
    .module('firedux.analytics', [])
    .service('$fireduxAnalytics', Service);
}());
