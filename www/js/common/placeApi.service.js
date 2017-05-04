(function() {
    'use strict';

    angular
      .module('app')
      .factory('PlaceApiService', PlaceApiService);

    PlaceApiService.$inject = ['$http', '$q', 'app.settings'];

    /* @ngInject */
    function PlaceApiService($http, $q, settings) {
      const api_key = "AIzaSyD6bzbwKaZKiHy12YpFQr7D-B4ETA5noKo";

      var service = {
        getCitiesAutoComplete: getCitiesAutoComplete
      };

      return service;

      function getCitiesAutoComplete(input) {
        console.log('CHAMAR CHAMOU >>>>', JSON.stringify(input));
        var deferred = $q.defer();
        var promise = $http.get(settings.url_google_places + '/autocomplete/json?key=' + api_key + '&types=(cities)&input=' + input + '&language=pt_BR&components=country:br')
        .then(
          function (response) {
            var arrCities = [];
            response.data.predictions.map(function(item){
              arrCities.push({
                description: item.description,
                place_id: item.place_id
              });
            });
            deferred.resolve(arrCities);
          },
          function (err) {
            deferred.reject(err);
          }
        );
        return deferred.promise;
      }
    }
})();
