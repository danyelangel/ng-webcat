'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var TrackPage = (function () {
    function TrackPage($firedux) {
      _classCallCheck(this, TrackPage);

      this.$firedux = $firedux;
    }

    _createClass(TrackPage, [{
      key: '$onInit',
      value: function $onInit() {
        this.$firedux.analytics().pageView(this.fdTrackPage);
      }
    }]);

    return TrackPage;
  })();

  var TrackPixel = (function () {
    function TrackPixel($firedux) {
      _classCallCheck(this, TrackPixel);

      this.$firedux = $firedux;
    }

    _createClass(TrackPixel, [{
      key: '$onInit',
      value: function $onInit() {
        this.$firedux.analytics().sendPixelHit(this.fdTrackType, this.fdTrackParams);
      }
    }]);

    return TrackPixel;
  })();

  var TrackAnalytics = (function () {
    function TrackAnalytics($firedux) {
      _classCallCheck(this, TrackAnalytics);

      this.$firedux = $firedux;
    }

    _createClass(TrackAnalytics, [{
      key: '$onInit',
      value: function $onInit() {
        this.$firedux.analytics().sendAnalyticsHit(this.fdTrackType, this.fdTrackParams);
      }
    }]);

    return TrackAnalytics;
  })();

  angular.module('firedux.fdTrack', []).component('fdTrackPage', {
    controller: TrackPage,
    bindings: {
      fdTrackPage: '@'
    }
  }).component('fdTrackPixel', {
    controller: TrackPixel,
    bindings: {
      fdTrackType: '@',
      fdTrackParams: '<'
    }
  }).component('fdTrackAnalytics', {
    controller: TrackAnalytics,
    bindings: {
      fdTrackType: '@',
      fdTrackParams: '<'
    }
  });
})();
//# sourceMappingURL=track.comp.js.map
