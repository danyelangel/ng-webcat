'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Service = (function () {
    function Service($window) {
      _classCallCheck(this, Service);

      this.firebase = $window.firebase;
    }

    _createClass(Service, [{
      key: 'ref',
      value: function ref(path) {
        return this.firebase.storage().ref(path);
      }
    }, {
      key: 'refFromURL',
      value: function refFromURL(url) {
        return this.firebase.storage().refFromURL(url);
      }
    }, {
      key: 'getResizeableUrl',
      value: function getResizeableUrl(url, size) {
        var ref = this.refFromURL(url),
            project = ref.bucket.split('.')[0],
            image = ref.fullPath;
        return 'https://' + project + '.appspot.com/?project=' + project + '&image=' + image + '&size=' + size;
      }
    }]);

    return Service;
  })();

  angular.module('firedux.storage', []).service('$fireduxStorage', Service);
})();
//# sourceMappingURL=firedux-storage.service.js.map
