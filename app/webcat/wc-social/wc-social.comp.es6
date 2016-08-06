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
    .module('webcat.social', [])
    .component('wcSocial', {
      templateUrl: 'webcat/wc-social/wc-social.html',
      controller: Controller,
      bindings: {
        data: '<',
        placeholder: '@',
        readonly: '<',
        onUpdate: '&'
      }
    });
}());
