(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
        changes.fdSetPath ||
        changes.fdSetData ||
        changes.fdSetPresence
      ) {
        this.setData(
          this.fdSetData,
          this.getRef(this.fdSetPath),
          this.fdSetPresence
        );
      }
    }
    setData(data, ref, presence) {
      this.$loading = true;
      this.$ready = this.$error = undefined;
      ref.set(data)
        .then(() => {
          this.then();
          this.$loading = false;
          this.$ready = true;
          this.$firedux.$apply();
        })
        .catch(err => {
          this.catch({
            $error: err
          });
          this.$loading = false;
          this.$error = err;
          this.$firedux.$apply();
        });
      if (presence) {
        ref.onDisconnect().remove();
      }
    }
    getRef(path) {
      if (!angular.isString(path)) {
        this.catch({
          $error: {
            type: 'Path is not a string'
          }
        });
      } else {
        return this.$firedux.ref(path);
      }
    }
  }
  angular
    .module('firedux.fdSet', [])
    .component('fdSet', {
      controller: Controller,
      templateUrl: 'firedux/components/set/set.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdSetPath: '@',
        fdSetData: '<',
        fdSetPresence: '<',
        then: '&',
        catch: '&'
      }
    });
}());
