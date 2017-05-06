angular.module('app.enterprise')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('enterpriseController.notificacoes', {
    url: '/enterprise-notification',
    views: {
      'tab3': {
        templateUrl: 'templates/notificacoes.html',
        controller: 'NotificationEntepriseController',
        controllerAs: 'vm'
      }
    }
  })

  .state('enterpriseController.horarios', {
    url: '/enterprise-schedule',
    views: {
      'tab2': {
        templateUrl: 'templates/horarios.html',
        controller: 'ScheduleController',
        controllerAs: 'vm',
        resolve: {
          InitListSchedules: function(EnterpriseService, $ionicLoading) {
            $ionicLoading.show({
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200
            });
            return EnterpriseService.getSchedules()
              .then(function(response) {
                $ionicLoading.hide();
                return response;
              });
          }
        }
      }
    }
  })

  .state('enterpriseController.quadras', {
    url: '/enterprise-court',
    views: {
      'tab1': {
        templateUrl: 'templates/quadras.html',
        controller: 'CourtController',
        controllerAs: 'vm',
        resolve: {
          InitListCourts: function(EnterpriseService, $ionicLoading) {
            $ionicLoading.show({
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200
            });
            return EnterpriseService.getCourts()
              .then(function(response) {
                $ionicLoading.hide();
                return response;
              });
          }
        }
      }
    }
  })

  .state('enterpriseController', {
    url: '/enterprise-dashboard',
    templateUrl: 'templates/enterpriseController.html',
    abstract:true
  })

  .state('enterpriseController.perfil', {
    url: '/enterprise-profile',
    views: {
      'tab4': {
        templateUrl: 'templates/perfil.html',
        controller: 'ProfileEntepriseController',
        controllerAs: 'vm'
      }
    }
  })

});
