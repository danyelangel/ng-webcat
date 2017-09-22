'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Service = (function () {
    function Service($window, $rootScope) {
      _classCallCheck(this, Service);

      this.$window = $window;
      this.$rootScope = $rootScope;
    }

    _createClass(Service, [{
      key: 'init',
      value: function init(analytics, pixel) {
        if (angular.isFunction(this.$window.ga) && angular.isString(analytics)) {
          this.$window.ga('create', analytics, 'auto');
        }
        if (angular.isFunction(this.$window.fbq) && angular.isString(pixel)) {
          this.$window.fbq('init', pixel);
        }
        if (analytics || pixel) {
          this.trackPageViews();
          this.trackDispatcher();
        }
      }

      // ANALYTICS
    }, {
      key: 'sendAnalyticsHit',
      value: function sendAnalyticsHit(hitType) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (angular.isString(hitType) && angular.isFunction(this.$window.ga)) {
          var hit = Object.assign({ hitType: hitType }, params);
          this.$window.ga('send', hit);
        }
      }

      // PIXEL
    }, {
      key: 'sendPixelHit',
      value: function sendPixelHit(hitType) {
        var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (angular.isString(hitType) && angular.isFunction(this.$window.fbq)) {
          this.$window.fbq('track', hitType, params);
        }
      }

      // TRACKERS
    }, {
      key: 'trackPageViews',
      value: function trackPageViews() {
        var _this = this;

        function toUrl(state) {
          return state.split('.').join('/');
        }
        this.$rootScope.$on('$stateChangeSuccess', function (event, toState) {
          _this.pageView(toUrl(toState.name));
        });
      }
    }, {
      key: 'trackDispatcher',
      value: function trackDispatcher() {
        var _this2 = this;

        this.$rootScope.$on('fd:action', function (event, data) {
          _this2.action(data);
        });
        this.$rootScope.$on('fd:error', function (event, data) {
          _this2.error(data);
        });
      }

      // EVENTS
    }, {
      key: 'pageView',
      value: function pageView(page) {
        if (angular.isString(page)) {
          this.sendAnalyticsHit('pageview', { page: page });
          this.sendPixelHit('ViewContent', {
            /* eslint-disable */
            /* jshint ignore:start */
            content_name: page
            /* jshint ignore:end */
            /* eslint-enable */
          });
        }
      }
    }, {
      key: 'error',
      value: function error(exDescription) {
        if (angular.isString(exDescription)) {
          this.sendAnalyticsHit('exception', { exDescription: exDescription });
        }
      }
    }, {
      key: 'action',
      value: function action(eventAction, eventLabel) {
        if (angular.isString(eventAction)) {
          this.sendAnalyticsHit('event', {
            eventCategory: 'Action',
            eventAction: eventAction,
            eventLabel: eventLabel
          });
        }
      }
    }]);

    return Service;
  })();

  angular.module('firedux.analytics', []).service('$fireduxAnalytics', Service);
})();
//# sourceMappingURL=firedux-analytics.service.js.map
