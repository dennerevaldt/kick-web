(function() {
    'use strict';

    angular
        .module('app.login')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', 'app.settings'];

    /* @ngInject */
    function LoginService($http, $q, settings) {
        var accounts = [];

        var service = {
            createAccount: createAccount,
            token: token,
            tokenFacebook: tokenFacebook,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials,
            getDataFB: getDataFB,
            getUserData: getUserData,
            setUserData: setUserData
        };

        return service;

        function createAccount() {

        }

        function token(username, password) {
          var deferred = $q.defer();
          var promise = $http.post(settings.url_service+'/token', entity)
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

        function tokenFacebook(entity) {
          var deferred = $q.defer();
          var promise = $http.post(settings.url_service+'/token-facebook', {email: entity.data.email, password: entity.data.id})
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

        function getUserData() {
          var deferred = $q.defer();
          var promise = $http.get(settings.url_service + '/user')
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

        function setCredentials (entity) {
          var deferred = $q.defer();
          localStorage.setItem('kickCredentials', entity.data.token);
          deferred.resolve(entity.data.token);
          return deferred.promise;
        }

        function clearCredentials () {
          localStorage.removeItem('kickCredentials');
          localStorage.removeItem('kickUserCredentials');
          delete $http.defaults.headers['x-access-token'];
        }

        function getDataFB(access_token) {
          var deferred = $q.defer();
          var promise = $http.get(settings.url_fb + '/me', {
            params: {
              access_token: access_token,
              fields: "id,name,email",
              format: "json"
            }
          }).then(function(response) {
            deferred.resolve(response);
          }, function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
        }

        function setUserData (entity) {
          var deferred = $q.defer();
          localStorage.setItem('kickUserCredentials', JSON.stringify(entity.data));
          deferred.resolve(entity);
          return deferred.promise;
        }
    }
})();
