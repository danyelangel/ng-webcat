(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onInit() {
      this.$before = true;
      this.$firedux
        .waitForAuth(authData => {
          this.$firedux.$apply();
          if (authData) {
            this.$then(authData);
          } else {
            this.$catch(authData);
          }
        }, () => {
          this.$firedux.$apply();
          this.$catch();
        });
    }
    $reset() {
      this.$ready = undefined;
      this.$before = undefined;
      this.$error = undefined;
    }
    $then(authData) {
      this.$reset();
      this.$ready = true;
      this.$before = undefined;
      this.then({
        $data: authData
      });
    }
    $catch() {
      this.$reset();
      this.$error = true;
      this.$before = undefined;
      this.catch();
      this.then({
        $data: null
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
