(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('CreateProfileController', CreateProfileController);

    CreateProfileController.$inject = ['$ionicModal', '$scope', 'PlaceApiService', 'LoginService', '$ionicLoading'];

    /* @ngInject */
    function CreateProfileController($ionicModal, $scope, PlaceApiService, LoginService, $ionicLoading) {
        var vm = this;
        vm.user = {};
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
              console.log('ERRO >>', JSON.stringify(error.data));
            });
        }

        function setCitie(item) {
          vm.user.search = item.description;
          vm.listCities = [];
          PlaceApiService.getLatLngCitie(item.place_id)
            .then(function (response) {
              vm.user.lat = response.lat;
              vm.user.lng = response.lng;
            });
        }

        function createAccount() {
          loadOn();
          if (vm.user.typeaccount === '1') {
            // player
            LoginService.createAccountPlayer(vm.user)
              .then(function (response) {
                $ionicLoading.hide();
              }, function (err) {
                $ionicLoading.hide();
              });
          } else {
            // enterprise
            LoginService.createAccountEnterprise(vm.user)
              .then(function (response) {
                $ionicLoading.hide();
                console.log('CREATE ENT >>>', JSON.stringify(response));
              }, function (err) {
                $ionicLoading.hide();
                console.log('ERRO CREATE ENT >>>', JSON.stringify(err));
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
