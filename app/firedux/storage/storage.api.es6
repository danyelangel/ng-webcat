(function () {
  'use strict';
  class Service {
    constructor($window) {
      this.storage = $window.firebase.storage;
      this.database = $window.firebase.database();
    }
    uniqueId() {
      return this.database.ref('uniqueIds').push().key;
    }
    upload(file, progressCallback) {
      let uniqueId = this.uniqueId();
      return new Promise((resolve, reject) => {
        let ref = this.storage().ref(uniqueId),
            uploadTask = ref.put(file);
        uploadTask
          .on('state_changed', (snapshot) => {
            let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            progressCallback(progress);
          }, (error) => {
            console.log(error);
            reject(error);
          }, () => {
            let fileUrl = uploadTask.snapshot.downloadURL,
                fileRef = uniqueId;
            resolve({
              ref: fileRef,
              url: fileUrl
            });
          });
      });
    }
    execute(func, data) {
      let uniqueId = this.uniqueId();
      return new Promise((resolve, reject) => {
        let ref = this.storage().ref(func + '/' + uniqueId),
            uploadTask = ref.put(data);
        uploadTask
          .on('state_changed', () => {
          }, (error) => {
            reject(error);
          }, () => {
            let fileUrl = uploadTask.snapshot.downloadURL,
                fileRef = uniqueId;
            resolve({
              ref: fileRef,
              url: fileUrl
            });
          });
      });
    }
    remove(fileRef) {
      return new Promise((resolve, reject) => {
        this.storage()
          .ref(fileRef)
          .delete()
          .then(resolve)
          .catch(reject);
      });
    }
  }
  angular
    .module('firedux.storage')
    .service('StorageApi', Service);
}());
