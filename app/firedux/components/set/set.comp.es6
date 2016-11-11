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
          this.getRef(this.fdBindPath),
          this.fdSetPresence
        );
      }
    }
    setData(data, ref, presence) {
      this.$ready = this.$error = undefined;
      ref.set(data)
        .then(snapshot => {
          this.then({
            $data: snapshot.val()
          });
          this.$ready = true;
        })
        .catch(err => {
          this.catch({
            $error: err
          });
          this.$error = err;
        });
      if (presence) {
        ref.onDisconnect().remove();
      }
    }
    getRef(path) {
      if (!angular.isString(path)) {
        this.onSetError({
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
        fdSetPresence: '@',
        then: '&',
        catch: '&'
      }
    });
}());
