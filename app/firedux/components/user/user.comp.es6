(function () {
  'use strict';
  class Controller {
    $then(data) {
      this.then({
        $data: data
      });
    }
    $catch(err) {
      this.catch({
        $error: err
      });
    }
  }
  angular
    .module('firedux.fdUser', [])
    .component('fdUser', {
      controller: Controller,
      templateUrl: 'firedux/components/user/user.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        then: '&',
        catch: '&'
      }
    });
}());
