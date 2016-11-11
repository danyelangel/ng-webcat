'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Service = (function () {
    function Service($window) {
      var _this = this;

      _classCallCheck(this, Service);

      this.$auth = $window.firebase.auth;
      this.waitForAuth().then(function (authData) {
        _this.auth = authData;
      });
    }

    _createClass(Service, [{
      key: 'waitForAuth',
      value: function waitForAuth() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          _this2.$auth().onAuthStateChanged(function (authData) {
            if (authData) {
              resolve(authData);
            } else {
              reject();
            }
          });
        });
      }
    }, {
      key: 'getProvider',
      value: function getProvider(provider) {
        var returnable = undefined;
        switch (provider) {
          case 'facebook':
            returnable = new this.$auth.FacebookAuthProvider();
            break;
          case 'twitter':
            returnable = new this.$auth.TwitterAuthProvider();
            break;
          case 'google':
            returnable = new this.$auth.GoogleAuthProvider();
            break;
          default:
            break;
        }
        return returnable;
      }
    }, {
      key: 'signInAnonymously',
      value: function signInAnonymously() {
        return this.$auth().signInAnonymously();
      }
    }, {
      key: 'signInWithEmailAndPassword',
      value: function signInWithEmailAndPassword() {
        var credentials = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this.$auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      }
    }, {
      key: 'signInWithPopup',
      value: function signInWithPopup(provider) {
        return this.$auth().signInWithPopup(provider);
      }
    }]);

    return Service;
  })();

  angular.module('webcat.$fireduxAuth', []).service('$fireduxAuth', Service);
})();
//# sourceMappingURL=firedux-auth.service.js.map
