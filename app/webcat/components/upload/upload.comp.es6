(function () {
  'use strict';
  class Controller {
    constructor() {}
  }
  angular
    .module('webcat.wcUpload', [])
    .component('wcUpload', {
      controller: Controller,
      templateUrl: 'webcat/upload/upload.html',
      transclude: {
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        wcUploadMultiple: '<',
        wcUploadDimensions: '<',
        then: '&',
        catch: '&'
      }
    });
}());
