(function () {
  'use strict';
  class Controller {
    constructor($mdDialog, $document, $firedux) {
      this.$mdDialog = $mdDialog;
      this.$firedux = $firedux;
      this.$document = $document;
      this.defaultLabels = {
        ok: 'Ok',
        cancel: 'Cancel'
      };
    }
    $onInit() {
      this.launchDialog();
    }
    $onChanges() {
      this.setDialogBindings(this.wcDialogLabels);
    }
    setDialogBindings(labels = {}) {
      this.dialogBindings = Object.assign(
        this.defaultLabels,
        labels, {
          progress: this.wcDialogProgress,
          component: this.wcDialogComponent,
          login: this.wcDialogLogin
        });
    }
    launchDialog() {
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
    openDialog(params = {}) {
      let type = params.type,
          bindings = params.bindings,
          self = this,
          dialog;

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
            fullscreen: true
          };
          break;
        default:
          dialog = this.getTemplate(type, bindings.component);
          dialog = {
            template: dialog,
            controller: function () {
              this.$bindings = bindings;
              this.$bindings.then = payload => {
                self.$mdDialog.hide(payload);
              };
              this.$bindings.catch = () => {
                self.$mdDialog.cancel();
              };
            },
            controllerAs: '$ctrl'
          };
          break;
      }
      this.$firedux.$timeout(() => {
        this.$mdDialog
          .show(dialog)
          .then($data => {
            this.$ready = true;
            this.then({
              $data: $data
            });
          }, $error => {
            this.$error = true;
            this.catch({
              $error: $error
            });
          });
      });
    }
    getTemplate(type, component) {
      switch (type) {
        case 'progress':
          return '<wc-dialog-progress bindings="$ctrl.$bindings"></wc-dialog-progress>';
        case 'login':
          return '<wc-dialog-login bindings="$ctrl.$bindings"></wc-dialog-login>';
        case 'component':
          if (angular.isString(component)) {
            return `<${component} bindings="$ctrl.$bindings"></${component}>`;
          }
          break;
        default:
          break;
      }
    }
    $onDestroy() {
      this.$mdDialog.cancel();
    }
  }
  angular
    .module('webcat.wcDialog', [
      'webcat.wcDialog.login',
      'webcat.wcDialog.progress'
    ])
    .component('wcDialog', {
      controller: Controller,
      templateUrl: 'webcat/components/dialog/dialog.html',
      transclude: {
        wcDialogTemplate: '?wcDialogTemplate',
        then: '?then',
        catch: '?catch'
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
        // Callbacks
        then: '&',
        catch: '&'
      }
    });
}());
