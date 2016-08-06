(function () {
  'use strict';
  class Service {
    constructor(StorageApi, $rootScope, Dialog, StorageLabels) {
      this.Storage = StorageApi;
      this.Dialog = Dialog;
      this.$dialog = Dialog.$dialog(StorageLabels);
      this.$rootScope = $rootScope;
    }
    upload(file) {
      let progressDialog = this.$dialog.progress('UPLOAD');
      return new Promise((resolve, reject) => {
        let progress = {};
        progressDialog(progress);
        this.Storage
          .upload(file, (progressPercentage) => {
            progress.percentage = progressPercentage;
            this.$rootScope.$apply();
            if (progress.percentage > 99) {
              this.Dialog.hide();
            }
          })
          .then(resolve)
          .catch(reject);
      });
    }
    remove(ref) {
      return new Promise((resolve, reject) => {
        if (ref) {
          this.Storage
            .remove(ref)
            .then(resolve)
            .catch(reject);
        } else {
          resolve();
        }
      });
    }
  }
  angular
    .module('firedux.storage')
    .service('Storage', Service)
    .constant('StorageLabels', {
      progress: {
        es: {
          UPLOAD: 'Subiendo archivo'
        }
      }
    });
}());
