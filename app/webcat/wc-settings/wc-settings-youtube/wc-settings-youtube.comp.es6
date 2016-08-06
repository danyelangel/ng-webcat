(function () {
  'use strict';
  class Controller {
    constructor(Dialog) {
      this.$dialog = Dialog.$dialog({
        prompt: {
          es: {
            SELECT_YOUTUBE: {
              title: 'Add Youtube Video',
              description: 'Enter the url of the video that you want to embed'
            }
          }
        }
      });
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
      });
    }
  }
  angular
    .module('webcat.settings')
    .component('wcSettingsYoutube', {
      templateUrl: 'webcat/wc-settings/wc-settings-youtube/wc-settings-youtube.html',
      controller: Controller,
      bindings: {
        data: '<',
        onUpdate: '&'
      }
    });
}());
