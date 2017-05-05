angular.module('app.player')

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('playerController.notificacoes', {
    url: '/player-notification',
    views: {
      'tab3': {
        templateUrl: 'templates/notificacoes.html',
        controller: 'NotificationPlayerController',
        controllerAs: 'vm'
      }
    }
  })

  .state('playerController.jogos', {
    url: '/player-game',
    views: {
      'tab1': {
        templateUrl: 'templates/jogos.html',
        controller: 'GameController',
        controllerAs: 'vm'
      }
    }
  })

  .state('playerController.jogosProximos', {
    url: '/player-game-near',
    views: {
      'tab2': {
        templateUrl: 'templates/jogosProximos.html',
        controller: 'GameNearController',
        controllerAs: 'vm'
      }
    }
  })

  .state('playerController', {
    url: '/player-dashboard',
    templateUrl: 'templates/playerController.html',
    abstract:true
  })

  .state('playerController.perfilJogador', {
    url: '/player-profile',
    views: {
      'tab4': {
        templateUrl: 'templates/perfilJogador.html',
        controller: 'ProfilePlayerController',
        controllerAs: 'vm'
      }
    }
  })

});
