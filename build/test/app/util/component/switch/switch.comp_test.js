/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('fancyButton', function () {
  var scope;
  var element;

  beforeEach(module('webcat.utilSwitch', 'util/component/switch/switch.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('\n<fd-util-switch if="$ctrl.condition">\n  <then ng-init="$ctrl.result=true"></then>\n  <catch ng-init="$ctrl.result=false"></catch>\n</fd-util-switch>\n    '))(scope);
  }));

  it('should work with if', function () {
    scope.condition = true;
    scope.$apply();
    expect(element.isolateScope().ready).toEqual(true);
  });
});