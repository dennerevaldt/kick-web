(function() {
    'use strict';

    angular
        .module('app.player')
        .controller('GameController', GameController);

    GameController.$inject = [];

    /* @ngInject */
    function GameController() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
