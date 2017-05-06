(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .controller('CourtController', CourtController);

    CourtController.$inject = ['InitListCourts', '$ionicModal', '$scope', '$cordovaToast', '$ionicLoading', 'EnterpriseService', '$ionicPopup'];

    /* @ngInject */
    function CourtController(InitListCourts, $ionicModal, $scope, $cordovaToast, $ionicLoading, EnterpriseService, $ionicPopup) {
      var vm = this;
      vm.listCourts = InitListCourts.data || [];
      vm.court = {};
      vm.court.type = '1';
      vm.addCourt = addCourt;
      vm.createCourt = createCourt;
      vm.removeCourt = removeCourt;
      vm.editCourtItem = editCourtItem;
      vm.editCourt = editCourt;
      var indexEdit = -1;

      ///////////

      $ionicModal.fromTemplateUrl('templates/novaQuadra.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/editarQuadra.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modalEdit = modal;
      });

      /////////

      function addCourt() {
        vm.court = {};
        vm.court.type = '1';
        vm.modal.show();
      }

      function createCourt() {
        $ionicLoading.show({
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200
        });

        if (!vm.court.name) {
          $ionicLoading.hide();
          $cordovaToast
            .show('Preencha os campos corretamente', 'long', 'center');
          return;
        }

        vm.court.category = vm.court.type === '1' ? 'Futebol society (7)' : 'Futebol de salão (Futsal)';

        EnterpriseService.createCourt(vm.court)
          .then(function(response) {
            vm.listCourts.push(vm.court);
            vm.modal.hide();
            $ionicLoading.hide();
          }, function(err) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Problemas ao criar quadra, tente novamente', 'long', 'center');
          });
      }

      function removeCourt(item) {
        $ionicPopup.confirm({
          title: 'Confirmação',
          template: 'Deseja realmente apagar '+item.name+'?',
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
            EnterpriseService.removeCourt(item)
              .then(function(response) {
                var i = vm.listCourts.indexOf(item);
                vm.listCourts.splice(i, 1);
                $ionicLoading.hide();
              }, function(err) {
                $ionicLoading.hide();
                $cordovaToast
                  .show('Problemas ao remover quadra, tente novamente', 'long', 'center');
              });
          }
        });
      }

      function editCourtItem(item) {
        indexEdit = vm.listCourts.indexOf(item);
        vm.court = item;
        vm.court.type = item.category === 'Futebol society (7)' ? '1' : '2';
        vm.modalEdit.show();
      }

      function editCourt() {
        $ionicLoading.show({
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200
        });
        vm.court.category = vm.court.type === '1' ? 'Futebol society (7)' : 'Futebol de salão (Futsal)';
        EnterpriseService.editCourt(vm.court)
          .then(function(response) {
            vm.listCourts[indexEdit] = vm.court;
            vm.modalEdit.hide();
            $ionicLoading.hide();
          }, function(err) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Problemas ao editar quadra, tente novamente', 'long', 'center');
          });
      }
    }
})();
