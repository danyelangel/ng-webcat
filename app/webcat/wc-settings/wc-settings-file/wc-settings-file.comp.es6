(function () {
  'use strict';
  class Controller {
    constructor(Storage) {
      this.Storage = Storage;
    }
    delete() {
      Promise.resolve()
        .then(() => {
          return this.Storage.remove(this.data.ref);
        })
        .then(() => {
          this.onUpdate({
            $data: null
          });
        });
    }
    update(file) {
      let fileRef;
      if (file) {
        Promise.resolve()
          .then(() => {
            return this.Storage.upload(file);
          })
          .then((ref) => {
            let promise = Promise.resolve();
            fileRef = ref;
            if (angular.isObject(this.data)) {
              promise = this.Storage.remove(this.data.ref);
            }
            return promise;
          })
          .then(() => {
            this.onUpdate({
              $data: fileRef
            });
          });
      }
    }
  }
  angular
    .module('webcat.settings')
    .component('wcSettingsFile', {
      templateUrl: 'webcat/wc-settings/wc-settings-file/wc-settings-file.html',
      controller: Controller,
      bindings: {
        data: '<',
        uploadIcon: '@',
        removeIcon: '@',
        uploadText: '@',
        removeText: '@',
        dimensions: '<',
        onUpdate: '&'
      }
    });
}());
