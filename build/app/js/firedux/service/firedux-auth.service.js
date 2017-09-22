'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Service = (function () {
    function Service() {
      _classCallCheck(this, Service);
    }

    _createClass(Service, [{
      key: 'init',
      value: function init(firebase) {
        var _this = this;

        this.$auth = firebase.auth;
        this.$database = firebase.database;
        this.$auth().onAuthStateChanged(function (authData) {
          _this.auth = authData;
        });
        this.checkLogin();
      }
    }, {
      key: 'checkLogin',
      value: function checkLogin() {
        this.$auth().getRedirectResult()['catch'](function (error) {
          console.log(error);
        });
      }
    }, {
      key: 'waitForAuth',
      value: function waitForAuth(success, error) {
        return this.$auth().onAuthStateChanged(success, error);
      }
    }, {
      key: 'getProvider',
      value: function getProvider(provider, credentials) {
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
          case 'email':
            returnable = new this.$auth.EmailAuthProvider(credentials);
            break;
          default:
            break;
        }
        return returnable;
      }
    }, {
      key: 'link',
      value: function link(provider) {
        return this.auth.link(provider);
      }
    }, {
      key: 'linkWithRedirect',
      value: function linkWithRedirect(provider) {
        return this.auth.linkWithRedirect(provider);
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
        var _this2 = this;

        return this.$auth().signInWithPopup(provider).then(function () {
          return _this2.updateProfilePicture();
        });
      }
    }, {
      key: 'signInWithRedirect',
      value: function signInWithRedirect(provider) {
        var _this3 = this;

        return this.$auth().signInWithRedirect(provider).then(function () {
          return _this3.updateProfilePicture();
        });
      }
    }, {
      key: 'register',
      value: function register(credentials) {
        return this.$auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
      }
    }, {
      key: 'updatePassword',
      value: function updatePassword(oldPassword, newPassword) {
        var _this4 = this;

        var email = this.auth.email;
        return this.auth.reauthenticate(this.$auth.EmailAuthProvider.credential(email, oldPassword)).then(function () {
          return _this4.auth.updatePassword(newPassword);
        });
      }
    }, {
      key: 'updateProfile',
      value: function updateProfile(profile) {
        var newProfile = {};
        if (angular.isString(profile.displayName)) {
          newProfile.displayName = profile.displayName;
        }
        if (angular.isString(profile.photoURL)) {
          newProfile.photoURL = profile.photoURL;
        }
        return this.auth.updateProfile(newProfile);
      }
    }, {
      key: 'updateProfilePicture',
      value: function updateProfilePicture() {
        return this.updateProfile({
          photoURL: (((this.auth || {}).providerData || [])[0] || {}).photoURL || null
        });
      }
    }, {
      key: 'logout',
      value: function logout() {
        var _this5 = this;

        this.$database().goOffline();
        return this.$auth().signOut().then(function () {
          _this5.$database().goOnline();
        });
      }
    }]);

    return Service;
  })();

  angular.module('firedux.auth', []).service('$fireduxAuth', Service);
})();
//# sourceMappingURL=firedux-auth.service.js.map
