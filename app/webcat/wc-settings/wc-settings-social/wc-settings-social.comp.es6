(function () {
  'use strict';
  class Controller {
    constructor(Dialog) {
      this.$dialog = Dialog.$dialog({
        prompt: {
          es: {
            GET_URL: {
              title: 'Enter Url',
              description: 'Leave blank if you want to remove the icon'
            }
          }
        }
      });
    }
    update(icon) {
      let data = {};
      if (angular.isObject(this.data)) {
        data = this.data;
      }
      this.$dialog.prompt('GET_URL')().then(url => {
        data[icon] = url ? url : '';
        this.onUpdate({
          $data: data
        });
      });
    }
  }
  angular
    .module('webcat.settings')
    .component('wcSettingsSocial', {
      templateUrl: '_components/_webcat/wc-settings/wc-settings-social/wc-settings-social.html',
      controller: Controller,
      bindings: {
        data: '<',
        onUpdate: '&'
      }
    });
}());
