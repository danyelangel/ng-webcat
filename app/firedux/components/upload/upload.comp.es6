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
          this.fdUploadFile
        );
      }
    }
    upload(file) {
      let storageRef = this.$firedux.storageRef(),
          uploadTask = storageRef
            .child(this.$firedux.var('UID'))
            .put(file);
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
        then: '&',
        catch: '&',
        before: '&'
      }
    });
}());
