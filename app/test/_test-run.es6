(function () {
  'use strict';
  function run($firedux) {
    $firedux.init({
      apiKey: 'AIzaSyApZgDIz2ZHBdpMAtMvpygRu84U4VFGKaI',
      authDomain: 'pre-compro-staging.firebaseapp.com',
      databaseURL: 'https://pre-compro-staging.firebaseio.com',
      storageBucket: 'pre-compro-staging.appspot.com'
    });
  }
  angular
    .module('test.run', [])
    .run(run);
}());
