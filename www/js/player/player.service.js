(function() {
    'use strict';

    angular
        .module('app.player')
        .factory('PlayerService', PlayerService);

    PlayerService.$inject = ['$q'];

    /* @ngInject */
    function PlayerService($q) {
        var service = {
        };

        return service;
    }
})();
