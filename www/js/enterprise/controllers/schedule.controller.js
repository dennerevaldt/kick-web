(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .controller('ScheduleController', ScheduleController);

    ScheduleController.$inject = ['InitListSchedules', '$ionicModal', '$scope', '$cordovaToast', '$ionicLoading', 'EnterpriseService', '$ionicPopup'];

    /* @ngInject */
    function ScheduleController(InitListSchedules, $ionicModal, $scope, $cordovaToast, $ionicLoading, EnterpriseService, $ionicPopup) {
        var vm = this;
        vm.listSchedules = InitListSchedules.data || [];

        ///////////
    }
})();
