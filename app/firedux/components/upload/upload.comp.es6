(function () {
  'use strict';
  class Controller {
    constructor($firedux) {
      this.$firedux = $firedux;
    }
    $onChanges(changes) {
      if (
        changes.fdUploadFile
      ) {
        this.upload(
          this.fdUploadFile,
          this.fdUploadFilename
        );
      }
    }
    upload(file, filename) {
      let storageRef = this.$firedux.storageRef(),
          uploadTask = storageRef
            .child(this.$firedux.var('UID') || filename)
            .put(file);
      this.$before =
      this.$then =
      this.$catch = undefined;
      uploadTask
        .on('state_changed', snapshot => {
          let progress =
            snapshot.bytesTransferred /
            snapshot.totalBytes * 100;
          progress = Math.floor(progress);
          console.log(progress);
          this.$before = true;
          this.before({
            $progress: progress
          });
          this.$firedux.$apply();
        }, err => {
          this.$catch = true;
          this.$before = false;
          this.$firedux.$apply();
          this.catch({
            $error: err
          });
        });
      uploadTask.then(uploadRef => {
        this.$then = true;
        this.$before = false;
        this.$firedux.$apply();
        this.then({
          $data: {
            ref: uploadRef.ref.fullPath,
            url: uploadRef.downloadURL
          }
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
        fdUploadFilename: '<',
        then: '&',
        catch: '&',
        before: '&'
      }
    });
}());
