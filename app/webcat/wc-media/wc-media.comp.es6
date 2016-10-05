(function () {
  'use strict';
  class Controller {
    constructor(Storage, Auth, $mdMedia, $firedux) {
      this.Storage = Storage;
      this.Auth = Auth;
      this.$mdMedia = $mdMedia;
      this.$firedux = $firedux;
    }
    // Firedux
    get authData() {
      return this.Auth.authData;
    }
    get projectUrl() {
      return this.$firedux.projectUrl;
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
      if (size < 1280 && this.isBackground) {
        size = 1280;
      }
      if (this.isResponsive && ref) {
        returnable = `http://${this.projectUrl}/?image=${ref}&size=${size}`;
      } else if (!this.isResponsive && ref) {
        returnable = this.data.url;
      } else {
        returnable = 'https://bytesizemoments.com/wp-content/uploads/2014/04/placeholder3.png';
      }
      return returnable;
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
    // Operations
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
    // Styling
    get parallaxTransform() {
      let ratio = 2 / (1 - this.parallaxHeight / 100),
          translation = -100 / ratio;
      return `translateZ(-1px) translateY(${translation}vh) scale(2)`;
    }
    get backgroundStyles() {
      return this.data ? {
        backgroundImage: `url(${this.getUrl(this.data.ref)})`
      } : null;
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
        onReady: '&',
        removeOnDestroy: '<',

        // Positioning
        isBackground: '<',
        position: '@',
        marginTop: '@',
        parallaxHeight: '@'
      }
    })
    .directive('imageonload', () => {
      return {
        restrict: 'A',
        scope: {
          imageonload: '&'
        },
        link: function (scope, element) {
          element.bind('load', () => {
            scope.imageonload();
            scope.$apply();
          });
          element.bind('error', () => {
            scope.imageonload();
            scope.$apply();
          });
        }
      };
    });
}());
