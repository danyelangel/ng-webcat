(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      this.$ready = this.$error = false;
      if (changes.fdImgUrl || changes.fdImgSize) {
        this.getUrl();
      } else {
        this.$error = true;
      }
    }
    getUrl() {
      if (
        angular.isString(this.fdImgUrl) &&
        angular.isNumber(this.fdImgSize)
      ) {
        let url = this.fdImgUrl,
            size = this.fdImgSize;
        this.then({
          $data: this.$firedux
            .storage()
            .getResizeableUrl(url, size)
        });
        this.$ready = true;
      }
    }
  }
  angular
    .module('firedux.fdImgResize', [])
    .component('fdImgResize', {
      controller: Controller,
      templateUrl: 'firedux/components/img-resize/img-resize.html',
      transclude: {
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdImgUrl: '@',
        fdImgSize: '<',
        then: '&'
      }
    });
}());
