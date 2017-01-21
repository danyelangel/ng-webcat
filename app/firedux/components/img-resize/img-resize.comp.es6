(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (changes.fdImgUrl || changes.fdImgSize) {
        this.getUrl();
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
      }
    }
  }
  angular
    .module('firedux.fdImgResize', [])
    .component('fdImgResize', {
      controller: Controller,
      bindings: {
        fdImgUrl: '@',
        fdImgSize: '<',
        then: '@'
      }
    });
}());
