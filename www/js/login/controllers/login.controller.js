(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state', '$ionicLoading', '$timeout', '$cordovaToast', '$cordovaOauth', '$ionicModal', '$scope', 'PlaceApiService'];

    /* @ngInject */
    function LoginController(LoginService, $state, $ionicLoading, $timeout, $cordovaToast, $cordovaOauth, $ionicModal, $scope, PlaceApiService) {
        var vm = this;
        vm.user = {};
        vm.userCreate = {};
        vm.submitLogin = submitLogin;
        vm.loginFacebook = loginFacebook;
        vm.userLogged = {};
        vm.userConfirm = {};
        vm.createAccount = createAccount;
        vm.search = search;
        vm.listCities = [];
        vm.setCitie = setCitie;

        ///////////////

        // modal options
        $ionicModal.fromTemplateUrl('templates/confirmAccount.html', {
          scope: $scope
        }).then(function(modal) {
          vm.modal = modal;
        });

        //////////////

        function submitLogin() {
          loadOn();
          if (!vm.user.username || !vm.user.password) {
            $ionicLoading.hide();
            $cordovaToast
              .show('Preencha os campos corretamente', 'long', 'center');
            return;
          }
          LoginService.token(vm.user.username.toLowerCase(), vm.user.password)
            .then(LoginService.setCredentials)
            .then(LoginService.getUserData)
            .then(LoginService.setUserData)
            .then(function(response) {
              if (response.data.Person.typeperson === 'E') {
                // redirect enterprise dash
                $state.go('enterpriseController.quadras');
              } else {
                // redirect player dash
                $state.go('playerController.jogos');
              }

              $ionicLoading.hide();
            }, function(err){
              $ionicLoading.hide();
              $cordovaToast
                .show('Usuário ou senha incorretos, verifique e tente novamente', 'long', 'center');
            });
        }

        function loginFacebook() {
          $cordovaOauth.facebook("545567282282477", ["public_profile", "email"]).then(function(result) {
            var access_token = result.access_token;
            var result_fb;
            loadOn();
            LoginService.getDataFB(access_token)
              .then(function(response){
                result_fb = response;
                return response;
              })
              .then(LoginService.tokenFacebook)
              .then(LoginService.setCredentials)
              .then(LoginService.getUserData)
              .then(LoginService.setUserData)
              .then(function(response) {

                if (response.data.Person.typeperson === 'E') {
                  // redirect enterprise dash
                  $state.go('enterpriseController.quadras');
                } else {
                  // redirect player dash
                  $state.go('playerController.jogos');
                }

                $ionicLoading.hide();
              }, function (err) {
                vm.userConfirm.typeaccount = '1';
                vm.userConfirm.fullname = result_fb.data.name;
                vm.userConfirm.email = result_fb.data.email;
                vm.userConfirm.password = result_fb.data.id;
                //
                $ionicLoading.hide();
                vm.modal.show();
              });

          }, function(error) {
            if(error !== "The sign in flow was canceled")
              $cordovaToast.show('Usuário não encontrado, verifique e tente novamente', 'long', 'center');
          });
        }

        function search() {
          PlaceApiService.getCitiesAutoComplete(vm.userConfirm.search)
            .then(function (response) {
              vm.listCities = response;
            }, function (error) {
              $cordovaToast
                .show('Erro ao buscar cidades', 'long', 'center');
            });
        }

        function setCitie(item) {
          vm.userConfirm.search = item.description;
          vm.listCities = [];
          PlaceApiService.getLatLngCitie(item.place_id)
            .then(function (response) {
              vm.userConfirm.lat = response.lat;
              vm.userConfirm.lng = response.lng;
            });
        }

        function createAccount() {
          if (vm.form.$invalid) {
            $cordovaToast
              .show('Preencha os campos corretamente', 'long', 'center');
            return;
          }
          loadOn();
          if (vm.userConfirm.typeaccount === '1') {
            // player
            LoginService.createAccountPlayer(vm.userConfirm)
            .then(function(response){
              return LoginService.token(vm.userConfirm.username, vm.userConfirm.password);
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
            LoginService.createAccountEnterprise(vm.userConfirm)
              .then(function(response){
                return LoginService.token(vm.userConfirm.username, vm.userConfirm.password);
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
