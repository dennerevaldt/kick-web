(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuthInterceptor', AuthInterceptor)
    .config(Config);

    AuthInterceptor.$inject = ['$rootScope', '$q', '$location'];
    Config.$inject = ['$httpProvider'];

    function AuthInterceptor($rootScope, $q, $location) {
      return {
        request: function(config) {
          // request your $rootscope messaging should be here?
          const token = localStorage.getItem('kickCredentials');
          if (token) {
            config.headers['x-access-token'] = token;
          }
          return config;
        },

        requestError: function(rejection) {
          // console.log(rejection);
          // request error your $rootscope messagin should be here?
          return $q.reject(rejection);
        },


        response: function(response) {
          //console.log(response);
          // response your $rootscope messagin should be here?

          return response;
        },

        responseError: function(rejection) {
          //console.log(rejection);
          // response error your $rootscope messagin should be here?
          if (rejection.status === 401){

          } else if (rejection.status === 403){

          } else if(rejection.status === 500){

          } else{
          }
          return $q.reject(rejection);
        }
      };
    }

    function Config($httpProvider){
      $httpProvider.interceptors.push('AuthInterceptor');
    }
})();
