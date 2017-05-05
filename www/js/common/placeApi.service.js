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
        getCitiesAutoComplete: getCitiesAutoComplete,
        getLatLngCitie: getLatLngCitie
      };

      return service;

      function getCitiesAutoComplete(input) {
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

      function getLatLngCitie(place_id) {
        var deferred = $q.defer();
        var promise = $http.get(settings.url_google_places + '/details/json?key=' + api_key + '&placeid=' + place_id)
        .then(
          function (response) {
            deferred.resolve(response.data.result.geometry.location);
          },
          function (err) {
            deferred.reject(err);
          }
        );
        return deferred.promise;
      }
    }
})();
