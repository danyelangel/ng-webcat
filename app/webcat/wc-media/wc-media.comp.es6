(function () {
  'use strict';
  class Controller {
    constructor(Storage, Auth, $mdMedia, $firedux) {
      this.Storage = Storage;
      this.Auth = Auth;
      this.$mdMedia = $mdMedia;
      this.$firedux = $firedux;
    }
    get authData() {
      return this.Auth.authData;
    }
    get projectUrl() {
      return this.$firedux.projectUrl;
    }
    $onChanges(changes) {
      angular.forEach(changes, (key, value) => {
        if (angular.isObject(value.currentValue)) {
          this[key] = Object.assign({}, value.currentValue);
        }
      });
      if (changes.removeOnDestroy) {
        if (this.removeOnDestroy) {
          this.Storage.remove(this.data.ref);
        }
      }
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
    getUrl(ref) {
      let size = 1920,
          returnable;
      if (this.$mdMedia('gt-lg')) {
        size = 1920;
      } else if (this.$mdMedia('gt-md')) {
        size = 1280;
      } else if (this.$mdMedia('gt-sm')) {
        size = 960;
      } else {
        size = 600;
      }
      if (ref) {
        returnable = `http://${this.projectUrl}/?image=${ref}&size=${size}`;
      } else {
        returnable = 'http://www.cheerfulheartsfoundation.org/wp-content/uploads/2013/04/placeholder.png';
      }
      return returnable;
    }
  }
  angular
    .module('webcat.media', [
      'ngFileUpload',
      'oblador.lazytube'
    ])
    .component('wcMedia', {
      templateUrl: 'webcat/wc-media/wc-media.html',
      controller: Controller,
      transclude: true,
      bindings: {
        // Data
        data: '<',
        dimensions: '<',

        // Events
        onClick: '&',
        onUpdate: '&',
        removeOnDestroy: '<',

        // Positioning
        isBackground: '<',
        position: '@',
        marginTop: '@'
      }
    });
}());
