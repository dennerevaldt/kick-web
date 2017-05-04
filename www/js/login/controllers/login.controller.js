(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state', '$ionicLoading', '$timeout', '$cordovaToast', '$cordovaOauth'];

    /* @ngInject */
    function LoginController(LoginService, $state, $ionicLoading, $timeout, $cordovaToast, $cordovaOauth) {
        var vm = this;
        vm.user = {};
        vm.userCreate = {};
        vm.submitLogin = submitLogin;
        vm.loginFacebook = loginFacebook;
        vm.submitCreate = submitCreate;
        vm.userLogged = {};

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
            .then(function(resp){
              if(resp.data.token) {

              }
            }, function(err){
              $ionicLoading.hide();
              $cordovaToast
                .show('Usuário não encontrado, verifique e tente novamente', 'long', 'center');
            });
        }

        function loginFacebook() {
          $cordovaOauth.facebook("545567282282477", ["public_profile", "email"]).then(function(result) {
            var access_token = result.access_token;
            loadOn();
            LoginService.getDataFB(access_token)
              .then(LoginService.tokenFacebook)
              .then(LoginService.setCredentials)
              .then(LoginService.getUserData)
              .then(LoginService.setUserData)
              .then(function(response) {

                if (response.data.Person.typeperson === 'E') {
                  // redirect enterprise dash
                  console.log('EMPRESA >>>');
                  $state.go('enterpriseController.quadras');
                } else {
                  // redirect player dash
                  console.log('JOGADOR >>>');
                  $state.go('playerController.jogos');
                }

                $ionicLoading.hide();
              }, function (err) {
                $ionicLoading.hide();
                $cordovaToast
                  .show('Erro ao buscar credenciais, tente novamente', 'long', 'center');
              });

          }, function(error) {
            if(error !== "The sign in flow was canceled")
              $cordovaToast.show('Usuário não encontrado, verifique e tente novamente', 'long', 'center');
          });
        }

        function submitCreate() {
          
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
