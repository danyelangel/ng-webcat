(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
      this.$uid = this.$firedux.var('UID');
    }
    $onChanges(changes) {
      if (
        changes.fdApiEndpoint ||
        changes.fdApiRequest ||
        changes.fdApiArray
      ) {
        this.makeRequest();
      }
    }
    makeRequest() {
      let endpoint = this.fdApiEndpoint,
          request = this.fdApiRequest,
          uid = this.$uid;
      if (
        angular.isString(endpoint) &&
        angular.isDefined(request)
      ) {
        this.$isArray = this.fdApiArray;
        this.$path = `api/${endpoint}/${uid}`;
        this.$request = {
          request: request,
          timestamp: this.$firedux.var('TIMESTAMP')
        };
        this.$before = true;
        this.$ready = this.$error = undefined;
      }
    }
    $then(data) {
      this.$ready = true;
      this.$before = false;
      this.then({
        $data: data
      });
    }
    $catch(err) {
      this.$error = true;
      this.$before = false;
      this.catch({
        $error: err
      });
    }
  }
  angular
    .module('firedux.fdApi', [])
    .component('fdApi', {
      controller: Controller,
      templateUrl: 'firedux/components/api/api.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdApiEndpoint: '@',
        fdApiRequest: '<',
        fdApiArray: '<',
        then: '&',
        catch: '&'
      }
    });
}());
