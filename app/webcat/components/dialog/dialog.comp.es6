(function () {
  'use strict';
  class Controller {
    constructor($mdDialog) {
      this.$mdDialog = $mdDialog;
    }
    $onChanges(changes) {
      if (
        changes.wcDialogTitle ||
        changes.wcDialogBody ||
        changes.wcDialogOk ||
        changes.wcDialogCancel ||
        changes.wcDialogProgress
      ) {
        this.setDialogBindings();
        this.checkParams(changes);
      }
    }
    setDialogBindings() {
      this.dialogBindings = Object.assign(
        this.wcDialogLabels, {
          progress: angular
            .isNumber(this.wcDialogProgress) ?
            this.wcDialogProgress : undefined,
          component: angular
            .isNumber(this.wcDialogComponent) ?
            this.wcDialogComponent : undefined,
          login: angular
            .isNumber(this.wcDialogLogin) ?
            this.wcDialogLogin : undefined
        });
    }
    checkParams(changes) {
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
    openDialog(params = {}) {
      let type = params.type,
          bindings = params.bindings,
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
      this.bindings.catch = this.$mdDialog.cancel;
      this.$mdDialog.cancel();
      this.$mdDialog
        .show(dialog)
        .finally($data => {
          this.$ready = true;
          this.then({
            $data
          });
        }, $error => {
          this.$error = $error;
          this.catch({
            $error
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
    $ngOnDestroy() {
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
        then: '?then',
        catch: '?catch'
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
        catch: '&'
      }
    });
}());
