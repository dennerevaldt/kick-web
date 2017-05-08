(function() {
    'use strict';

    angular
        .module('app.player')
        .factory('PlayerService', PlayerService);

    PlayerService.$inject = ['$q', '$http', 'app.settings'];

    /* @ngInject */
    function PlayerService($q, $http, settings) {
      var service = {
        getGames: getGames,
        createGame: createGame,
        removeGame: removeGame,
      };

      return service;

      function getGames() {
        var deferred = $q.defer();
        var promise = $http.get(settings.url_service + '/game')
          .then(
            function (response) {
              deferred.resolve(response);
            },
            function (err) {
              deferred.reject(err);
            }
          );
        return deferred.promise;
      }

      function createGame(entity) {
        var deferred = $q.defer();
        var promise = $http.post(settings.url_service + '/game', entity)
          .then(
            function (response) {
              deferred.resolve(response);
            },
            function (err) {
              deferred.reject(err);
            }
          );
        return deferred.promise;
      }

      function removeGame(entity) {
        var deferred = $q.defer();
        var promise = $http.delete(settings.url_service + '/game/' + entity.id)
          .then(
            function (response) {
              deferred.resolve(response);
            },
            function (err) {
              deferred.reject(err);
            }
          );
        return deferred.promise;
      }
    }
})();
