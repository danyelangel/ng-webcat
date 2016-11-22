(function () {
  'use strict';
  class Controller {
    $then(file) {
      this.$ready = true;
      this.then({
        $data: file
      });
    }
  }
  angular
    .module('webcat.wcUpload', [
      'ngFileUpload'
    ])
    .component('wcUpload', {
      controller: Controller,
      templateUrl: 'webcat/components/upload/upload.html',
      transclude: {
        then: '?then'
      },
      bindings: {
        wcUploadMultiple: '<',
        wcUploadDimensions: '<',
        then: '&'
      }
    });
}());
