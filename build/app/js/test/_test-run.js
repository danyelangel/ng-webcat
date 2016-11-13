'use strict';

(function () {
  'use strict';
  function run($firedux) {
    $firedux.init({
      apiKey: 'AIzaSyAq3qokQkTAqFNrVpeNQ1UvZUFRR5Nv6zc',
      authDomain: 'firedux-31074.firebaseapp.com',
      databaseURL: 'https://firedux-31074.firebaseio.com',
      storageBucket: 'firedux-31074.appspot.com'
    });
  }
  angular.module('test.run', []).run(run);
})();
//# sourceMappingURL=_test-run.js.map
