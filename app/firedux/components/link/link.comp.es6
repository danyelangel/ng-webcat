(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      this.$ready = this.$error = undefined;
      if (
        changes.fdLinkProvider ||
        changes.fdLinkCredentials
      ) {
        this.link(
          this.fdLinkProvider,
          this.fdLinkCredentials,
          'redirect'
        );
      }
    }
    link(provider, credentials, method) {
      this.$before = true;
      this.$firedux
        .link(
          provider,
          credentials,
          method
        )
        .then(authData => {
          this.$ready = true;
          this.$before = undefined;
          this.$firedux.$apply();
          this.then({
            $data: authData
          });
        })
        .catch(error => {
          this.$error = error;
          this.$before = undefined;
          this.$firedux.$apply();
          this.catch({
            $error: error
          });
        });
    }
  }
  angular
    .module('firedux.fdLink', [])
    .component('fdLink', {
      controller: Controller,
      templateUrl: 'firedux/components/link/_link.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdLinkProvider: '@',
        fdLinkCredentials: '<',
        then: '&',
        catch: '&'
      }
    });
}());
