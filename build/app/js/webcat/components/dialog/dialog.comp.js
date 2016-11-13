'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($mdDialog) {
      _classCallCheck(this, Controller);

      this.$mdDialog = $mdDialog;
    }

    _createClass(Controller, [{
      key: '$onChanges',
      value: function $onChanges(changes) {
        if (changes.wcDialogTitle || changes.wcDialogBody || changes.wcDialogOk || changes.wcDialogCancel || changes.wcDialogProgress) {
          this.setDialogBindings();
          this.checkParams(changes);
        }
      }
    }, {
      key: 'setDialogBindings',
      value: function setDialogBindings() {
        this.dialogBindings = Object.assign(this.wcDialogLabels, {
          progress: angular.isNumber(this.wcDialogProgress) ? this.wcDialogProgress : undefined,
          component: angular.isNumber(this.wcDialogComponent) ? this.wcDialogComponent : undefined,
          login: angular.isNumber(this.wcDialogLogin) ? this.wcDialogLogin : undefined
        });
      }
    }, {
      key: 'checkParams',
      value: function checkParams(changes) {
        if (changes.wcDialogAlert) {
          this.openDialog({
            type: 'alert',
            bindings: this.dialogBindings
          });
        } else if (changes.wcDialogConfirm) {
          this.openDialog({
            type: 'confirm',
            bindings: this.dialogBindings
          });
        } else if (changes.wcDialogProgress) {
          this.openDialog({
            type: 'progress',
            bindings: this.dialogBindings
          });
        } else if (changes.wcDialogLogin) {
          this.openDialog({
            type: 'login',
            bindings: this.dialogBindings
          });
        } else if (changes.wcDialogComponent) {
          this.openDialog({
            type: 'component',
            bindings: this.dialogBindings
          });
        }
      }
    }, {
      key: 'openDialog',
      value: function openDialog() {
        var _this = this;

        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var type = params.type,
            bindings = params.bindings,
            dialog = undefined;

        switch (type) {
          case 'alert':
            dialog = this.$mdDialog.alert({
              title: bindings.title,
              textContent: bindings.body,
              ok: bindings.ok
            });
            break;
          case 'confirm':
            dialog = this.$mdDialog.confirm({
              title: bindings.title,
              textContent: bindings.body,
              ok: bindings.ok,
              cancel: bindings.cancel
            });
            break;
          default:
            dialog = this.getTemplate(type, bindings.component);
            dialog = {
              template: dialog,
              bindToController: {
                $bindings: bindings
              },
              controllerAs: true
            };
            break;
        }
        this.bindings.then = this.$mdDialog.hide;
        this.bindings['catch'] = this.$mdDialog.cancel;
        this.$mdDialog.cancel();
        this.$mdDialog.show(dialog)['finally'](function ($data) {
          _this.$ready = true;
          _this.then({
            $data: $data
          });
        }, function ($error) {
          _this.$error = $error;
          _this['catch']({
            $error: $error
          });
        });
      }
    }, {
      key: 'getTemplate',
      value: function getTemplate(type, component) {
        switch (type) {
          case 'progress':
            return '<wc-dialog-progress bindings="$ctrl.$bindings"></wc-dialog-progress>';
          case 'login':
            return '<wc-dialog-login bindings="$ctrl.$bindings"></wc-dialog-login>';
          case 'component':
            if (angular.isString(component)) {
              return '<' + component + ' bindings="$ctrl.$bindings"></' + component + '>';
            }
            break;
          default:
            break;
        }
      }
    }, {
      key: '$ngOnDestroy',
      value: function $ngOnDestroy() {
        this.$mdDialog.cancel();
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcDialog', ['webcat.wcDialog.login', 'webcat.wcDialog.progress']).component('wcDialog', {
    controller: Controller,
    templateUrl: 'webcat/components/dialog/dialog.html',
    transclude: {
      then: '?then',
      'catch': '?catch'
    },
    bindings: {
      // Dialog types
      wcDialogAlert: '@',
      wcDialogConfirm: '@',
      wcDialogProgress: '@',
      wcDialogLogin: '@',
      wcDialogComponent: '@',
      // Dialog properties
      wcDialogLabels: '<',
      // Callbacks
      then: '&',
      'catch': '&'
    }
  });
})();
//# sourceMappingURL=dialog.comp.js.map
