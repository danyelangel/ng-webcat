(function () {
  'use strict';
  class Controller {
    constructor(Auth, Dialog, $timeout) {
      this.Auth = Auth;
      this.$timeout = $timeout;
      this.$dialog = Dialog.$dialog({
        prompt: {
          es: {
            SELECT_YOUTUBE: {
              title: 'Add Youtube video',
              description: 'Enter the url of the video that you want to embed'
            }
          }
        }
      });
    }
    get authData() {
      return this.Auth.authData;
    }
    getUrl() {
      let prompt = this.$dialog.prompt('SELECT_YOUTUBE');
      prompt().then(link => {
        let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
            videoId = link.match(regex)[1];
        this.onUpdate({
          $data: {
            ref: videoId,
            url: null
          }
        });
        this.disabled = true;
        this.$timeout(() => {
          this.disabled = false;
        });
      });
    }
  }
  angular
    .module('webcat.youtube', [
      'oblador.lazytube'
    ])
    .component('wcYoutube', {
      templateUrl: '_components/_webcat/wc-youtube/wc-youtube.html',
      controller: Controller,
      transclude: true,
      bindings: {
        // Data
        data: '<',

        // Events
        onUpdate: '&',

        // Positioning
        position: '@',
        readonly: '<'
      }
    });
}());
