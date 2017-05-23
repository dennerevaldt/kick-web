(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('CreateProfileController', CreateProfileController);

    CreateProfileController.$inject = ['$ionicModal', '$scope', 'PlaceApiService', 'LoginService', '$ionicLoading', '$cordovaToast', '$state'];

    /* @ngInject */
    function CreateProfileController($ionicModal, $scope, PlaceApiService, LoginService, $ionicLoading, $cordovaToast, $state) {
        var vm = this;
        vm.user = {};
        vm.form = {};
        vm.user.typeaccount = '1';
        vm.search = search;
        vm.listCities = [];
        vm.setCitie = setCitie;
        vm.createAccount = createAccount;

        // modal options
        $ionicModal.fromTemplateUrl('templates/createProfileModal.html', {
          scope: $scope
        }).then(function(modal) {
          vm.modal = modal;
        });

        /////////////

        function search() {
          PlaceApiService.getCitiesAutoComplete(vm.user.search)
            .then(function (response) {
              vm.listCities = response;
            }, function (error) {
              $cordovaToast
                .show('Erro ao buscar cidades', 'long', 'center');
            });
        }

        function setCitie(item) {
          vm.user.district = item.description;
          vm.user.search = item.description;
          vm.listCities = [];
          PlaceApiService.getLatLngCitie(item.place_id)
            .then(function (response) {
              vm.user.lat = response.lat;
              vm.user.lng = response.lng;
            });
        }

        function createAccount() {
          if (vm.form.$invalid) {
            $cordovaToast
              .show('Preencha os campos corretamente', 'long', 'center');
            return;
          }
          loadOn();
          if (vm.user.typeaccount === '1') {
            // player
            LoginService.createAccountPlayer(vm.user)
            .then(function(response){
              return LoginService.token(vm.user.username, vm.user.password);
            })
            .then(LoginService.setCredentials)
            .then(LoginService.getUserData)
            .then(LoginService.setUserData)
            .then(function(response) {
              // redirect player dash
              vm.modal.hide();
              $state.go('playerController.jogos');
              $ionicLoading.hide();
            }, function(err){
              $ionicLoading.hide();
              $cordovaToast
                .show(err.data.error[0].message || 'Confira todos os campos', 'long', 'center');
            });
          } else {
            // enterprise
            LoginService.createAccountEnterprise(vm.user)
              .then(function(response){
                return LoginService.token(vm.user.username, vm.user.password);
              })
              .then(LoginService.setCredentials)
              .then(LoginService.getUserData)
              .then(LoginService.setUserData)
              .then(function(response) {
                // redirect enterprise dash
                vm.modal.hide();
                $state.go('enterpriseController.quadras');
                $ionicLoading.hide();
              }, function(err){
                $ionicLoading.hide();
                $cordovaToast
                  .show(err.data.error[0].message || 'Confira todos os campos', 'long', 'center');
              });
          }
        }

        function loadOn() {
          // Setup the loader
          $ionicLoading.show({
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
          });
        }
    }
})();
