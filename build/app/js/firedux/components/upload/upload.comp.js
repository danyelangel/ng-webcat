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
        if (changes.fdUploadFile) {
          this.upload(this.fdUploadFile, this.fdUploadFilename);
        }
      }
    }, {
      key: 'upload',
      value: function upload(file, filename) {
        var _this = this;

        var storageRef = this.$firedux.storageRef(),
            uploadTask = storageRef.child(filename || this.$firedux['var']('UID')).put(file);
        this.$before = this.$then = this.$catch = undefined;
        uploadTask.on('state_changed', function (snapshot) {
          var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          progress = Math.floor(progress);
          console.log(progress);
          _this.$before = true;
          _this.before({
            $progress: progress
          });
          _this.$firedux.$apply();
        }, function (err) {
          _this.$catch = true;
          _this.$before = false;
          _this.$firedux.$apply();
          _this['catch']({
            $error: err
          });
        });
        uploadTask.then(function (uploadRef) {
          _this.$then = true;
          _this.$before = false;
          _this.$firedux.$apply();
          _this.then({
            $data: {
              ref: uploadRef.ref.fullPath,
              url: uploadRef.downloadURL
            }
          });
        });
      }
    }]);

    return Controller;
  })();

  angular.module('firedux.fdUpload', []).component('fdUpload', {
    controller: Controller,
    templateUrl: 'firedux/components/upload/upload.html',
    transclude: {
      before: '?before',
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      fdUploadFile: '<',
      fdUploadFilename: '<',
      then: '&',
      'catch': '&',
      before: '&'
    }
  });
})();
//# sourceMappingURL=upload.comp.js.map
