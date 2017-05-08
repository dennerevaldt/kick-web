(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .controller('ScheduleController', ScheduleController);

    ScheduleController.$inject = ['InitListSchedules', '$ionicModal', '$scope', '$cordovaToast', '$ionicLoading', 'EnterpriseService', '$ionicPopup', 'ionicDatePicker', 'ionicTimePicker', '$filter'];

    /* @ngInject */
    function ScheduleController(InitListSchedules, $ionicModal, $scope, $cordovaToast, $ionicLoading, EnterpriseService, $ionicPopup, ionicDatePicker, ionicTimePicker, $filter) {
      var vm = this;
      vm.listSchedules = InitListSchedules.data || [];
      vm.schedule = {};
      vm.addSchedule = addSchedule;
      vm.createSchedule = createSchedule;
      vm.removeSchedule = removeSchedule;
      vm.editScheduleItem = editScheduleItem;
      vm.editSchedule = editSchedule;
      var indexEdit = -1;
      vm.openDatePicker = openDatePicker;
      vm.openTimePicker = openTimePicker;

      ///////////

      $ionicModal.fromTemplateUrl('templates/novoHorario.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/editarHorario.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modalEdit = modal;
      });

      /////////

      function addSchedule() {
        vm.schedule = {};
        $ionicLoading.show({
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200
        });
        EnterpriseService.getCourts()
          .then(function(response) {
            $ionicLoading.hide();
            vm.listCourts = response.data;
            if(vm.listCourts.length) {
              vm.modal.show();
            } else {
              $cordovaToast
                .show('Atenção, cadastre antes ao menos uma quadra', 'long', 'center');
            }
          });
      }

      function createSchedule() {
        $ionicLoading.show({
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200
        });

        if (!vm.schedule.date || !vm.schedule.horary || !vm.schedule.court_id) {
          $ionicLoading.hide();
          $cordovaToast
            .show('Preencha os campos corretamente', 'long', 'center');
          return;
        }

        EnterpriseService.createSchedule(vm.schedule)
          .then(function(response) {
            vm.schedule.Court = vm.listCourts.filter(function(item){return item.id === vm.schedule.court_id})[0];
            vm.schedule.date = vm.schedule.displayDate;
            vm.listSchedules.push(vm.schedule);
            vm.modal.hide();
            $ionicLoading.hide();
          }, function(err) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Problemas ao criar horário, tente novamente', 'long', 'center');
          });
      }

      function removeSchedule(item) {
        $ionicPopup.confirm({
          title: 'Confirmação',
          template: 'Deseja realmente apagar o horário?',
          cancelText: 'Cancelar', // String (default: 'Cancel'). The text of the Cancel button.
          okText: 'Sim', // String (default: 'OK'). The text of the OK button.
          okType: 'button-balanced' // String (default: 'button-positive'). The type of the OK button.
        }).then(function (result) {
          if (result) {
            $ionicLoading.show({
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200
            });
            EnterpriseService.removeSchedule(item)
              .then(function(response) {
                var i = vm.listSchedules.indexOf(item);
                vm.listSchedules.splice(i, 1);
                $ionicLoading.hide();
              }, function(err) {
                $ionicLoading.hide();
                $cordovaToast
                  .show('Problemas ao remover horário, tente novamente', 'long', 'center');
              });
          }
        });
      }

      function editScheduleItem(item) {
        indexEdit = vm.listSchedules.indexOf(item);
        vm.schedule = item;
        vm.schedule.type = item.category === 'Futebol society (7)' ? '1' : '2';
        vm.modalEdit.show();
      }

      function editSchedule() {
        $ionicLoading.show({
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200
        });
        EnterpriseService.editSchedule(vm.schedule)
          .then(function(response) {
            vm.listSchedules[indexEdit] = vm.schedule;
            vm.modalEdit.hide();
            $ionicLoading.hide();
          }, function(err) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Problemas ao editar horário, tente novamente', 'long', 'center');
          });
      }

      function openDatePicker() {
        var ipObj1 = {
          callback: function (val) {  //Mandatory
            var nDate = new Date(val);
            vm.schedule.date = $filter('date')(nDate, 'yyyy/MM/dd');
            vm.schedule.displayDate = $filter('date')(nDate, 'dd/MM/yyyy');

          },
          inputDate: new Date() //Optional
        };
        ionicDatePicker.openDatePicker(ipObj1);
      }

      function openTimePicker() {
        var ipObj1 = {
          callback: function (val) { //Mandatory
            if (val) {
              var selectedTime = new Date(val * 1000);
              var minutes = selectedTime.getUTCMinutes() < 10 ? '0' + selectedTime.getUTCMinutes() : selectedTime.getUTCMinutes();
              var timeSet = selectedTime.getUTCHours() + ':' + minutes + ':00';
              vm.schedule.horary = timeSet;
            }
          }
        };
        ionicTimePicker.openTimePicker(ipObj1);
      }
    }
})();
