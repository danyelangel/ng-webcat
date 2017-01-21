(function () {
  'use strict';
  class Service {
    constructor($window, $rootScope) {
      this.$window = $window;
      this.$rootScope = $rootScope;
    }
    init(analytics, pixel) {
      if (
        angular.isFunction(this.$window.ga) &&
        angular.isString(analytics)
      ) {
        this.$window.ga('create', analytics, 'auto');
      }
      if (
        angular.isFunction(this.$window.fbq) &&
        angular.isString(pixel)
      ) {
        this.$window.fbq('init', pixel);
      }
      if (analytics || pixel) {
        this.trackPageViews();
        this.trackDispatcher();
      }
    }
    // ANALYTICS
    sendAnalyticsHit(hitType, params = {}) {
      if (
        angular.isString(hitType) &&
        angular.isFunction(this.$window.ga)
      ) {
        let hit = Object.assign({hitType}, params);
        this.$window.ga(
          'send',
          hit
        );
      }
    }
    // PIXEL
    sendPixelHit(hitType, params = {}) {
      if (
        angular.isString(hitType) &&
        angular.isFunction(this.$window.fbq)
      ) {
        this.$window.fbq(
          'track',
          hitType,
          params
        );
      }
    }
    // TRACKERS
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
    // EVENTS
    pageView(page) {
      if (angular.isString(page)) {
        this.sendAnalyticsHit('pageview', {page});
        this.sendPixelHit('ViewContent', {
          /* eslint-disable */
          /* jshint ignore:start */
          content_name: page
          /* jshint ignore:end */
          /* eslint-enable */
        });
      }
    }
    error(exDescription) {
      if (angular.isString(exDescription)) {
        this.sendAnalyticsHit('exception', {exDescription});
      }
    }
    action(eventAction, eventLabel) {
      if (angular.isString(eventAction)) {
        this.sendAnalyticsHit('event', {
          eventCategory: 'Action',
          eventAction,
          eventLabel
        });
      }
    }
  }
  angular
    .module('firedux.analytics', [])
    .service('$fireduxAnalytics', Service);
}());
