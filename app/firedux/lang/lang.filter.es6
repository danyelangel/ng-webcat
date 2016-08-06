(function () {
  'use strict';

  function filter(Lang) {
    return (input) => {
      let returnable;
      if (Lang.lang === 'en') {
        returnable = input[0];
      } else {
        returnable = input[1];
      }
      return returnable;
    };
  }
  angular
    .module('firedux.lang')
    .filter('lang', filter);
}());
