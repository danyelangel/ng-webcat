(function () {
  'use strict';
  class Controller {
    constructor($window, $firedux, $document, md5) {
      this.$window = $window;
      this.$firedux = $firedux;
      this.$document = $document;
      this.md5 = md5;
    }
    $onChanges() {
      let $data;
      this.$hash = this.md5.createHash(this.wcIdenticonEmail || null);
      this.$firedux.$apply();
      this.$firedux.$timeout(() => {
        this.$window.jdenticon();
        $data = this.$document[0]
          .getElementById('webcat-identicon-canvas')
          .toDataURL();
        this.then({
          $data
        });
        this.$hash = undefined;
        this.$firedux.$apply();
      });
    }
  }
  angular
    .module('webcat.wcIdenticon', [
      'angular-md5'
    ])
    .component('wcIdenticon', {
      controller: Controller,
      templateUrl: 'webcat/components/identicon/identicon.html',
      transclude: {
        then: '?then',
        catch: '?catch',
        before: '?before'
      },
      bindings: {
        wcIdenticonEmail: '@',
        then: '&'
      }
    });
}());
