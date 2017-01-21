(function () {
  'use strict';
  class TrackPage {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$firedux
        .analytics()
        .pageView(this.fdTrackPage);
    }
  }
  class TrackPixel {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$firedux
        .analytics()
        .sendPixelHit(
          this.fdTrackType,
          this.fdTrackParams);
    }
  }
  class TrackAnalytics {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$firedux
        .analytics()
        .sendAnalyticsHit(
          this.fdTrackType,
          this.fdTrackParams);
    }
  }
  angular
    .module('firedux.fdTrack', [])
    .component('fdTrackPage', {
      controller: TrackPage,
      bindings: {
        fdTrackPage: '@'
      }
    })
    .component('fdTrackPixel', {
      controller: TrackPixel,
      bindings: {
        fdTrackType: '@',
        fdTrackParams: '<'
      }
    })
    .component('fdTrackAnalytics', {
      controller: TrackAnalytics,
      bindings: {
        fdTrackType: '@',
        fdTrackParams: '<'
      }
    });
}());
