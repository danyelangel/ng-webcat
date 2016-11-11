(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    get $uid() {
      return this.$firedux.UID;
    }
    $onChanges(changes) {
      if (
        changes.fdApiEndpoint ||
        changes.fdApiRequest ||
        changes.fdApiQuery ||
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
        if (angular.isObject(this.fdApiQuery)) {
          this.$query = this.fdApiQuery;
        }
        if (this.fdApiArray) {
          this.$isArray = true;
        }
        this.$path = `api/${uid}/${endpoint}`;
        this.$request = request;
        this.$before = true;
        this.$ready = this.$error = undefined;
      }
    }
    $then(data) {
      this.$ready = true;
      this.then({
        $data: data
      });
    }
    $catch(err) {
      this.$error = true;
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
        fdApiArray: '@',
        then: '&',
        catch: '&'
      }
    });
}());
