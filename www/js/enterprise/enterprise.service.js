(function() {
    'use strict';

    angular
        .module('app.enterprise')
        .factory('EnterpriseService', EnterpriseService);

    EnterpriseService.$inject = ['$q', '$http', 'app.settings'];

    /* @ngInject */
    function EnterpriseService($q, $http, settings) {
        var service = {
          getCourts: getCourts,
          createCourt: createCourt,
          removeCourt: removeCourt,
          editCourt: editCourt,
          getSchedules: getSchedules,
          createSchedule: createSchedule,
          removeSchedule: removeSchedule,
          editSchedule: editSchedule,
          getAllProximity: getAllProximity,
          getAllSchedulesByEntepriseId: getAllSchedulesByEntepriseId,
          findWithAttr: findWithAttr
        };

        return service;

        function getCourts() {
          var deferred = $q.defer();
          var promise = $http.get(settings.url_service + '/court')
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

        function createCourt(entity) {
          var deferred = $q.defer();
          var promise = $http.post(settings.url_service + '/court', entity)
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

        function removeCourt(entity) {
          var deferred = $q.defer();
          var promise = $http.delete(settings.url_service + '/court/' + entity.id)
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

        function editCourt(entity) {
          var deferred = $q.defer();
          var promise = $http.put(settings.url_service + '/court/' + entity.id, entity)
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

        function getSchedules() {
          var deferred = $q.defer();
          var promise = $http.get(settings.url_service + '/schedule')
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

        function createSchedule(entity) {
          var deferred = $q.defer();
          var promise = $http.post(settings.url_service + '/schedule', entity)
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

        function removeSchedule(entity) {
          var deferred = $q.defer();
          var promise = $http.delete(settings.url_service + '/schedule/' + entity.id)
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

        function editSchedule(entity) {
          var deferred = $q.defer();
          var promise = $http.put(settings.url_service + '/schedule/' + entity.id, entity)
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

        function getAllProximity(entity) {
          var deferred = $q.defer();
          var promise = $http.post(settings.url_service + '/enterprise/proximity', entity)
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

        function getAllSchedulesByEntepriseId(id) {
          var deferred = $q.defer();
          var promise = $http.get(settings.url_service + '/schedule/enterprise/'+id)
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

        function findWithAttr(array, attr, value) {
          for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
              return i;
            }
          }
          return -1;
        }
    }
})();
