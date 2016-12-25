(function () {
  'use strict';
  class Controller {
    $onChanges(changes) {
      this.wcMaxScore = 5;
      if (
        changes.wcTotalScore ||
        changes.wcUserScore
      ) {
        this.$stars = this
          .getStarsArray(
            this.wcUserScore ||
            this.wcTotalScore);
      }
    }
    $then(index) {
      this.then({
        $data: index + 1
      });
    }
    getStarsArray(score) {
      let returnable = [];
      if (angular.isNumber(score)) {
        let floor = Math.floor(score),
            decimal = score - floor,
            remainder;
        if (decimal === 0 && floor === this.wcMaxScore) {
          remainder = null;
        } else if (decimal < 0.25) {
          remainder = 'empty';
        } else if (decimal > 0.25 && decimal < 0.75) {
          remainder = 'half';
        } else {
          remainder = 'full';
        }
        for (let i = 0; i < floor; i++) {
          returnable[i] = 'full';
        }
        for (let j = floor; j < this.wcMaxScore; j++) {
          returnable[j] = 'empty';
        }
        returnable[floor] = remainder;
      }
      return returnable;
    }
  }
  angular
    .module('webcat.wcRating', [])
    .component('wcRating', {
      controller: Controller,
      templateUrl: 'webcat/components/rating/rating.html',
      transclude: {
        full: '?full',
        half: '?half',
        empty: '?empty',
        catch: '?catch'
      },
      bindings: {
        wcTotalScore: '<',
        wcUserScore: '<',
        wcMaxScore: '@',
        then: '&'
      }
    });
}());
