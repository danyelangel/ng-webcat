(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
        changes.fdUploadFile ||
        changes.fdUploadFilename
      ) {
        this.upload(
          changes.fdUploadFile,
          changes.fdUploadFilename
        );
      }
    }
    upload(file, filename = 'file') {
      let storageRef = this.$firedux.storageRef(),
          uploadTask = storageRef
            .child(this.$firedux.var('UID'))
            .child(filename)
            .put(file);
      console.log(this.$firedux.var('UID'));
      this.$before =
      this.$then =
      this.$catch = undefined;
      uploadTask
        .on('state_changed', snapshot => {
          let progress =
            snapshot.bytesTransferred /
            snapshot.totalBytes * 100;
          this.$before = true;
          this.before({
            $progress: progress
          });
        }, err => {
          this.$catch = true;
          this.catch({
            $error: err
          });
        });
      uploadTask.then(uploadRef => {
        this.$then = true;
        uploadRef
          .getDownloadURL()
          .then(downloadURL => {
            this.then({
              $data: {
                ref: uploadRef.fullPath,
                url: downloadURL
              }
            });
          });
      });
    }
  }
  angular
    .module('firedux.fdUpload', [])
    .component('fdUpload', {
      controller: Controller,
      templateUrl: 'firedux/components/upload/upload.html',
      transclude: {
        before: '?before',
        then: '?then',
        catch: '?catch'
      },
      bindings: {
        fdUploadFile: '<',
        fdUploadFilename: '@',
        then: '&',
        catch: '&',
        before: '&'
      }
    });
}());
