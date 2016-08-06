(function () {
  'use strict';
  class Service {
    constructor(DialogLabels, $mdDialog) {
      this.Lang = {
        $current: 'es'
      };
      this.Labels = DialogLabels;
      this.$mdDialog = $mdDialog;
    }
    $dialog(labels) {
      return {
        error: (labelId) => {
          return (callback) => {
            return () => {
              let alert = this.$mdDialog
                .alert()
                .title(labels.error[this.Lang.$current][labelId].title)
                .textContent(labels.error[this.Lang.$current][labelId].description)
                .ariaLabel(labels.error[this.Lang.$current][labelId].description)
                .ok(this.Labels[this.Lang.$current].OK);
              this.$mdDialog.show(alert).then(callback);
            };
          };
        },
        alert: (labelId) => {
          return () => {
            let alert = this.$mdDialog
              .alert()
              .title(labels.alert[this.Lang.$current][labelId].title)
              .textContent(labels.alert[this.Lang.$current][labelId].description)
              .ariaLabel(labels.alert[this.Lang.$current][labelId].description)
              .ok(this.Labels[this.Lang.$current].OK);
            this.$mdDialog.show(alert);
          };
        },
        prompt: (labelId) => {
          return () => {
            return new Promise((resolve, reject) => {
              let prompt = this.$mdDialog
                .prompt()
                .title(labels.prompt[this.Lang.$current][labelId].title)
                .textContent(labels.prompt[this.Lang.$current][labelId].description)
                .ariaLabel(labels.prompt[this.Lang.$current][labelId].description)
                .ok(this.Labels[this.Lang.$current].OK)
                .cancel(this.Labels[this.Lang.$current].CANCEL);
              this.$mdDialog
                .show(prompt)
                .then(resolve)
                .catch(reject);
            });
          };
        },
        confirm: (labelId) => {
          return () => {
            return new Promise((resolve, reject) => {
              let confirmLabels = labels.confirm[this.Lang.$current][labelId],
                  confirm = this.$mdDialog
                .confirm()
                .title(confirmLabels.title)
                .textContent(confirmLabels.description)
                .ariaLabel(confirmLabels.description)
                .ok(this.Labels[this.Lang.$current].OK)
                .cancel(this.Labels[this.Lang.$current].CANCEL);
              this.$mdDialog
                .show(confirm)
                .then(resolve)
                .catch(reject);
            });
          };
        },
        progress: (labelId) => {
          return (progress) => {
            let self = this;
            this.$mdDialog
              .show({
                templateUrl: '_components/_firedux/dialog/progress-dialog.html',
                controller: function () {
                  this.progress = progress;
                  this.title = labels.progress[self.Lang.$current][labelId];
                },
                controllerAs: '$ctrl'
              });
          };
        },
        select: (labelId, params) => {
          return () => {
            return new Promise(resolve => {
              let self = this;
              this.$mdDialog
                .show({
                  templateUrl: '_components/_firedux/dialog/select-dialog.html',
                  controller: function () {
                    this.title = labels.select[self.Lang.$current][labelId];
                    this.params = params;
                    this.hide = choice => {
                      self.$mdDialog.hide();
                      resolve(choice);
                    };
                    this.cancel = self.$mdDialog.cancel;
                  },
                  controllerAs: '$ctrl'
                });
            });
          };
        },
        login: () => {
          return () => {
            return new Promise((resolve, reject) => {
              let self = this;
              this.$mdDialog
                .show({
                  templateUrl: '_components/_firedux/dialog/login-dialog.html',
                  controller: function () {
                    this.hide = credentials => {
                      self.$mdDialog.hide();
                      resolve(credentials);
                    };
                    this.cancel = self.$mdDialog.cancel;
                  },
                  controllerAs: '$ctrl'
                }).then(resolve, reject);
            });
          };
        },
        newPassword: () => {
          return () => {
            return new Promise((resolve, reject) => {
              let self = this;
              this.$mdDialog
                .show({
                  templateUrl: '_components/_firedux/dialog/new-password-dialog.html',
                  controller: function () {
                    this.hide = password => {
                      self.$mdDialog.hide();
                      resolve(password);
                    };
                    this.cancel = self.$mdDialog.cancel;
                  },
                  controllerAs: '$ctrl'
                }).then(resolve, reject);
            });
          };
        }
      };
    }
    hide() {
      this.$mdDialog.hide();
    }
  }
  angular
    .module('firedux.dialog', [])
    .service('Dialog', Service);
  angular
    .module('firedux.dialog')
    .constant('DialogLabels', {
      es: {
        OK: 'Ok',
        CANCEL: 'Cancelar'
      },
      en: {
        OK: 'Ok',
        CANCEL: 'Cancel'
      }
    });
}());
