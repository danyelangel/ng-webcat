'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($firedux) {
      _classCallCheck(this, Controller);

      this.$firedux = $firedux;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.fdSetPath || changes.fdSetData || changes.fdSetPresence) {
          this.setData(this.fdSetData, this.getRef(this.fdBindPath), this.fdSetPresence);
        }
      }
    }, {
      key: 'setData',
      value: function setData(data, ref, presence) {
        var _this = this;

        this.$ready = this.$error = undefined;
        ref.set(data).then(function (snapshot) {
          _this.then({
            $data: snapshot.val()
          });
          _this.$ready = true;
        })['catch'](function (err) {
          _this['catch']({
            $error: err
          });
          _this.$error = err;
        });
        if (presence) {
          ref.onDisconnect().remove();
        }
      }
    }, {
      key: 'getRef',
      value: function getRef(path) {
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
    }]);

    return Controller;
  })();

  angular.module('firedux.fdSet', []).component('fdSet', {
    controller: Controller,
    templateUrl: 'firedux/components/set/set.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdSetPath: '@',
      fdSetData: '<',
      fdSetPresence: '@',
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=set.comp.js.map
