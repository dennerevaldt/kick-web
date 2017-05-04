(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .controller('ProfileEntepriseController', ProfileEntepriseController);

    ProfileEntepriseController.$inject = ['LoginService', '$state', '$ionicLoading', '$timeout'];

    /* @ngInject */
    function ProfileEntepriseController(LoginService, $state, $ionicLoading, $timeout) {
        var vm = this;
        vm.user = {};
        const userStr = localStorage.getItem('kickUserCredentials');
        const user = JSON.parse(userStr);
        vm.user = user.Person;
        vm.logout = logout;

        ///////////////

        function logout() {
          loadOn();
          $timeout(function(){
            LoginService.clearCredentials();
            $ionicLoading.hide();
            $state.go('login');
          }, 600);
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
