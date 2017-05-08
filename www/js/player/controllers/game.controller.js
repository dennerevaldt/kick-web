(function() {
    'use strict';

    angular
        .module('app.player')
        .controller('GameController', GameController);

    GameController.$inject = ['InitListGames', '$ionicModal', '$scope', '$cordovaToast', '$ionicLoading', 'PlayerService', 'EnterpriseService', '$ionicPopup', '$cordovaGeolocation'];

    /* @ngInject */
    function GameController(InitListGames, $ionicModal, $scope, $cordovaToast, $ionicLoading, PlayerService, EnterpriseService, $ionicPopup, $cordovaGeolocation) {
        var vm = this;
        vm.listGames = InitListGames.data || [];
        vm.game = {};
        vm.addGame = addGame;
        vm.getAllSchedulesByEntepriseId = getAllSchedulesByEntepriseId;
        vm.listSchedules = [];
        vm.listEnterprises = [];
        vm.createGame = createGame;
        vm.removeGame = removeGame;

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        console.log('LISTA JOGOS >>', JSON.stringify(vm.listGames));

        ///////////////

        $ionicModal.fromTemplateUrl('templates/novoJogo.html', {
          scope: $scope
        }).then(function(modal) {
          vm.modal = modal;
        });

        ///////

        function addGame() {
          $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
          });
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              vm.game = {};
              vm.modal.show();
              var lat  = position.coords.latitude;
              var long = position.coords.longitude;
              var cord = {lat: lat, lng: long};

              EnterpriseService.getAllProximity(cord)
                .then(function(response) {
                  console.log('DISTRICT >>>>', JSON.stringify(response.data));
                  vm.listEnterprises = response.data;
                  $ionicLoading.hide();
                }, function(err) {
                  $ionicLoading.hide();
                  $cordovaToast
                    .show('Problemas ao buscar jogos próximos, tente novamente', 'long', 'center');
                });
            }, function(err) {
              // error
              $ionicLoading.hide();
              $cordovaToast
                .show('Problemas ao buscar jogos, tente novamente', 'long', 'center');
            });
        }

        function getAllSchedulesByEntepriseId() {
          $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
          });
          EnterpriseService.getAllSchedulesByEntepriseId(vm.game.enterprise_id)
            .then(function(response) {
              $ionicLoading.hide();
              vm.listSchedules = response.data;
              if (!vm.listSchedules.length) {
                $cordovaToast
                  .show('Não há horários disponíveis, escolha outra empresa de quadras', 'long', 'center');
              }
            }, function(err) {
              $ionicLoading.hide();
              $cordovaToast
                .show('Problemas ao buscar horários, tente novamente', 'long', 'center');
            });
        }

        function createGame() {
          if (!vm.game.name || !vm.game.schedule_id) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Preencha os campos corretamente', 'long', 'center');
            return;
          }

          $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
          });

          PlayerService.createGame(vm.game)
            .then(PlayerService.getGames)
            .then(function(response) {
              vm.listGames = response.data;
              $ionicLoading.hide();
              vm.modal.hide();
            }, function(err) {
              $ionicLoading.hide();
              $cordovaToast
                .show('Problemas ao marcar horário, tente novamente', 'long', 'center');
            });
        }

        function removeGame(item) {
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
              PlayerService.removeGame(item)
                .then(function(response) {
                  var i = vm.listGames.indexOf(item);
                  vm.listGames.splice(i, 1);
                  $ionicLoading.hide();
                }, function(err) {
                  $ionicLoading.hide();
                  $cordovaToast
                    .show('Problemas ao remover jogo, tente novamente', 'long', 'center');
                });
            }
          });
        }
    }
})();
