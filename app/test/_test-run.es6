(function () {
  'use strict';
  function run($firedux) {
    $firedux.init({
      apiKey: 'AIzaSyApZgDIz2ZHBdpMAtMvpygRu84U4VFGKaI',
      authDomain: 'pre-compro.firebaseapp.com',
      databaseURL: 'https://pre-compro.firebaseio.com',
      storageBucket: 'pre-compro.appspot.com'
    });
  }
  angular
    .module('test.run', [])
    .run(run);
}());
