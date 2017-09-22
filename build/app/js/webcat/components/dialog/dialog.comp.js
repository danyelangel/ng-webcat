'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var Controller = (function () {
    function Controller($mdDialog, $document, $firedux) {
      _classCallCheck(this, Controller);

      this.$mdDialog = $mdDialog;
      this.$firedux = $firedux;
      this.$document = $document;
      this.defaultLabels = {
        ok: 'Ok',
        cancel: 'Cancel'
      };
    }

    _createClass(Controller, [{
      key: '$onInit',
      value: function $onInit() {
        this.launchDialog();
      }
    }, {
      key: '$onChanges',
      value: function $onChanges() {
        this.setDialogBindings(this.wcDialogLabels);
      }
    }, {
      key: 'setDialogBindings',
      value: function setDialogBindings() {
        var labels = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        this.dialogBindings = Object.assign(this.defaultLabels, labels, {
          progress: this.wcDialogProgress,
          component: this.wcDialogComponent,
          login: this.wcDialogLogin
        });
      }
    }, {
      key: 'launchDialog',
      value: function launchDialog() {
        if (this.wcDialogAlert) {
          this.openDialog({
            type: 'alert',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogConfirm) {
          this.openDialog({
            type: 'confirm',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogPrompt) {
          this.openDialog({
            type: 'prompt',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogProgress) {
          this.openDialog({
            type: 'progress',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogLogin) {
          this.openDialog({
            type: 'login',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogComponent) {
          this.openDialog({
            type: 'component',
            bindings: this.dialogBindings
          });
        } else if (this.wcDialogTemplate) {
          this.$template = true;
          this.$firedux.$apply();
          this.openDialog({
            type: 'template'
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
            self = this,
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
          case 'prompt':
            dialog = this.$mdDialog.prompt({
              title: bindings.title,
              textContent: bindings.body,
              ok: bindings.ok,
              cancel: bindings.cancel
            });
            break;
          case 'template':
            dialog = {
              parent: angular.element(this.$document[0].body),
              contentElement: '#webcatDialogTemplate',
              fullscreen: angular.isDefined(this.wcDialogFullscreen) ? this.wcDialogFullscreen : true,
              clickOutsideToClose: angular.isDefined(this.wcDialogModal) ? !this.wcDialogModal : false,
              escapeToClose: angular.isDefined(this.wcDialogModal) ? !this.wcDialogModal : false
            };
            break;
          default:
            dialog = this.getTemplate(type, bindings.component);
            dialog = {
              template: dialog,
              controller: function controller() {
                this.$bindings = bindings;
                this.$bindings.then = function (payload) {
                  self.$mdDialog.hide(payload);
                };
                this.$bindings['catch'] = function () {
                  self.$mdDialog.cancel();
                };
              },
              controllerAs: '$ctrl'
            };
            break;
        }
        this.$firedux.$timeout(function () {
          _this.$mdDialog.show(dialog).then(function ($data) {
            _this.$ready = true;
            _this.then({
              $data: $data
            });
            _this.$firedux.$apply();
            _this.$after = true;
            _this.after();
          }, function ($error) {
            _this.$error = true;
            _this['catch']({
              $error: $error
            });
            _this.$firedux.$apply();
            _this.$after = true;
            _this.after();
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
      key: '$onDestroy',
      value: function $onDestroy() {
        this.$mdDialog.cancel();
      }
    }]);

    return Controller;
  })();

  angular.module('webcat.wcDialog', ['webcat.wcDialog.login', 'webcat.wcDialog.progress']).component('wcDialog', {
    controller: Controller,
    templateUrl: 'webcat/components/dialog/dialog.html',
    transclude: {
      wcDialogTemplate: '?wcDialogTemplate',
      then: '?then',
      'catch': '?catch',
      after: '?after'
    },
    bindings: {
      // Dialog types
      wcDialogAlert: '@',
      wcDialogConfirm: '@',
      wcDialogProgress: '@',
      wcDialogPrompt: '@',
      wcDialogLogin: '@',
      wcDialogComponent: '@',
      wcDialogTemplate: '@',
      // Dialog properties
      wcDialogLabels: '<',
      wcDialogFullscreen: '<',
      wcDialogModal: '<',
      // Callbacks
      then: '&',
      'catch': '&',
      after: '&'
    }
  });
})();
//# sourceMappingURL=dialog.comp.js.map
