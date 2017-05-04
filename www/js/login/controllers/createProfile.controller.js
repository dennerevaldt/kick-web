(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('CreateProfileController', CreateProfileController);

    CreateProfileController.$inject = ['$ionicModal', '$scope', 'PlaceApiService'];

    /* @ngInject */
    function CreateProfileController($ionicModal, $scope, PlaceApiService) {
        var vm = this;
        vm.user = {};
        vm.user.typeaccount = '1';
        vm.search = search;

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
              console.log('SUCESSSSS <<', JSON.stringify(response));
            }, function (error) {
              console.log('ERRORRRR <<', JSON.stringify(error.data));
            });
        }
    }
})();
