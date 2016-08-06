(function () {
  'use strict';
  function $fireduxArrayFact($firebaseArray, $timeout, Dialog) {
    let $dialog = Dialog.$dialog({
      confirm: {
        es: {
          REMOVE: {
            title: 'Do you want to remove this item?',
            description: 'This action can not be undone.'
          }
        }
      }
    });
    return $firebaseArray.$extend({
      $setPriorities: function () {
        angular.forEach(this.$list, (value, key) => {
          value.$priority = key + 1;
          this.$list.$save(value);
        });
      },
      $addLast: function (data = {exists: true}) {
        return new Promise(resolve => {
          this.$list.$add(data).then(ref => {
            $timeout(() => {
              let index = this.$list.$indexFor(ref.key),
                  length = this.$list.length,
                  lastPriority = this.$list[length - 1].$priority + 1;
              this.$list[index] = Object.assign(this.$list[index], {$priority: lastPriority});
              this.$list.$save(index);
              resolve(ref);
            });
          });
        });
      },
      $addFirst: function (data = {exists: true}) {
        let hasContent = this.$list.length > 0,
            newPriority = hasContent ? this.$list[0].$priority / 2 : 1;
        return this.$list.$add(Object.assign(data, {
          $priority: newPriority
        }));
      },
      $addAfter: function ($index, data = {exists: true}) {
        let before = this.$list[$index],
            after = this.$list[$index + 1],
            beforePri = before.$priority,
            afterPri = after ? after.$priority : beforePri + 2,
            newPriority = (beforePri + afterPri) / 2;
        return this.$list.$add(Object.assign(data, {
          $priority: newPriority
        }));
      },
      $removeWithDialog: function ($index) {
        $dialog.confirm('REMOVE')().then(() => {
          this.$list.$remove($index);
        }).catch(() => {});
      },
      $moveUp: function ($index) {
        let before = this.$list[$index],
            after = this.$list[$index - 1],
            beforePri = before.$priority,
            afterPri = after.$priority;
        after.$priority = beforePri;
        before.$priority = afterPri;
        this.$list.$save(after);
        this.$list.$save(before);
      },
      $moveDown: function ($index) {
        let before = this.$list[$index],
            after = this.$list[$index + 1],
            beforePri = before.$priority,
            afterPri = after.$priority;
        after.$priority = beforePri;
        before.$priority = afterPri;
        this.$list.$save(after);
        this.$list.$save(before);
      }
    });
  }
  angular
    .module('webcat.firedux')
    .factory('$fireduxArray', $fireduxArrayFact);
}());
