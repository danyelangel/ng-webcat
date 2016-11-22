(function () {
  'use strict';
  class Controller {
    $then(file) {
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
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        wcUploadMultiple: '<',
        wcUploadDimensions: '<',
        then: '&'
      }
    });
}());
