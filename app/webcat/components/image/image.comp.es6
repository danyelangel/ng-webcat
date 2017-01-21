(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      $firedux.val('PROJECT_ID').watch(val => {
        this.project = val;
      });
    }
    $ngInit() {
      this.then({
        data: `http://${this.project}.appspot.com/?image=${this.wcImageRef}&size=${this.wcImageSize}&project=${this.project}`
      });
    }
  }
  angular
    .module('webcat.wcImageSrc', [])
    .component('wcImageSrc', {
      controller: Controller,
      bindings: {
        wcImageRef: '<',
        wcImageSize: '<',
        then: '&'
      }
    });
}());
