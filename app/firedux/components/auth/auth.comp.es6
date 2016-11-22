(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$before = true;
      this.$firedux
        .waitForAuth((authData) => {
          this.$firedux.$apply();
          this.$ready = true;
          this.$before = undefined;
          this.then({
            $data: authData
          });
        }, () => {
          this.$firedux.$apply();
          this.$error = true;
          this.$before = undefined;
          this.catch();
        });
    }
  }
  angular
    .module('firedux.fdAuth', [])
    .component('fdAuth', {
      controller: Controller,
      templateUrl: 'firedux/components/auth/auth.html',
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
