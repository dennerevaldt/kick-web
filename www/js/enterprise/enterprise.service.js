(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .factory('EnterpriseService', EnterpriseService);

    EnterpriseService.$inject = ['$q'];

    /* @ngInject */
    function EnterpriseService($q) {
        var service = {
        };

        return service;
    }
})();
