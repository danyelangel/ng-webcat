(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (changes.fdEnvConstant) {
        this.getConstant(
          this.fdEnvConstant,
          this.fdEnvArray
        );
      }
    }
    getConstant(constant, array) {
      if (angular.isString(constant)) {
        this.$path = `app/constants/${constant}`;
      }
      this.$array = array;
    }
    $then($data) {
      this.then({
        $data
      });
    }
    $catch($errors) {
      this.then({
        $errors
      });
    }
  }
  angular
    .module('firedux.fdEnv', [])
    .component('fdEnv', {
      controller: Controller,
      templateUrl: 'firedux/components/env/env.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdEnvConstant: '@',
        fdEnvArray: '@',
        before: '&',
        then: '&',
        catch: '&'
      }
    });
}());
